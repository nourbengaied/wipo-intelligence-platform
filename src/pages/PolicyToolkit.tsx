import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Send, FileText, Wand2, CheckSquare, Download, ChevronRight, ChevronLeft, Check } from "lucide-react";
import { policyTemplateArticles, checklistItems, guidelinesOverview, articleGuidelines } from "@/data/policyToolkitData";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const PolicyToolkit = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Current article being worked on (0-indexed)
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const [completedArticles, setCompletedArticles] = useState<number[]>([]);
  const [isReviewMode, setIsReviewMode] = useState(false);
  
  const currentArticle = policyTemplateArticles[currentArticleIndex];
  const progress = ((currentArticleIndex) / policyTemplateArticles.length) * 100;

  // Initial welcome message that explains the guided workflow
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Welcome to the WIPO IP Policy Customization Assistant!

I'll guide you step-by-step through customizing the IP Policy Template for your institution. We'll work through all 15 articles sequentially, focusing on the **bracketed sections [like this]** that need your institution's specific information.

**Our approach:**
1. I'll explain each section's purpose using the WIPO Guidelines
2. I'll ask you contextual questions to help fill in the bracketed placeholders
3. We'll complete each article before moving to the next
4. At the end, we'll use the Checklist to review your policy

**Let's start with ${currentArticle.title}**

According to the Guidelines, the Preface establishes your institution's commitment to IP management and sets the tone for the entire policy.

**First, I need some basic information:**
What is the **full legal name** of your institution?`
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"template" | "checklist" | "guidelines">("template");
  const [expandedArticle, setExpandedArticle] = useState<number | null>(1);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Generate contextual AI response based on current article using Guidelines data
  const generateResponse = (userMessage: string): string => {
    // This would be replaced with actual LLM integration via Lovable Cloud
    
    if (isReviewMode) {
      return `Thank you for completing all articles. Let me now guide you through the **IP Policy Writer's Checklist** to ensure nothing was missed.

**Checklist Phase 1: PREPARE**
✓ Have you identified your institution's needs and desired outcomes?
✓ Have you analyzed your stakeholders?
✓ Have you reviewed the legal environment?

Based on your responses, your policy draft appears comprehensive. Here are some final recommendations:

1. **Legal Review**: Have your legal counsel review the final document
2. **Stakeholder Approval**: Present to key stakeholders for feedback
3. **Implementation Plan**: Develop a communication and training strategy

Would you like me to help with any specific section, or shall I generate a summary of your customized policy?`;
    }

    const article = policyTemplateArticles[currentArticleIndex];
    const guidelines = articleGuidelines[article.id];
    
    // Build response using Guidelines data
    let response = `Thank you for that information. I've noted this for **${article.title}**.\n\n`;
    
    if (guidelines) {
      // Get the next key question if available
      const answeredQuestions = Math.floor(messages.length / 2) % guidelines.keyQuestions.length;
      const nextQuestionIndex = Math.min(answeredQuestions, guidelines.keyQuestions.length - 1);
      
      if (nextQuestionIndex < guidelines.keyQuestions.length - 1) {
        response += `📖 **From the WIPO Guidelines:**\n`;
        
        // Show relevant definition if available
        if (guidelines.definitions[nextQuestionIndex]) {
          const def = guidelines.definitions[nextQuestionIndex];
          response += `**${def.term}**: ${def.definition}\n\n`;
        }
        
        response += `---\n\n**Next question:**\n${guidelines.keyQuestions[nextQuestionIndex + 1]}`;
      } else {
        // All questions for this article answered
        response += `✅ Great progress on ${article.title}!\n\n`;
        response += `You can type **"next"** to proceed to the next article, or continue providing more details for this section.`;
      }
    } else {
      response += `Please share any additional details about your institution's approach to this area, or type **"next"** to proceed to the next article.`;
    }
    
    return response;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = { role: "user", content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    const userInput = inputMessage.toLowerCase();
    setInputMessage("");
    setIsLoading(true);

    // Handle navigation commands
    if (userInput === "next" || userInput.includes("continue") || userInput.includes("proceed")) {
      if (currentArticleIndex < policyTemplateArticles.length - 1) {
        const newIndex = currentArticleIndex + 1;
        setCompletedArticles(prev => [...prev, currentArticleIndex]);
        setCurrentArticleIndex(newIndex);
        setExpandedArticle(newIndex + 1);
        
        setTimeout(() => {
          const nextArticle = policyTemplateArticles[newIndex];
          const guidelines = articleGuidelines[nextArticle.id];
          
          let messageContent = `Great! You've completed ${policyTemplateArticles[currentArticleIndex].title}.\n\n`;
          messageContent += `**Now let's work on ${nextArticle.title}**\n\n`;
          
          if (guidelines) {
            messageContent += `📖 **From the WIPO Guidelines:**\n${guidelines.introduction}\n\n`;
            
            if (guidelines.definitions.length > 0) {
              messageContent += `**📝 Definitions & Guidance for Bracketed Sections:**\n\n`;
              guidelines.definitions.slice(0, 3).forEach(def => {
                messageContent += `• **${def.term}**: ${def.definition}\n\n`;
              });
            }
            
            if (guidelines.examples.length > 0) {
              messageContent += `**💡 Example:**\n*${guidelines.examples[0].title}:*\n${guidelines.examples[0].content}\n\n`;
            }
            
            if (guidelines.keyQuestions.length > 0) {
              messageContent += `---\n\n**Let's customize this for your institution:**\n\n${guidelines.keyQuestions[0]}`;
            }
          } else {
            messageContent += `${nextArticle.sections.map(s => `**${s.id} ${s.title}**: ${s.content.substring(0, 100)}...`).join('\n\n')}\n\nPlease provide the specific information for your institution.`;
          }
          
          const assistantMessage: Message = {
            role: "assistant",
            content: messageContent
          };
          setMessages(prev => [...prev, assistantMessage]);
          setIsLoading(false);
        }, 800);
        return;
      } else {
        // All articles complete, move to review
        setIsReviewMode(true);
        setCompletedArticles(prev => [...prev, currentArticleIndex]);
      }
    }

    setTimeout(() => {
      const assistantMessage: Message = {
        role: "assistant",
        content: generateResponse(inputMessage)
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleArticleClick = (index: number) => {
    setCurrentArticleIndex(index);
    setExpandedArticle(index + 1);
    
    const article = policyTemplateArticles[index];
    const guidelines = articleGuidelines[article.id];
    
    // Build the guidelines-based message with definitions and examples
    let guidelinesContent = `**Switching to ${article.title}**\n\n`;
    
    if (guidelines) {
      guidelinesContent += `📖 **From the WIPO Guidelines:**\n${guidelines.introduction}\n\n`;
      
      // Add definitions for bracketed fields
      if (guidelines.definitions.length > 0) {
        guidelinesContent += `**📝 Definitions & Guidance for Bracketed Sections:**\n\n`;
        guidelines.definitions.forEach(def => {
          guidelinesContent += `• **${def.term}**: ${def.definition}\n\n`;
        });
      }
      
      // Add examples
      if (guidelines.examples.length > 0) {
        guidelinesContent += `**💡 Examples from Real Policies:**\n\n`;
        guidelines.examples.forEach(ex => {
          guidelinesContent += `*${ex.title}:*\n${ex.content}\n\n`;
        });
      }
      
      // Add the first key question to prompt the user
      if (guidelines.keyQuestions.length > 0) {
        guidelinesContent += `---\n\n**Let's customize this article for your institution:**\n\n${guidelines.keyQuestions[0]}`;
      }
    } else {
      // Fallback if no guidelines data
      guidelinesContent += `${article.sections.map(s => `**${s.id} ${s.title}**: ${s.content}`).join('\n\n')}\n\nPlease provide the specific information for your institution.`;
    }
    
    const newMessage: Message = {
      role: "assistant",
      content: guidelinesContent
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Button
          variant="ghost"
          onClick={() => navigate(`/external/country/${country}/ip-policies`)}
          className="mb-4 hover:bg-secondary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to IP Policies
        </Button>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-primary mb-1">WIPO IP Policy Toolkit</h1>
              <p className="text-muted-foreground text-sm">
                AI-Guided Policy Template Customization
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Progress</p>
              <div className="flex items-center gap-2">
                <Progress value={progress} className="w-24 h-2" />
                <span className="text-sm font-medium">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 h-[calc(100vh-200px)]">
          {/* Left Panel - Template, Checklist & Guidelines */}
          <div className="bg-card rounded-xl shadow-md border overflow-hidden flex flex-col">
            <div className="border-b flex">
              <button
                onClick={() => setActiveTab("template")}
                className={`flex-1 px-3 py-2.5 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
                  activeTab === "template" 
                    ? "bg-primary/10 text-primary border-b-2 border-primary" 
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <FileText className="h-3.5 w-3.5" />
                Template
              </button>
              <button
                onClick={() => setActiveTab("guidelines")}
                className={`flex-1 px-3 py-2.5 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
                  activeTab === "guidelines" 
                    ? "bg-primary/10 text-primary border-b-2 border-primary" 
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Wand2 className="h-3.5 w-3.5" />
                Guidelines
              </button>
              <button
                onClick={() => setActiveTab("checklist")}
                className={`flex-1 px-3 py-2.5 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
                  activeTab === "checklist" 
                    ? "bg-primary/10 text-primary border-b-2 border-primary" 
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <CheckSquare className="h-3.5 w-3.5" />
                Checklist
              </button>
            </div>

            <ScrollArea className="flex-1">
              {activeTab === "template" ? (
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b">
                    <div>
                      <h3 className="font-semibold text-sm">IP Policy Template</h3>
                      <p className="text-xs text-muted-foreground">
                        15 Articles • Click to navigate
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs" asChild>
                      <a href="/documents/policy_template.docx" download>
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </a>
                    </Button>
                  </div>

                  {policyTemplateArticles.map((article, index) => (
                    <div 
                      key={article.id} 
                      className={`border rounded-lg overflow-hidden ${
                        index === currentArticleIndex ? "border-primary ring-2 ring-primary/20" : ""
                      }`}
                    >
                      <button
                        onClick={() => handleArticleClick(index)}
                        className={`w-full p-3 transition-colors flex items-center justify-between text-left ${
                          index === currentArticleIndex 
                            ? "bg-primary/10" 
                            : "bg-muted/30 hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {completedArticles.includes(index) ? (
                            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          ) : index === currentArticleIndex ? (
                            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                              <span className="text-xs text-white font-bold">{index + 1}</span>
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">{index + 1}</span>
                            </div>
                          )}
                          <span className={`font-medium text-sm ${
                            index === currentArticleIndex ? "text-primary" : ""
                          }`}>
                            {article.title.replace("ARTICLE " + article.id + " - ", "")}
                          </span>
                        </div>
                        <ChevronRight className={`h-4 w-4 transition-transform ${
                          expandedArticle === article.id ? "rotate-90" : ""
                        }`} />
                      </button>
                      {expandedArticle === article.id && (
                        <div className="p-3 space-y-2 bg-background">
                          {article.sections.map((section) => (
                            <div key={section.id} className="text-xs">
                              <span className="font-medium text-primary">{section.id} {section.title}</span>
                              <p className="text-muted-foreground mt-0.5 leading-relaxed">{section.content}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : activeTab === "guidelines" ? (
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b">
                    <div>
                      <h3 className="font-semibold text-sm">Guidelines for Customization</h3>
                      <p className="text-xs text-muted-foreground">
                        Primary reference for definitions & examples
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs" asChild>
                      <a href="/documents/guidelines_template.docx" download>
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </a>
                    </Button>
                  </div>

                  <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                    <p className="text-xs font-medium text-accent mb-1">📚 Why Guidelines Matter</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      The Guidelines contain detailed explanations, real-world examples, and concrete definitions for each article. The AI uses this as the primary source when helping you customize your policy.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    {guidelinesOverview.articles.map((article, index) => (
                      <div key={index} className="p-2 bg-muted/30 rounded-lg flex items-start gap-2">
                        <div className={`w-5 h-5 rounded flex items-center justify-center text-xs font-medium flex-shrink-0 ${
                          index === currentArticleIndex ? "bg-primary text-white" : "bg-primary/10 text-primary"
                        }`}>
                          {index + 1}
                        </div>
                        <p className="text-xs">{article}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b">
                    <div>
                      <h3 className="font-semibold text-sm">IP Policy Writer's Checklist</h3>
                      <p className="text-xs text-muted-foreground">
                        For review after completing the template
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs" asChild>
                      <a href="/documents/checklist.docx" download>
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </a>
                    </Button>
                  </div>

                  <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-1">📋 When to Use</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      The Checklist is most useful at the end, once you've drafted all articles. Use it to validate completeness and ensure nothing was missed.
                    </p>
                  </div>

                  {checklistItems.map((phase, phaseIndex) => (
                    <div key={phase.phase} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                          phaseIndex === 0 ? "bg-blue-500" :
                          phaseIndex === 1 ? "bg-purple-500" :
                          phaseIndex === 2 ? "bg-amber-500" :
                          phaseIndex === 3 ? "bg-green-500" :
                          "bg-rose-500"
                        }`}>
                          {phaseIndex + 1}
                        </div>
                        <h4 className="font-semibold text-sm">{phase.phase}</h4>
                      </div>
                      <div className="space-y-1.5 ml-8">
                        {phase.items.map((item) => (
                          <div key={item.id} className="p-2 bg-muted/30 rounded-lg">
                            <div className="flex items-start gap-2">
                              <span className="text-xs font-medium text-primary min-w-[24px]">#{item.id}</span>
                              <div>
                                <p className="text-xs font-medium">{item.title}</p>
                                <p className="text-xs text-muted-foreground">{item.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>

          {/* Right Panel - AI Chat */}
          <div className="bg-card rounded-xl shadow-md border overflow-hidden flex flex-col">
            <div className="bg-accent/10 p-3 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center">
                  <Wand2 className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground">Policy Customization Assistant</h3>
                  <p className="text-xs text-muted-foreground">
                    Working on: {currentArticle.title}
                  </p>
                </div>
              </div>
              <Badge variant={isReviewMode ? "default" : "secondary"}>
                {isReviewMode ? "Review Mode" : "Drafting"}
              </Badge>
            </div>

            <ScrollArea className="flex-1 p-3">
              <div className="space-y-3">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[90%] rounded-2xl px-3 py-2 ${
                        message.role === "user"
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-xs whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-2xl px-3 py-2">
                      <div className="flex space-x-1.5">
                        <div className="w-1.5 h-1.5 bg-accent/60 rounded-full animate-bounce" />
                        <div className="w-1.5 h-1.5 bg-accent/60 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-1.5 h-1.5 bg-accent/60 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="p-3 border-t space-y-2">
              {/* Quick actions */}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => {
                    setInputMessage("next");
                    handleSendMessage();
                  }}
                  disabled={currentArticleIndex >= policyTemplateArticles.length - 1 && !isReviewMode}
                >
                  <ChevronRight className="h-3 w-3 mr-1" />
                  Next Article
                </Button>
                {currentArticleIndex > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => handleArticleClick(currentArticleIndex - 1)}
                  >
                    <ChevronLeft className="h-3 w-3 mr-1" />
                    Previous
                  </Button>
                )}
              </div>
              
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Enter your response or ask a question..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 text-sm"
                />
                <Button onClick={handleSendMessage} disabled={isLoading} className="bg-accent hover:bg-accent/90">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyToolkit;
