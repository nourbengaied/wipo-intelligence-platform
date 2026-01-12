# 🚀 Quick Start Card

## First Time Setup (5 minutes)

```bash
# 1. Install
npm install

# 2. Setup AWS (interactive prompts)
npm run setup

# 3. Run
npm run dev
```

## Daily Development

```bash
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check code quality
```

## What You Need

- ✅ Node.js 18+ (check: `node --version`)
- ✅ AWS Bedrock account (for AI Assistant only)
- ✅ Claude model enabled in AWS Bedrock

## AWS Setup Checklist

- [ ] AWS Account created
- [ ] Go to IAM → Create Access Key
- [ ] Go to Bedrock → Enable Claude 3 Haiku model
- [ ] Run `npm run setup` with your credentials

## Troubleshooting

**AI not working?**
→ Check `.env` file has correct AWS credentials
→ Verify Claude is enabled in Bedrock console

**Port already in use?**
→ `npm run dev -- --port 3000`

**Build failing?**
→ `rm -rf node_modules && npm install`

## Project Features

- 🌍 **External Interface**: Public country IP resources
- 🔒 **Internal Interface**: WIPO staff dashboard
- 🤖 **AI Assistant**: Context-aware help (needs AWS Bedrock)
- 📊 **Reports**: Country-specific IP reports
- 📚 **Policy Toolkit**: AI-powered policy customization
- 🗂️ **Policies Database**: Institutional IP policies

## Important Files

```
.env              # AWS credentials (CREATE THIS!)
SETUP.md          # Detailed setup guide
src/App.tsx       # Main routing
src/services/     # AWS Bedrock integration
```

## Security

⚠️ **Never commit `.env` to git!** (already in .gitignore)

## Get Help

📚 Full guide: [SETUP.md](./SETUP.md)
🐛 Check console for errors
☁️ AWS Bedrock: https://console.aws.amazon.com/bedrock/
