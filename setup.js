#!/usr/bin/env node

/**
 * Interactive setup script for IES Bloom
 * Helps configure AWS credentials for Bedrock AI Assistant
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

function print(text, color = colors.reset) {
  console.log(`${color}${text}${colors.reset}`);
}

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function setup() {
  console.clear();
  print('\n🚀 IES Bloom - Interactive Setup\n', colors.bright);
  print('This will help you configure AWS Bedrock credentials for the AI Assistant.\n', colors.cyan);

  // Check if .env already exists
  const envPath = path.join(process.cwd(), '.env');
  const envExamplePath = path.join(process.cwd(), '.env.example');
  
  if (fs.existsSync(envPath)) {
    print('⚠️  .env file already exists!', colors.yellow);
    const overwrite = await question('Do you want to overwrite it? (y/N): ');
    if (overwrite.toLowerCase() !== 'y') {
      print('\n✅ Setup cancelled. Your existing .env file is unchanged.\n', colors.green);
      rl.close();
      return;
    }
  }

  print('\n📋 Please provide your AWS credentials:\n', colors.blue);
  print('   (You can find these in AWS IAM → Users → Security Credentials)\n', colors.cyan);

  // Get AWS Region
  const region = await question(`AWS Region [us-east-1]: `);
  const awsRegion = region.trim() || 'us-east-1';

  // Get Access Key
  print('\n', colors.reset);
  const accessKey = await question('AWS Access Key ID: ');
  if (!accessKey.trim()) {
    print('\n❌ Access Key is required. Setup cancelled.\n', colors.yellow);
    rl.close();
    return;
  }

  // Get Secret Key
  print('\n', colors.reset);
  const secretKey = await question('AWS Secret Access Key: ');
  if (!secretKey.trim()) {
    print('\n❌ Secret Key is required. Setup cancelled.\n', colors.yellow);
    rl.close();
    return;
  }

  // Get Model ID
  print('\n', colors.reset);
  const modelId = await question('Bedrock Model ID [anthropic.claude-3-haiku-20240307-v1:0]: ');
  const bedrockModel = modelId.trim() || 'anthropic.claude-3-haiku-20240307-v1:0';

  // Create .env content
  const envContent = `# AWS Bedrock Configuration
VITE_AWS_REGION=${awsRegion}
VITE_AWS_ACCESS_KEY_ID=${accessKey.trim()}
VITE_AWS_SECRET_ACCESS_KEY=${secretKey.trim()}
VITE_BEDROCK_MODEL_ID=${bedrockModel}
`;

  // Write .env file
  try {
    fs.writeFileSync(envPath, envContent, 'utf8');
    print('\n✅ Success! .env file created with your AWS credentials.\n', colors.green);
    
    print('📝 Next steps:\n', colors.bright);
    print('   1. Make sure Claude model is enabled in AWS Bedrock console', colors.cyan);
    print('   2. Run: npm run dev', colors.cyan);
    print('   3. Open: http://localhost:5173\n', colors.cyan);
    
    print('🔒 Security reminder:', colors.yellow);
    print('   - Never commit .env to version control', colors.yellow);
    print('   - .env is already in .gitignore\n', colors.yellow);

    print('📚 For more help, see: SETUP.md\n', colors.blue);
    
  } catch (error) {
    print(`\n❌ Error creating .env file: ${error.message}\n`, colors.yellow);
  }

  rl.close();
}

// Handle Ctrl+C gracefully
rl.on('SIGINT', () => {
  print('\n\n✋ Setup cancelled.\n', colors.yellow);
  process.exit(0);
});

setup().catch((error) => {
  print(`\n❌ Setup failed: ${error.message}\n`, colors.yellow);
  rl.close();
  process.exit(1);
});
