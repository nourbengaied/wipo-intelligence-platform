import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileCheck, ArrowLeft } from "lucide-react";
import { slugToTitle } from "@/lib/formatters";
import { useToast } from "@/hooks/use-toast";

const IPTools = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showBenchbookModal, setShowBenchbookModal] = useState(false);
  // Countries with available country-specific benchbooks
  const availableCountries = ["philippines", "sri-lanka", "viet-nam"];
  const isCountryBenchbookAvailable = availableCountries.includes(country || "");
  const countryName = country ? slugToTitle(country) : "";
  
  const [interestType, setInterestType] = useState<"receive" | "contribute">("receive");
  const [formData, setFormData] = useState({
    fullName: "",
    professionalRole: "",
    organization: "",
    email: "",
    country: countryName,
    additionalThoughts: "",
  });

  const handleBenchbookClick = () => {
    if (isCountryBenchbookAvailable) {
      // Directly open the benchbook page with country-specific tab
      navigate(`/external/country/${country}/benchbook?tab=country-specific`);
    } else {
      // Show modal for countries without available benchmarks
      setShowBenchbookModal(true);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const interestText = interestType === "receive" 
      ? "receiving a country-tailored benchbook" 
      : "contributing to writing the benchbook";
    
    toast({
      title: "Thank you for your interest!",
      description: `We've received your request for ${interestText} for ${countryName}. We'll be in touch soon.`,
    });
    
    // Reset form and close modal
    setFormData({ 
      fullName: "",
      professionalRole: "",
      organization: "",
      email: "",
      country: countryName,
      additionalThoughts: "",
    });
    setShowBenchbookModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate(`/external/country/${country}`)}
          className="mb-6 hover:bg-secondary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to {country?.replace(/-/g, " ")}
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">IES Products</h1>
          <p className="text-muted-foreground text-lg">
            {country?.replace(/-/g, " ")} - Intellectual Property Resources
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary"
            onClick={() => {
              navigate(`/external/country/${country}/benchbook?tab=introduction`);
            }}
          >
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Introduction to the International Intellectual Property Legal Framework</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Introduction to the International Intellectual Property Legal Framework.
              </p>
              <Button variant="default" className="w-full">
                Open Introduction
              </Button>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary"
            onClick={handleBenchbookClick}
          >
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">IP Benchbook</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Country-specific IP Benchbook for {countryName}.
              </p>
              <Button variant="default" className="w-full">
                Open Benchbook
              </Button>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary"
            onClick={() => navigate(`/external/country/${country}/ip-policies`)}
          >
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
                <FileCheck className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Institutional IP Policies</CardTitle>
              <CardDescription>
                Policy frameworks, toolkit, and database
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Access national/regional models, AI-powered policy toolkit, and institutional policies database.
              </p>
              <Button className="w-full">
                Explore Policies
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Modal for countries without available benchbooks */}
        <Dialog open={showBenchbookModal} onOpenChange={setShowBenchbookModal}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">IP Benchbook - {countryName}</DialogTitle>
              <DialogDescription className="text-base pt-4 whitespace-pre-line">
                The IP Benchbook for {countryName} is not currently available.
                {"\n\n"}
                If you are interested in a benchbook tailored to {countryName} or would like to contribute to its development, please complete the form below.
                {"\n\n"}
                In the meantime, you may explore the{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto font-normal underline inline"
                  onClick={() => {
                    setShowBenchbookModal(false);
                    navigate(`/external/country/${country}/benchbook`);
                  }}
                >
                  Introduction to the International Intellectual Property Legal Framework
                </Button>
                .
              </DialogDescription>
            </DialogHeader>

            <Tabs value={interestType} onValueChange={(v) => setInterestType(v as "receive" | "contribute")} className="w-full mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="receive">Interested in Benchbook</TabsTrigger>
                <TabsTrigger value="contribute">Want to Contribute</TabsTrigger>
              </TabsList>
              <TabsContent value="receive" className="space-y-4 mt-4">
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full name <span className="text-red-500">*</span></Label>
                    <Input
                      id="fullName"
                      placeholder="Your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="professionalRole">Professional role <span className="text-red-500">*</span></Label>
                    <Input
                      id="professionalRole"
                      placeholder="Your professional role"
                      value={formData.professionalRole}
                      onChange={(e) => setFormData({ ...formData, professionalRole: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization <span className="text-red-500">*</span></Label>
                    <Input
                      id="organization"
                      placeholder="Your organization"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email address <span className="text-red-500">*</span></Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country <span className="text-red-500">*</span></Label>
                    <Input
                      id="country"
                      placeholder="Country"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="additionalThoughts">Additional thoughts (Optional)</Label>
                    <Textarea
                      id="additionalThoughts"
                      placeholder="Share any additional thoughts..."
                      value={formData.additionalThoughts}
                      onChange={(e) => setFormData({ ...formData, additionalThoughts: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Submit Interest
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="contribute" className="space-y-4 mt-4">
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contrib-fullName">Full name <span className="text-red-500">*</span></Label>
                    <Input
                      id="contrib-fullName"
                      placeholder="Your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contrib-professionalRole">Professional role <span className="text-red-500">*</span></Label>
                    <Input
                      id="contrib-professionalRole"
                      placeholder="Your professional role"
                      value={formData.professionalRole}
                      onChange={(e) => setFormData({ ...formData, professionalRole: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contrib-organization">Organization <span className="text-red-500">*</span></Label>
                    <Input
                      id="contrib-organization"
                      placeholder="Your organization"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contrib-email">Email address <span className="text-red-500">*</span></Label>
                    <Input
                      id="contrib-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contrib-country">Country <span className="text-red-500">*</span></Label>
                    <Input
                      id="contrib-country"
                      placeholder="Country"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contrib-additionalThoughts">Additional thoughts (Optional)</Label>
                    <Textarea
                      id="contrib-additionalThoughts"
                      placeholder="Share your expertise and how you'd like to contribute..."
                      value={formData.additionalThoughts}
                      onChange={(e) => setFormData({ ...formData, additionalThoughts: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Submit Contribution Interest
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default IPTools;
