import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Send, Loader2, BookOpen, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { slugToTitle } from "@/lib/formatters";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Benchbook = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Countries with available country-specific benchbooks
  const availableCountries = ["philippines", "sri-lanka", "viet-nam"];
  const isCountrySpecificAvailable = availableCountries.includes(country || "");
  
  // Check URL parameter for initial tab
  const tabParam = searchParams.get("tab");
  const initialTab = tabParam === "introduction" 
    ? "introduction" 
    : (isCountrySpecificAvailable ? "country-specific" : "introduction");
  
  // Hide tab selector completely - no switching between tabs
  const showTabSelector = false;
  
  const [selectedBenchbook, setSelectedBenchbook] = useState<"introduction" | "country-specific">(initialTab);
  
  // Form states
  const [interestType, setInterestType] = useState<"receive" | "contribute">("receive");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profession: "",
    organization: "",
    details: "",
  });
  
  const getPdfPath = () => {
    if (selectedBenchbook === "introduction") {
      return "/IP_benchbooks/introduction_benchbook.pdf";
    }
    if (selectedBenchbook === "country-specific" && isCountrySpecificAvailable) {
      // Map country slug to PDF filename
      const countryPdfMap: Record<string, string> = {
        "philippines": "philippines_benchbook.pdf",
        "sri-lanka": "sri_lanka_benchbook.pdf",
        "viet-nam": "viet_nam_benchbook.pdf",
      };
      return `/IP_benchbooks/${countryPdfMap[country || ""]}`;
    }
    // Fallback to introduction if country-specific not available
    return "/IP_benchbooks/introduction_benchbook.pdf";
  };

  const pdfPath = getPdfPath();
  const countryName = country ? slugToTitle(country) : "";
  
  // Determine title based on selected benchbook
  const benchbookTitle = selectedBenchbook === "introduction"
    ? "Introduction to the International Intellectual Property Legal Framework" 
    : "IP Benchbook";

  // Update chat messages when selected benchbook changes
  useEffect(() => {
    if (selectedBenchbook === "introduction") {
      setMessages([
        {
          role: "assistant",
          content: `I am here to help you navigate this material. What would you like to explore?`,
        },
      ]);
    } else if (selectedBenchbook === "country-specific" && !isCountrySpecificAvailable) {
      setMessages([
        {
          role: "assistant",
          content: `The IP Benchbook for ${countryName} is not currently available. We are showing you the Introduction to the International Intellectual Property Legal Framework. If you would like to receive a country-tailored benchbook or are interested in contributing to writing one, please let us know using the form below!`,
        },
      ]);
    } else {
      setMessages([
        {
          role: "assistant",
          content: `I am here to help you navigate this material. What would you like to explore?`,
        },
      ]);
    }
  }, [selectedBenchbook, countryName, isCountrySpecificAvailable]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const interestText = interestType === "receive" 
      ? "receiving a country-tailored benchbook" 
      : "contributing to writing the benchbook";
    
    toast({
      title: "Thank you for your interest!",
      description: `We've received your request for ${interestText} for ${countryName}. We'll be in touch soon.`,
    });
    
    // Reset form
    setFormData({ name: "", email: "", profession: "", organization: "", details: "" });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response - in production, this would call your LLM backend
    setTimeout(() => {
      const assistantMessage: Message = {
        role: "assistant",
        content: `I understand you're asking about: "${userMessage.content}". To enable full AI-powered responses, you'll need to connect Lovable Cloud for backend functionality. For now, I can help guide you through the Benchbook sections.`,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-4 h-screen flex flex-col">
        <Button
          variant="ghost"
          onClick={() => navigate(`/external/country/${country}/ip-tools`)}
          className="mb-6 hover:bg-secondary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to IES Products
        </Button>

        {/* Benchbook Selector - Only show when not directly accessing introduction */}
        {showTabSelector && (
          <div className="mb-4">
            <Tabs value={selectedBenchbook} onValueChange={(v) => setSelectedBenchbook(v as "introduction" | "country-specific")}>
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="introduction">Introduction to IP Framework</TabsTrigger>
                <TabsTrigger value="country-specific">IP Benchbook</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}

        <div className="flex-1 grid md:grid-cols-2 gap-4 min-h-0">
          {/* PDF Viewer Section - Only show if introduction OR country-specific is available */}
          {(selectedBenchbook === "introduction" || isCountrySpecificAvailable) && (
            <Card className="flex flex-col overflow-hidden">
              <CardContent className="p-6 flex-1 flex flex-col overflow-hidden">
                <h2 className="text-2xl font-bold text-primary mb-4">{benchbookTitle}</h2>
                <ScrollArea className="flex-1 bg-muted rounded-lg">
                  <iframe
                    src={pdfPath}
                    className="w-full"
                    title={benchbookTitle}
                    style={{ height: "100vh", border: "none" }}
                  />
                </ScrollArea>
              </CardContent>
            </Card>
          )}

          {/* Right Side - Chat and Form */}
          <div className={`flex flex-col gap-4 min-h-0 ${(selectedBenchbook === "country-specific" && !isCountrySpecificAvailable) ? 'md:col-span-2' : ''}`}>
            {/* Chat Interface Section */}
            <Card className="flex flex-col min-h-0" style={{ flex: (selectedBenchbook === "country-specific" && !isCountrySpecificAvailable) ? '2' : '1' }}>
              <CardContent className="p-6 flex-1 flex flex-col min-h-0">
                <h2 className="text-2xl font-bold text-primary mb-4">AI Assistant</h2>
                
                {selectedBenchbook === "country-specific" && !isCountrySpecificAvailable && (
                  <Alert className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      The IP Benchbook for {countryName} is not currently available. You're viewing the Introduction to the International Intellectual Property Legal Framework.
                    </AlertDescription>
                  </Alert>
                )}
                
                <ScrollArea className="flex-1 pr-4 mb-4">
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-secondary rounded-lg px-4 py-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <div className="flex gap-2">
                  <Input
                    placeholder="Ask a question about the Benchbook..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !isLoading) {
                        handleSendMessage();
                      }
                    }}
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputValue.trim()}
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Interest Form Section - Only show when country-specific benchbook not available */}
            {selectedBenchbook === "country-specific" && !isCountrySpecificAvailable && (
              <Card style={{ flex: '0.6' }}>
                <CardContent className="p-4">
                  <h3 className="text-base font-semibold text-primary mb-3">Express Your Interest</h3>
                  <Tabs value={interestType} onValueChange={(v) => setInterestType(v as "receive" | "contribute")} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 h-8">
                      <TabsTrigger value="receive" className="text-xs">Interested in Benchbook</TabsTrigger>
                      <TabsTrigger value="contribute" className="text-xs">Want to Contribute</TabsTrigger>
                    </TabsList>
                    <TabsContent value="receive" className="space-y-3 mt-3">
                      <form onSubmit={handleFormSubmit} className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <Label htmlFor="name" className="text-xs">Name (Optional)</Label>
                            <Input
                              id="name"
                              placeholder="Your name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="h-8 text-sm"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="email" className="text-xs">Email (Optional)</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="your.email@example.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="h-8 text-sm"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <Label htmlFor="profession" className="text-xs">Profession (Optional)</Label>
                            <Input
                              id="profession"
                              placeholder="Your profession"
                              value={formData.profession}
                              onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                              className="h-8 text-sm"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="organization" className="text-xs">Organization (Optional)</Label>
                            <Input
                              id="organization"
                              placeholder="Your organization"
                              value={formData.organization}
                              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                              className="h-8 text-sm"
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="details" className="text-xs">Additional Details (Optional)</Label>
                          <Textarea
                            id="details"
                            placeholder="Tell us more about your interest..."
                            value={formData.details}
                            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                            rows={2}
                            className="text-sm"
                          />
                        </div>
                        <Button type="submit" className="w-full h-8 text-sm">
                          Submit Interest
                        </Button>
                      </form>
                    </TabsContent>
                    <TabsContent value="contribute" className="space-y-3 mt-3">
                      <form onSubmit={handleFormSubmit} className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <Label htmlFor="contrib-name" className="text-xs">Name (Optional)</Label>
                            <Input
                              id="contrib-name"
                              placeholder="Your name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="h-8 text-sm"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="contrib-email" className="text-xs">Email (Optional)</Label>
                            <Input
                              id="contrib-email"
                              type="email"
                              placeholder="your.email@example.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="h-8 text-sm"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <Label htmlFor="contrib-profession" className="text-xs">Profession (Optional)</Label>
                            <Input
                              id="contrib-profession"
                              placeholder="Your profession"
                              value={formData.profession}
                              onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                              className="h-8 text-sm"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="contrib-organization" className="text-xs">Organization (Optional)</Label>
                            <Input
                              id="contrib-organization"
                              placeholder="Your organization"
                              value={formData.organization}
                              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                              className="h-8 text-sm"
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="contrib-details" className="text-xs">Your Expertise & Availability (Optional)</Label>
                          <Textarea
                            id="contrib-details"
                            placeholder="Tell us about your expertise and how you'd like to contribute..."
                            value={formData.details}
                            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                            rows={2}
                            className="text-sm"
                          />
                        </div>
                        <Button type="submit" className="w-full h-8 text-sm">
                          Submit Contribution Interest
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benchbook;
