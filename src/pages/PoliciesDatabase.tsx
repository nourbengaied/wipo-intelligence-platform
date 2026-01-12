import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Search, Filter, Building2, MapPin, FileText, MessageSquare, Send, Bot, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface InstitutionPolicy {
  id: string;
  name: string;
  country: string;
  region: string;
  type: "University" | "Research Institute" | "Government";
  year: number;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const mockPolicies: InstitutionPolicy[] = [
  { id: "1", name: "University of Cape Town", country: "South Africa", region: "Africa", type: "University", year: 2023 },
  { id: "2", name: "Kenya Agricultural Research Institute", country: "Kenya", region: "Africa", type: "Research Institute", year: 2022 },
  { id: "3", name: "University of Nairobi", country: "Kenya", region: "Africa", type: "University", year: 2021 },
  { id: "4", name: "Cairo University", country: "Egypt", region: "Africa", type: "University", year: 2022 },
  { id: "5", name: "MIT", country: "United States", region: "North America", type: "University", year: 2023 },
  { id: "6", name: "Stanford University", country: "United States", region: "North America", type: "University", year: 2023 },
  { id: "7", name: "University of Oxford", country: "United Kingdom", region: "Europe", type: "University", year: 2022 },
  { id: "8", name: "ETH Zurich", country: "Switzerland", region: "Europe", type: "University", year: 2023 },
  { id: "9", name: "University of Tokyo", country: "Japan", region: "Asia", type: "University", year: 2022 },
  { id: "10", name: "Tsinghua University", country: "China", region: "Asia", type: "University", year: 2023 },
  { id: "11", name: "Indian Institute of Technology Delhi", country: "India", region: "Asia", type: "University", year: 2022 },
  { id: "12", name: "CSIRO", country: "Australia", region: "Oceania", type: "Research Institute", year: 2023 },
  { id: "13", name: "University of São Paulo", country: "Brazil", region: "South America", type: "University", year: 2021 },
  { id: "14", name: "Max Planck Society", country: "Germany", region: "Europe", type: "Research Institute", year: 2023 },
  { id: "15", name: "National Research Council", country: "Canada", region: "North America", type: "Government", year: 2022 },
];

const PoliciesDatabase = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `Welcome to the IP Policy Database AI Assistant! 

I can help you:
• **Search and compare** policies from different institutions
• **Identify patterns** across policies (e.g., common revenue sharing models)
• **Find examples** of specific policy provisions
• **Analyze trends** in institutional IP policies

Try asking me something like:
- "What revenue sharing percentages do African universities typically use?"
- "Compare ownership rules between US and European universities"
- "Which policies have provisions for student IP?"`
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const regions = ["all", "Africa", "Asia", "Europe", "North America", "South America", "Oceania"];
  const types = ["all", "University", "Research Institute", "Government"];

  const filteredPolicies = mockPolicies.filter(policy => {
    const matchesSearch = policy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         policy.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === "all" || policy.region === selectedRegion;
    const matchesType = selectedType === "all" || policy.type === selectedType;
    return matchesSearch && matchesRegion && matchesType;
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    setChatMessages(prev => [...prev, { role: "user", content: chatInput }]);
    const userQuery = chatInput.toLowerCase();
    setChatInput("");
    setIsLoading(true);

    // Simulate AI response based on query
    setTimeout(() => {
      let response = "";
      
      if (userQuery.includes("revenue") || userQuery.includes("sharing")) {
        response = `Based on analyzing the policies in our database, here are common revenue sharing patterns:

**African Universities:**
- Creator share: typically 40-50%
- Department share: 20-30%
- Institution: 25-35%

**Key Examples:**
• University of Cape Town: 50% creator, 25% department, 25% institution
• University of Nairobi: 40% creator, 30% department, 30% institution

**Trend:** African institutions tend to offer higher creator shares to incentivize IP disclosure.

Would you like me to provide more details on any specific institution?`;
      } else if (userQuery.includes("ownership") || userQuery.includes("compare")) {
        response = `Here's a comparison of ownership rules:

**US Universities (MIT, Stanford):**
- Institution owns IP created with institutional resources
- Creator retains academic freedom to publish
- Strong commercialization support

**European Universities (Oxford, ETH Zurich):**
- Similar institutional ownership model
- More emphasis on public benefit clauses
- Stricter industry collaboration guidelines

**Asian Universities (Tokyo, Tsinghua):**
- Government may have stake in publicly funded research
- Stronger focus on national innovation priorities

Would you like me to dive deeper into any region?`;
      } else if (userQuery.includes("student")) {
        response = `Regarding **student IP provisions**, here's what I found:

**Common Approaches:**
1. **Coursework IP**: Generally owned by the student
2. **Thesis/Dissertation**: Student owns, institution gets license
3. **Research Project IP**: Depends on funding and supervision

**Notable Policies:**
• **MIT**: Clear distinction between coursework and sponsored research
• **Oxford**: Students sign IP agreements for funded projects
• **IIT Delhi**: Shared ownership model for student innovations

**Trend:** Increasing focus on student entrepreneurship programs with IP support.`;
      } else {
        response = `I can help analyze the policies in our database. Here's what I found related to your query:

**Database Overview:**
- ${mockPolicies.length} institutional policies
- ${new Set(mockPolicies.map(p => p.region)).size} regions represented
- Latest updates from 2023

**[Note: Full AI analysis requires Lovable Cloud integration for comprehensive cross-policy analysis.]**

Try asking about specific topics like:
- Revenue sharing models
- Ownership rules
- Student IP provisions
- Regional comparisons`;
      }

      setChatMessages(prev => [...prev, { role: "assistant", content: response }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate(`/external/country/${country}/ip-policies`)}
          className="mb-6 hover:bg-secondary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to IP Policies
        </Button>

        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Institutional IP Policies Database</h1>
            <p className="text-muted-foreground text-lg">
              Browse and analyze IP policies from academic and research institutions worldwide
            </p>
          </div>
          <Button 
            onClick={() => setShowAIChat(!showAIChat)}
            className={showAIChat ? "bg-accent" : ""}
          >
            <Bot className="h-4 w-4 mr-2" />
            {showAIChat ? "Hide AI" : "Ask AI"}
          </Button>
        </div>

        <div className={`grid gap-6 ${showAIChat ? "lg:grid-cols-2" : ""}`}>
          {/* Main Content */}
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-card rounded-xl shadow-md border p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by institution or country..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="px-4 py-2 rounded-lg border bg-background text-sm"
                  >
                    {regions.map(region => (
                      <option key={region} value={region}>
                        {region === "all" ? "All Regions" : region}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-4 py-2 rounded-lg border bg-background text-sm"
                  >
                    {types.map(type => (
                      <option key={type} value={type}>
                        {type === "all" ? "All Types" : type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-card rounded-xl shadow-md border overflow-hidden">
              <div className="p-4 border-b bg-muted/30">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredPolicies.length} of {mockPolicies.length} policies
                </p>
              </div>
              <ScrollArea className={showAIChat ? "h-[400px]" : "h-[500px]"}>
                <div className="divide-y">
                  {filteredPolicies.map(policy => (
                    <div
                      key={policy.id}
                      className="p-4 hover:bg-muted/30 transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Building2 className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{policy.name}</h3>
                          <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {policy.country}
                            </span>
                            <span className="px-2 py-0.5 bg-secondary rounded-full text-xs">
                              {policy.type}
                            </span>
                            <span>{policy.year}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        View Policy
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-card rounded-xl shadow-sm border p-4 text-center">
                <div className="text-3xl font-bold text-primary">150+</div>
                <div className="text-sm text-muted-foreground">Institutions</div>
              </div>
              <div className="bg-card rounded-xl shadow-sm border p-4 text-center">
                <div className="text-3xl font-bold text-primary">60+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
              <div className="bg-card rounded-xl shadow-sm border p-4 text-center">
                <div className="text-3xl font-bold text-primary">6</div>
                <div className="text-sm text-muted-foreground">Regions</div>
              </div>
              <div className="bg-card rounded-xl shadow-sm border p-4 text-center">
                <div className="text-3xl font-bold text-primary">2024</div>
                <div className="text-sm text-muted-foreground">Last Updated</div>
              </div>
            </div>
          </div>

          {/* AI Chat Panel */}
          {showAIChat && (
            <div className="bg-card rounded-xl shadow-md border overflow-hidden flex flex-col h-[700px]">
              <div className="bg-accent/10 p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Policy Database AI</h3>
                    <p className="text-xs text-muted-foreground">
                      Ask questions across all policies
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setShowAIChat(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[90%] rounded-2xl px-4 py-3 ${
                          message.role === "user"
                            ? "bg-accent text-accent-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-2xl px-4 py-3">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-accent/60 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-accent/60 rounded-full animate-bounce [animation-delay:0.2s]" />
                          <div className="w-2 h-2 bg-accent/60 rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about policies, patterns, or comparisons..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={isLoading} className="bg-accent hover:bg-accent/90">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PoliciesDatabase;
