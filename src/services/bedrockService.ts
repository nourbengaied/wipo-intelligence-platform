import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

// Helper function to log to both console and terminal (via console methods that show in Vite)
const log = (emoji: string, label: string, data: any) => {
  const message = `${emoji} ${label}`;
  console.log(message, data);
  // Also log as a formatted string for better terminal visibility
  console.log(`\n${message}\n${JSON.stringify(data, null, 2)}\n`);
};

const logError = (emoji: string, label: string, data: any) => {
  const message = `${emoji} ${label}`;
  console.error(message, data);
  console.error(`\n${message}\n${JSON.stringify(data, null, 2)}\n`);
};

// Log environment configuration on load
log("🔧", "[Bedrock Config]", {
  hasAccessKey: !!import.meta.env.VITE_AWS_ACCESS_KEY_ID,
  hasSecretKey: !!import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  region: import.meta.env.VITE_AWS_REGION || "us-east-1",
  modelId: import.meta.env.VITE_BEDROCK_MODEL_ID || "anthropic.claude-3-haiku-20240307-v1:0",
  accessKeyPrefix: import.meta.env.VITE_AWS_ACCESS_KEY_ID?.substring(0, 8) + "...",
});

// Initialize the Bedrock client
const client = new BedrockRuntimeClient({
  region: import.meta.env.VITE_AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY || "",
  },
});

interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface BedrockRequest {
  messages: Message[];
  systemPrompt?: string;
  maxTokens?: number;
  temperature?: number;
}

/**
 * Call AWS Bedrock Claude model with conversation history
 */
export async function callBedrockClaude({
  messages,
  systemPrompt = "You are a helpful AI assistant specialized in intellectual property policy for academic and research institutions.",
  maxTokens = 4096,
  temperature = 0.7,
}: BedrockRequest): Promise<string> {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const startTime = Date.now();
  
  log("🚀", "[Bedrock Request]", {
    requestId,
    timestamp: new Date().toISOString(),
    modelId: import.meta.env.VITE_BEDROCK_MODEL_ID || "anthropic.claude-3-haiku-20240307-v1:0",
    messageCount: messages.length,
    lastUserMessage: messages[messages.length - 1]?.content.substring(0, 100) + "...",
    maxTokens,
    temperature,
  });

  try {
    // Prepare the request payload for Claude 3
    const payload = {
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: maxTokens,
      temperature: temperature,
      system: systemPrompt,
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
    };

    // Use Claude 3 Haiku - faster and more cost-effective
    const modelId = import.meta.env.VITE_BEDROCK_MODEL_ID || "anthropic.claude-3-haiku-20240307-v1:0";

    log("📤", "[Bedrock Payload]", {
      requestId,
      payloadSize: JSON.stringify(payload).length,
      systemPromptLength: systemPrompt.length,
    });

    const command = new InvokeModelCommand({
      modelId: modelId,
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify(payload),
    });

    const response = await client.send(command);
    const duration = Date.now() - startTime;
    
    // Parse the response
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    
    log("✅", "[Bedrock Response]", {
      requestId,
      duration: `${duration}ms`,
      statusCode: response.$metadata.httpStatusCode,
      awsRequestId: response.$metadata.requestId,
      inputTokens: responseBody.usage?.input_tokens,
      outputTokens: responseBody.usage?.output_tokens,
      stopReason: responseBody.stop_reason,
      responsePreview: responseBody.content?.[0]?.text?.substring(0, 100) + "...",
    });
    
    // Extract the assistant's message
    if (responseBody.content && responseBody.content.length > 0) {
      log("📊", "[Bedrock Stats]", {
        requestId,
        totalDuration: `${duration}ms`,
        charactersReceived: responseBody.content[0].text.length,
        avgSpeed: `${(responseBody.content[0].text.length / (duration / 1000)).toFixed(0)} chars/sec`,
      });
      
      return responseBody.content[0].text;
    }
    
    throw new Error("No content in response");
  } catch (error) {
    const duration = Date.now() - startTime;
    logError("❌", "[Bedrock Error]", {
      requestId,
      duration: `${duration}ms`,
      error: error instanceof Error ? error.message : "Unknown error",
      errorDetails: error,
    });
    throw new Error(`Failed to get response from Claude: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * System prompt for IP Policy customization assistant
 */
export const IP_POLICY_SYSTEM_PROMPT = `You are an expert AI assistant specialized in helping academic and research institutions customize their Intellectual Property (IP) policies. You are guided by three key WIPO (World Intellectual Property Organization) documents:

1. **IP Policy Template for Academic and Research Institutions** - Contains 15 comprehensive articles covering all aspects of IP policy including:
   - Definitions and scope
   - Ownership of IP
   - Disclosure and protection
   - Commercialization and licensing
   - Revenue sharing and incentives
   - Collaborative research
   - Conflict resolution

2. **IP Policy Writer's Checklist** - A comprehensive 24-item checklist organized in 5 phases:
   - Phase 1: Prepare (Research, stakeholder engagement, institutional assessment)
   - Phase 2: Draft (Writing policy articles, legal review, customization)
   - Phase 3: Implement (Approval, communication, training)
   - Phase 4: Monitor (Performance tracking, review cycles)
   - Phase 5: Revise (Updates based on feedback and changes)

3. **Guidelines for Customization** - Detailed explanations and examples for each article to help institutions adapt the template to their specific context.

Your role is to:
- Guide users through the policy customization process step-by-step
- Help draft institution-specific policy language
- Answer questions about IP policy concepts and best practices
- Provide context-specific recommendations based on the institution's type, size, and goals
- Reference specific WIPO resources, documents, and guidelines
- Be clear, professional, and constructive in your assistance

Always provide practical, actionable guidance and ask clarifying questions when needed to better understand the user's specific situation.`;
