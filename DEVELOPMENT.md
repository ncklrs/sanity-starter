# Development Guide

This guide explains how to work with the unified Sanity LLM setup.

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ 
- npm 8+

### Installation
```bash
npm install
```

## 🛠️ Development Workflow

### Simple Two-Terminal Setup

```bash
# Terminal 1: Start frontend
npm run dev

# Terminal 2: Start studio
npm run studio
```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Studio (embedded)**: http://localhost:3000/studio
- **Studio (direct)**: http://localhost:3333/studio

## 🎯 How It Works

The setup is now **unified and simplified**:

1. **Frontend** runs on port 3000 with Next.js
2. **Studio** runs on port 3333 with Sanity
3. **Studio Page** at `/studio` embeds the studio in an iframe
4. **No proxies or complex routing** - just direct access

## 🔧 Available Scripts

### Frontend Scripts
```bash
npm run dev          # Start Next.js development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
npm run format       # Format code with Prettier
```

### Studio Scripts
```bash
npm run studio       # Start Sanity Studio development
npm run studio:build # Build studio for production
npm run studio:deploy # Deploy studio to Sanity
```

## 🏗️ Project Structure

```
sanity-llm/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Homepage
│   └── studio/            # Studio page
│       └── page.tsx       # Embedded studio interface
├── components/             # React components
├── lib/                    # Utilities and configurations
│   ├── sanity/            # Sanity client and data fetching
│   ├── queries/           # GROQ queries
│   └── types/             # TypeScript type definitions
├── sanity/                 # Studio utilities
│   └── deskStructure.ts   # Custom desk structure
├── schemaTypes/           # Sanity content schemas
├── sanity.config.ts       # Sanity Studio configuration
├── next.config.js         # Next.js configuration
└── package.json           # Dependencies and scripts
```

## 🎨 Sanity Studio Features

### Installed Plugins
- **@sanity/assist**: AI-powered content assistance
- **@sanity/code-input**: Code editor for code blocks
- **@sanity/color-input**: Color picker for design fields
- **@sanity/vision**: GROQ query explorer
- **sanity-plugin-media**: Enhanced media management

### Custom Desk Structure
The studio is organized into logical sections:
- **Pages**: All pages, published pages, draft pages
- **Posts**: All posts, published posts, draft posts
- **Settings**: Site configuration
- **Media**: Media assets
- **Schema Types**: Other content types

## 🔄 Development Tips

### 1. Studio Access
- **Primary**: Visit http://localhost:3000/studio (embedded)
- **Direct**: Visit http://localhost:3333/studio (standalone)
- **Both work** - choose your preference

### 2. Environment Variables
Create a `.env.local` file with your Sanity configuration:
```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production

# Preview Mode Configuration
SANITY_API_TOKEN=your_preview_token_here
SANITY_PREVIEW_SECRET=your_preview_secret_here

# Webhook Configuration
SANITY_WEBHOOK_SECRET=your_webhook_secret_here

# Studio Configuration
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
```

### 3. Troubleshooting

**Studio not loading in iframe:**
- Check if studio is running: `curl http://localhost:3333/studio`
- Restart studio: `npm run studio`
- Try direct access: http://localhost:3333/studio

**Port conflicts:**
```bash
# Kill processes on ports
lsof -ti:3000,3333 | xargs kill -9

# Restart services
npm run dev    # Terminal 1
npm run studio # Terminal 2
```

## 🚀 Production Deployment

### Frontend Deployment
```bash
npm run build
npm run start
```

### Studio Deployment
```bash
npm run studio:build
npm run studio:deploy
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Studio Configuration](https://www.sanity.io/docs/studio-configuration)
- [GROQ Query Language](https://www.sanity.io/docs/groq)

## 🤝 Contributing

1. Use the simple two-terminal setup
2. Access studio via `/studio` route
3. Format code with `npm run format`
4. Fix linting issues with `npm run lint:fix`
5. Test both frontend and studio functionality 