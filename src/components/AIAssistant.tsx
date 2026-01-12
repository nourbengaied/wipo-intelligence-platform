import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { callBedrockClaude } from "@/services/bedrockService";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIAssistantProps {
  context?: {
    page?: string;
    country?: string;
    countryName?: string;
    pageData?: {
      hasNationalModel?: boolean;
      hasRegionalModel?: boolean;
      availableLanguages?: string[];
      reports?: Array<{ title: string; year?: string; category?: string }>;
      policies?: Array<{ title: string; description?: string }>;
      tools?: Array<{ name: string; description?: string }>;
    };
  };
}

const AIAssistant = ({ context }: AIAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Reset messages when context changes (different page or country)
  useEffect(() => {
    setMessages([]);
  }, [context?.page, context?.country]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Add welcome message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = getWelcomeMessage();
      setMessages([
        {
          role: "assistant",
          content: welcomeMessage,
        },
      ]);
    }
  }, [isOpen]);

  const getWelcomeMessage = () => {
    const baseMessage = "Hello! I'm your WIPO AI Assistant, here to help you with IP policies, resources, and guidance.";
    
    if (context?.countryName) {
      return `${baseMessage}\n\nI see you're exploring resources for **${context.countryName}**. I can help you with country-specific IP information, policy guidance, and more!\n\nHow can I assist you today?`;
    }
    
    if (context?.page === "policy-toolkit") {
      return `${baseMessage}\n\n**You're on the IP Policy Toolkit!**\n\nI can help you:\n• Understand and customize policy articles\n• Draft institution-specific policy language\n• Get recommendations based on your context\n• Navigate the 15-article template\n• Answer questions about best practices\n\nWhat would you like to work on?`;
    }

    if (context?.page === "policies-database") {
      return `${baseMessage}\n\n**You're on the Policies Database!**\n\nI can help you:\n• Find relevant institutional policies\n• Understand different policy approaches\n• Compare policies across institutions\n• Interpret policy language and clauses\n\nWhat are you looking for?`;
    }

    if (context?.page === "policy-model") {
      return `${baseMessage}\n\n**You're viewing a Policy Model!**\n\nI can help you:\n• Understand the policy framework\n• Adapt the model to your institution\n• Explain specific articles or clauses\n• Guide implementation strategies\n\nHow can I assist?`;
    }
    
    if (context?.page === "ip-tools") {
      return `${baseMessage}\n\nI can help you navigate IP tools, understand policy frameworks, and guide you through the policy toolkit.\n\nWhat would you like to know?`;
    }

    if (context?.page === "ip-policies") {
      return `${baseMessage}\n\nI can assist you with:\n• Understanding IP policy frameworks\n• Customizing policy templates\n• Navigating institutional policies\n• Drafting assistance\n\nWhat can I help you with?`;
    }

    return `${baseMessage}\n\nI can assist you with:\n• IP policy guidance and best practices\n• Country-specific IP information\n• WIPO resources and tools\n• Policy drafting and customization\n\nHow can I help you today?`;
  };

  const getSystemPrompt = () => {
    let contextInfo = "You are a WIPO AI Assistant specialized in intellectual property policies, resources, and guidance.";
    
    if (context?.countryName) {
      contextInfo += ` The user is currently viewing information about ${context.countryName}.`;
      
      // Add specific country data if available
      if (context.pageData) {
        if (context.pageData.hasNationalModel) {
          contextInfo += ` ${context.countryName} has a national IP policy model available`;
          if (context.pageData.availableLanguages && context.pageData.availableLanguages.length > 0) {
            contextInfo += ` in ${context.pageData.availableLanguages.join(", ")}`;
          }
          contextInfo += `.`;
        }
        if (context.pageData.hasRegionalModel) {
          contextInfo += ` ${context.countryName} is part of a regional IP policy framework.`;
        }
      }
      
      contextInfo += ` Provide context-specific guidance relevant to this country when appropriate.`;
    }
    
    if (context?.page) {
      const pageContext: Record<string, string> = {
        "ip-tools": "The user is on the IP Tools page, exploring available tools and resources.",
        "ip-policies": "The user is on the IP Policies page, looking at policy frameworks and templates.",
        "policy-toolkit": "The user is on the WIPO IP Policy Toolkit page - an AI-powered tool for customizing the IP Policy Template for Academic and Research Institutions. This toolkit helps users interactively customize policy articles, get drafting assistance, and generate institution-specific policy language.",
        "policy-model": "The user is viewing a National or Regional IP Policy Model - pre-existing policy frameworks specific to countries or regions.",
        "policies-database": "The user is on the Institutional IP Policies Database page, where they can browse and search through IP policies from institutions worldwide.",
        "reports": "The user is viewing IP reports and statistics.",
        "benchbook": "The user is exploring the IP Benchbook resources.",
      };
      contextInfo += ` ${pageContext[context.page] || ""}`;
      
      // Add specific toolkit context
      if (context.page === "policy-toolkit") {
        contextInfo += `\n\nThe Policy Toolkit provides:
- Interactive policy article customization
- AI-powered drafting assistance
- Guided step-by-step policy development
- Context-specific recommendations based on institution type
- Access to the complete 15-article IP Policy Template
- Examples and best practices for each policy section

Users can ask you to help them understand specific articles, draft policy language, or get recommendations for their institutional context.`;
      }
      
      // Add specific database context
      if (context.page === "policies-database") {
        contextInfo += `\n\nThe Policies Database allows users to:
- Browse IP policies from institutions worldwide
- Search and filter by institution type, region, or topic
- Compare different policy approaches
- Find examples and inspiration for their own policies

Help users understand how to use the database and interpret the policies they find.`;
      }
      
      // Add specific model context
      if (context.page === "policy-model") {
        contextInfo += `\n\nPolicy Models provide:
- Ready-to-use policy frameworks
- Country or region-specific guidance
- Culturally and legally appropriate templates
- Multiple language versions

Help users understand and adapt these models to their specific needs.`;
      }
      
      // Add specific page data
      if (context.pageData) {
        if (context.pageData.reports && context.pageData.reports.length > 0) {
          contextInfo += `\n\nAvailable reports for ${context.countryName}:\n`;
          context.pageData.reports.forEach(report => {
            contextInfo += `- ${report.title}`;
            if (report.year) contextInfo += ` (${report.year})`;
            if (report.category) contextInfo += ` - ${report.category}`;
            contextInfo += `\n`;
          });
        }
        
        if (context.pageData.tools && context.pageData.tools.length > 0) {
          contextInfo += `\n\nAvailable IP tools:\n`;
          context.pageData.tools.forEach(tool => {
            contextInfo += `- ${tool.name}`;
            if (tool.description) contextInfo += `: ${tool.description}`;
            contextInfo += `\n`;
          });
        }
        
        if (context.pageData.policies && context.pageData.policies.length > 0) {
          contextInfo += `\n\nAvailable IP policies:\n`;
          context.pageData.policies.forEach(policy => {
            contextInfo += `- ${policy.title}`;
            if (policy.description) contextInfo += `: ${policy.description}`;
            contextInfo += `\n`;
          });
        }
      }
    }

    contextInfo += `\n\nYour role is to:
- Provide accurate, helpful information about IP policies and WIPO resources
- Guide users through policy customization and drafting
- Answer questions about country-specific IP frameworks
- Help users navigate available tools and resources
- Reference the specific reports, tools, or policies mentioned above when relevant
- Be concise but informative
- Use markdown formatting for better readability

When appropriate, reference specific WIPO documents, tools, or resources available in the platform.`;

    return contextInfo;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      console.log("🔵 [AI Assistant] Sending message to Bedrock...");
      
      // Filter messages for Bedrock - only include actual conversation (user/assistant pairs)
      // Remove the initial welcome message if it exists
      const conversationMessages = [...messages, userMessage].filter((msg, index, arr) => {
        // Keep all user messages
        if (msg.role === "user") return true;
        // For assistant messages, only keep if there's a user message before it
        return index > 0 && arr[index - 1].role === "user";
      });
      
      const response = await callBedrockClaude({
        messages: conversationMessages,
        systemPrompt: getSystemPrompt(),
        maxTokens: 2048,
        temperature: 0.7,
      });

      const assistantMessage: Message = {
        role: "assistant",
        content: response,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      console.log("✅ [AI Assistant] Response received successfully");
    } catch (error) {
      console.error("❌ [AI Assistant] Error details:", {
        error,
        errorMessage: error instanceof Error ? error.message : "Unknown error",
        errorStack: error instanceof Error ? error.stack : undefined,
      });
      
      const errorDetails = error instanceof Error ? error.message : "Unknown error";
      const errorMessage: Message = {
        role: "assistant",
        content: `I apologize, but I encountered an error processing your request.\n\n**Error details:** ${errorDetails}\n\nPlease check the console for more information or contact support if the issue persists.`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickPrompts = [
    "How do I customize an IP policy?",
    "What resources are available for my country?",
    "Explain IP ownership in research institutions",
    "Help me draft a policy clause",
  ];

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
    textareaRef.current?.focus();
  };

  return (
    <>
      {/* Floating Chat Bubble */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Open AI Assistant</span>
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <div>
                <h3 className="font-semibold">WIPO AI Assistant</h3>
                <p className="text-xs opacity-90">Powered by Claude</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-4 py-2 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap">
                      {message.content.split(/(\*\*.*?\*\*)/g).map((part, i) => {
                        if (part.startsWith("**") && part.endsWith("**")) {
                          return (
                            <strong key={i}>
                              {part.slice(2, -2)}
                            </strong>
                          );
                        }
                        return part;
                      })}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg px-4 py-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Prompts - Show only when chat is empty */}
            {messages.length <= 1 && !isLoading && (
              <div className="mt-4 space-y-2">
                <p className="text-xs text-muted-foreground font-medium">
                  Quick prompts:
                </p>
                {quickPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left h-auto py-2 px-3"
                    onClick={() => handleQuickPrompt(prompt)}
                  >
                    <span className="text-xs">{prompt}</span>
                  </Button>
                ))}
              </div>
            )}
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about IP policies..."
                className="min-h-[60px] max-h-[120px] resize-none"
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="h-[60px] w-[60px]"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </Card>
      )}
    </>
  );
};

export default AIAssistant;
