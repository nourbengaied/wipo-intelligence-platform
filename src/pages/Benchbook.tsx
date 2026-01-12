import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Send, Loader2, BookOpen } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Benchbook = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm here to help you navigate the IP Benchbook. Ask me any questions about intellectual property regulations, procedures, or best practices.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
          className="mb-4 self-start hover:bg-secondary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to IP Tools
        </Button>

        <div className="flex-1 grid md:grid-cols-2 gap-4 min-h-0">
          {/* PDF Viewer Section */}
          <Card className="flex flex-col">
            <CardContent className="p-6 flex-1 flex flex-col">
              <h2 className="text-2xl font-bold text-primary mb-4">IP Benchbook</h2>
              <div className="flex-1 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BookOpen className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg">PDF Viewer</p>
                  <p className="text-sm mt-2">
                    {country?.replace(/-/g, " ")} - IP Benchbook Document
                  </p>
                  <p className="text-xs mt-4 max-w-md">
                    In production, this would display the actual PDF document with navigation controls
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chat Interface Section */}
          <Card className="flex flex-col">
            <CardContent className="p-6 flex-1 flex flex-col min-h-0">
              <h2 className="text-2xl font-bold text-primary mb-4">AI Assistant</h2>
              
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
                        <p className="text-sm">{message.content}</p>
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
        </div>
      </div>
    </div>
  );
};

export default Benchbook;
