import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

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

// Initialize Bedrock client with credentials from environment variables
const getBedrockClient = () => {
  const region = import.meta.env.VITE_AWS_REGION;
  const accessKeyId = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
  const secretAccessKey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;

  if (!region || !accessKeyId || !secretAccessKey) {
    throw new Error("AWS credentials not configured. Please check your environment variables.");
  }

  return new BedrockRuntimeClient({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
};

/**
 * Call AWS Bedrock Claude model
 */
export async function callBedrockClaude({
  messages,
  systemPrompt = "You are a helpful AI assistant specialized in intellectual property policy for academic and research institutions.",
  maxTokens = 4096,
  temperature = 0.7,
}: BedrockRequest): Promise<string> {
  try {
    const client = getBedrockClient();
    const modelId = import.meta.env.VITE_BEDROCK_MODEL_ID || "anthropic.claude-3-haiku-20240307-v1:0";

    // Format messages for Claude API
    const formattedMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content,
    }));

    const payload = {
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: formattedMessages,
      temperature,
    };

    const command = new InvokeModelCommand({
      modelId,
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify(payload),
    });

    const response = await client.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));

    if (responseBody.content && responseBody.content.length > 0) {
      return responseBody.content[0].text;
    }

    throw new Error("No response from Bedrock");
  } catch (error) {
    console.error("Error calling Bedrock:", error);
    throw new Error(`Failed to call Bedrock: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
