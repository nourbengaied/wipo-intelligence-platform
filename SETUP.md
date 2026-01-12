# IES Bloom - Local Setup Guide

This guide will help you run the IES Bloom project locally on your machine.

## Prerequisites

You need to have installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/) or use [nvm](https://github.com/nvm-sh/nvm)
- **npm** (comes with Node.js)
- **AWS Account** with Bedrock access (for AI Assistant functionality)

## Quick Start (5 minutes)

### 1. Clone the Repository

```bash
git clone <YOUR_GIT_URL>
cd remix-of-wipo-country-insights-81
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure AWS Credentials

**Option A: Automatic Setup (Recommended)**
```bash
npm run setup
```
This will prompt you for your AWS credentials and configure everything automatically.

**Option B: Manual Setup**
```bash
# Copy the environment template
cp .env.example .env

# Edit .env with your credentials
# nano .env  # or use any text editor
```

Edit `.env` and replace the placeholder values:
```env
VITE_AWS_REGION=us-east-1
VITE_AWS_ACCESS_KEY_ID=your_actual_access_key
VITE_AWS_SECRET_ACCESS_KEY=your_actual_secret_key
VITE_BEDROCK_MODEL_ID=anthropic.claude-3-haiku-20240307-v1:0
```

### 4. Start the Development Server

```bash
npm run dev
```

The application will open at `http://localhost:5173`

## AWS Bedrock Setup

The AI Assistant requires AWS Bedrock with Claude access.

### Getting AWS Credentials

1. Log in to [AWS Console](https://console.aws.amazon.com/)
2. Go to **IAM** → **Users** → Select your user
3. Go to **Security Credentials** tab
4. Click **Create Access Key**
5. Select **Application running outside AWS**
6. Save your Access Key ID and Secret Access Key

### Enable Bedrock Access

1. Go to [AWS Bedrock Console](https://console.aws.amazon.com/bedrock/)
2. Select **us-east-1** region
3. Go to **Model access**
4. Click **Enable specific models**
5. Enable **Claude 3 Haiku** (or your preferred model)
6. Wait for approval (usually instant)

### Required IAM Permissions

Your AWS user needs the following permission:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel"
      ],
      "Resource": "arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-haiku-20240307-v1:0"
    }
  ]
}
```

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
npm run setup     # Interactive AWS setup (if available)
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── internal/       # Internal interface components
│   ├── AIAssistant.tsx # AI chat assistant
│   └── CountryList.tsx # Country selection
├── pages/              # Page components
│   ├── Landing.tsx     # Interface selector
│   ├── Index.tsx       # Country selection (external)
│   ├── internal/       # Internal WIPO staff pages
│   └── ...             # Other pages
├── services/           # API services
│   └── bedrockService.ts # AWS Bedrock integration
├── data/               # Static data
├── lib/                # Utilities
└── App.tsx             # Main app & routing
```

## Troubleshooting

### AI Assistant Not Working

**Problem**: AI Assistant shows errors or doesn't respond

**Solutions**:
1. Check your `.env` file has correct AWS credentials
2. Verify AWS region is `us-east-1` (or your enabled region)
3. Ensure Claude model is enabled in AWS Bedrock console
4. Check IAM permissions allow `bedrock:InvokeModel`
5. Look at browser console for specific error messages

### Port Already in Use

**Problem**: Port 5173 is already taken

**Solution**:
```bash
# Kill the process using port 5173
lsof -ti:5173 | xargs kill -9

# Or start on a different port
npm run dev -- --port 3000
```

### Dependencies Installation Issues

**Problem**: npm install fails

**Solutions**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Try using Node v18 or v20
nvm install 20
nvm use 20
npm install
```

### Build Errors

**Problem**: Build fails with TypeScript errors

**Solution**:
```bash
# Check for type errors
npm run lint

# Clean build and retry
rm -rf dist
npm run build
```

## Running Without AI Assistant

If you don't have AWS Bedrock access, the app will still work! The AI Assistant won't be functional, but all other features (country selection, reports, tools, policies) will work normally.

To disable AI Assistant errors:
1. Don't create a `.env` file, or
2. Leave the AWS credentials empty in `.env`

## Development Tips

- **Hot Reload**: Changes auto-reload in development mode
- **Type Checking**: TypeScript provides full type safety
- **UI Components**: Uses shadcn/ui + Tailwind CSS
- **Routing**: React Router v6 for navigation
- **State**: React Query for data fetching

## Need Help?

- Check the browser console for error messages
- Review AWS Bedrock logs in CloudWatch
- Verify environment variables are loaded: Check browser dev tools → Console for config logs

## Production Deployment

See main [README.md](./README.md) for deployment instructions using Lovable.
