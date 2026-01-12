import { useState } from "react";
import { FileText, MapPin, Users, TrendingUp, ArrowRightLeft, MessageSquare, Play, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const useCases = [
  {
    id: 1,
    title: "Generate a country snapshot",
    description: "Compile key findings from mission reports and briefings for a specific country into a concise summary.",
    icon: MapPin,
    module: "Country Intelligence",
    example: "Generate a comprehensive snapshot of Kenya including recent mission outcomes, stakeholder activities, and recommendations.",
  },
  {
    id: 2,
    title: "Identify recurring challenges across a region",
    description: "Analyze mission reports across multiple countries to identify common barriers and themes.",
    icon: TrendingUp,
    module: "Trends & Insights",
    example: "What are the most frequently mentioned challenges across African countries in 2025 mission reports?",
  },
  {
    id: 3,
    title: "Summarize stakeholder engagement history",
    description: "Get a complete view of all interactions, needs, and outcomes for a specific stakeholder.",
    icon: Users,
    module: "Stakeholder Intelligence",
    example: "Summarize all engagement with KIPI including needs identified, support provided, and outcomes achieved.",
  },
  {
    id: 4,
    title: "Prepare a management briefing",
    description: "Generate a pre-mission briefing document with relevant context, past activities, and recommendations.",
    icon: FileText,
    module: "Projects & Operations",
    example: "Prepare a briefing for an upcoming mission to Indonesia covering stakeholder landscape and priority areas.",
  },
  {
    id: 5,
    title: "Compare two countries",
    description: "Identify similarities, differences, and lessons learned between two countries' IP ecosystems.",
    icon: ArrowRightLeft,
    module: "Country Intelligence",
    example: "Compare Kenya and Ghana in terms of IP office capacity, university engagement, and SME support programs.",
  },
];

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const UseCases = () => {
  const [selectedUseCase, setSelectedUseCase] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const runUseCase = (useCase: typeof useCases[0]) => {
    setSelectedUseCase(useCase.id);
    setChatMessages([
      {
        role: "assistant",
        content: `**Running Use Case: ${useCase.title}**\n\nI'm now analyzing relevant documents in the Knowledge Library for this request.\n\n*"${useCase.example}"*\n\n---\n\n**[Simulated Response]**\n\nBased on analyzing 12 relevant documents (3 mission reports, 5 briefings, 4 quarterly reports):\n\n${
          useCase.id === 1 
            ? `**Kenya Country Snapshot:**\n\n• **Recent Missions:** 2 missions in 2025 focusing on IP office capacity building and university engagement\n• **Key Stakeholders:** KIPI, University of Nairobi, Kenya Agricultural Research Institute\n• **Outcomes:** New patent examination training program, 3 universities now have IP policies\n• **Recommendations:** Scale SME IP awareness programs, establish TTO network\n\n*Sources: Kenya Mission Report Q4 2025, Kenya Country Briefing 2025*`
            : useCase.id === 2
            ? `**Recurring Challenges in Africa (2025):**\n\n1. **Limited IP Office Capacity** (mentioned in 8/12 reports)\n2. **Weak University-Industry Linkages** (7/12 reports)\n3. **Inadequate IP Awareness Among SMEs** (6/12 reports)\n4. **Funding Constraints for TTOs** (5/12 reports)\n\n*Sources: Mission Reports from Kenya, Ghana, Nigeria, Egypt*`
            : useCase.id === 3
            ? `**KIPI Engagement Summary:**\n\n• **First Contact:** 2022 during regional IP workshop\n• **Key Needs:** Patent examination training, IT system modernization\n• **Support Provided:** 3 training workshops, technical consultation on classification\n• **Outcomes:** 40% improvement in examination efficiency\n\n*Sources: Kenya Stakeholder Mission Report, KIPI Briefing*`
            : useCase.id === 4
            ? `**Indonesia Mission Briefing:**\n\n• **Stakeholder Landscape:** DGIP, 5 key universities, Ministry of Research\n• **Past Activities:** 2 missions (2023, 2024), joint project on GI protection\n• **Priority Areas:** Technology transfer, startup IP support\n• **Recommendations:** Focus on TTO capacity building\n\n*Sources: Indonesia Mission Reports 2023-2024, ASEAN Briefing*`
            : `**Kenya vs Ghana Comparison:**\n\n| Aspect | Kenya | Ghana |\n|--------|-------|-------|\n| IP Office Capacity | Moderate | Developing |\n| University IP Policies | 5 institutions | 2 institutions |\n| SME Programs | Active | Limited |\n\n*Sources: Country Briefings 2025*`
        }\n\n---\n\nWould you like me to elaborate on any aspect or search for additional information?`
      }
    ]);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    setChatMessages(prev => [...prev, { role: "user", content: inputMessage }]);
    setInputMessage("");
    setIsLoading(true);

    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        role: "assistant",
        content: `Thank you for your follow-up question. Based on the documents in the Knowledge Library:\n\n**[AI Analysis]**\n\nI've searched across mission reports, briefings, and quarterly reports to answer your question.\n\n*[Full AI integration requires Lovable Cloud to provide comprehensive analysis with source citations.]*\n\nWould you like to run another use case or refine your query?`
      }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Use Cases</h2>
        <p className="text-muted-foreground">
          Click any use case to run it with AI-powered analysis across the Knowledge Library
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Use Cases List */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Available Use Cases</h3>
          <div className="space-y-3">
            {useCases.map((useCase) => (
              <Card 
                key={useCase.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedUseCase === useCase.id ? "border-primary ring-2 ring-primary/20" : ""
                }`}
                onClick={() => runUseCase(useCase)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <useCase.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{useCase.title}</h4>
                        <Button variant="ghost" size="sm" className="h-8">
                          <Play className="h-4 w-4 mr-1" />
                          Run
                        </Button>
                      </div>
                      <Badge variant="outline" className="mt-1 text-xs">{useCase.module}</Badge>
                      <p className="text-sm text-muted-foreground mt-2">{useCase.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI Response Panel */}
        <div className="bg-card rounded-xl shadow-md border overflow-hidden flex flex-col h-[600px]">
          <div className="bg-primary/10 p-4 border-b flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">AI Analysis Results</h3>
              <p className="text-xs text-muted-foreground">
                {selectedUseCase ? "Results from selected use case" : "Select a use case to run"}
              </p>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            {chatMessages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-center p-8">
                <div>
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    Click on a use case to run it and see AI-generated results with source citations.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[95%] rounded-lg px-4 py-3 ${
                      msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg px-4 py-3">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          {selectedUseCase && (
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask a follow-up question..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button onClick={handleSendMessage} disabled={isLoading}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UseCases;
