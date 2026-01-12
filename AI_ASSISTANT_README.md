# AI Assistant - Setup Guide

## Overview

The AI Assistant is a context-aware chatbot that helps users navigate WIPO resources, understand IP policies, and get guidance on policy drafting and customization.

## Features

- **Context-Aware**: Automatically detects the current page and country being viewed
- **Floating Chat Bubble**: Always accessible from the bottom-right corner
- **Smart Responses**: Powered by AWS Bedrock Claude for intelligent, helpful answers
- **Quick Prompts**: Suggested questions to get started quickly
- **Conversation History**: Maintains context throughout the conversation

## Setup Instructions

### 1. AWS Bedrock Configuration

You need an AWS account with Bedrock access. Follow these steps:

1. **Enable AWS Bedrock Claude Model**
   - Go to AWS Console → Bedrock → Model Access
   - Request access to Claude 3.5 Sonnet model
   - Wait for approval (usually instant)

2. **Create IAM User with Bedrock Access**
   - Go to AWS Console → IAM → Users → Create User
   - Attach policy: `AmazonBedrockFullAccess`
   - Create access keys and save them securely

3. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Add your AWS credentials:
   ```env
   VITE_AWS_REGION=us-east-1
   VITE_AWS_ACCESS_KEY_ID=your_access_key_here
   VITE_AWS_SECRET_ACCESS_KEY=your_secret_key_here
   VITE_BEDROCK_MODEL_ID=anthropic.claude-3-5-sonnet-20241022-v2:0
   ```

### 2. Install Dependencies

The AWS SDK is already installed. If you need to reinstall:

```bash
npm install @aws-sdk/client-bedrock-runtime
```

### 3. Test the Assistant

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Navigate to any external interface page (e.g., `/external/country/morocco`)

3. Click the floating chat bubble in the bottom-right corner

4. Try asking questions like:
   - "What IP resources are available for this country?"
   - "How do I customize an IP policy?"
   - "Explain IP ownership in research institutions"

## Context Awareness

The AI Assistant automatically provides relevant information based on:

### Country Context

When viewing a country page (e.g., Morocco), the assistant:

- Mentions the country name in its welcome message
- Provides country-specific guidance
- References relevant country resources

### Page Context

The assistant adapts based on the current page:

- **IP Tools**: Focuses on available tools and frameworks
- **IP Policies**: Emphasizes policy drafting and customization
- **Reports**: Helps navigate and understand reports
- **Benchbook**: Assists with benchbook resources

## Customization

### Modify System Prompts

Edit `src/components/AIAssistant.tsx` in the `getSystemPrompt()` function to:

- Add more context
- Change the assistant's personality
- Include specific WIPO resources

### Adjust Welcome Messages

Edit the `getWelcomeMessage()` function to customize greetings for different contexts.

### Change Quick Prompts

Modify the `quickPrompts` array to provide different suggested questions.

## Architecture

### Components

1. **AIAssistant.tsx** - Main chat interface component
   - Manages conversation state
   - Handles API calls to Bedrock
   - Renders chat UI

2. **AIAssistantWrapper.tsx** - Context detection wrapper
   - Detects current route and page
   - Extracts country information
   - Passes context to AIAssistant

3. **bedrockService.ts** - AWS Bedrock integration
   - Handles API communication
   - Manages message formatting
   - Error handling

### Flow

```
User opens page → AIAssistantWrapper detects context →
Passes to AIAssistant → User asks question →
Calls bedrockService → Gets response from Claude →
Displays formatted answer
```

## Troubleshooting

### Chat bubble not appearing

- Check that you're on an `/external` route
- The assistant only shows on public-facing pages

### API errors

- Verify AWS credentials in `.env`
- Check AWS Bedrock model access
- Ensure region is correct (us-east-1 recommended)
- Check browser console for detailed errors

### Slow responses

- Claude typically responds in 2-5 seconds
- Longer prompts may take more time
- Check your internet connection

## Security Notes

⚠️ **Important**:

- Never commit `.env` file to version control
- AWS credentials in client-side code are visible to users
- For production, implement a backend proxy to secure credentials
- Consider using AWS Cognito for secure authentication

## Future Enhancements

Potential improvements:

- [ ] Backend API proxy for secure credential handling
- [ ] Conversation history persistence
- [ ] Export chat transcripts
- [ ] Voice input support
- [ ] Multi-language support
- [ ] Integration with document search
- [ ] Suggested follow-up questions
- [ ] Rate limiting and usage tracking

## Support

For issues or questions:

1. Check AWS Bedrock documentation
2. Review console errors
3. Verify environment configuration
4. Contact WIPO IES team
