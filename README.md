# Sanity LLM Monorepo

A monorepo containing a self-hosted Sanity Studio and Next.js frontend with LLM integration and SEO optimization.

## 🏗️ Project Structure

```
sanity-llm/
├── app/              # Next.js App Router pages
├── lib/              # Shared utilities and queries
├── studio/           # Self-hosted Sanity Studio
├── package.json      # Root configuration with frontend dependencies
├── turbo.json        # Turbo build configuration
├── .prettierrc       # Code formatting rules
└── README.md         # This file
```

## ✨ Features

### Frontend (Next.js)
- **Blog System**: Dynamic blog posts with SEO optimization
- **LLM Metadata Display**: Content intelligence visualization
- **Portable Text**: Rich content rendering
- **SEO Integration**: Meta tags, Open Graph, structured data
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Studio (Sanity CMS)
- **Self-Hosted**: Deployed on Vercel
- **Rich Content**: Portable Text with advanced formatting
- **SEO Management**: Comprehensive SEO fields
- **LLM Integration**: AI/LLM metadata for content intelligence
- **Image Management**: Hotspot support and optimization

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 8+
- Sanity account and project
- Vercel account (for deployment)

### Installation

1. **Clone and install dependencies**:
   ```bash
   git clone <your-repo-url>
   cd sanity-llm
   npm install
   ```

2. **Environment setup**:
   ```bash
   # Copy environment templates
   cp env.example .env.local
   cp studio/env.example studio/.env.local
   ```

3. **Configure environment variables**:

   **Frontend** (`.env.local`):
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

   **Studio** (`studio/.env.local`):
   ```env
   SANITY_STUDIO_PROJECT_ID=your-project-id
   SANITY_STUDIO_DATASET=production
   ```

4. **Start development servers**:
   ```bash
   npm run dev
   ```

5. **Access applications**:
   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Studio**: [http://localhost:3333](http://localhost:3333)

## 📜 Available Scripts

### Root Level
```bash
npm run dev              # Start both frontend and studio
npm run dev:frontend     # Start frontend only
npm run dev:studio       # Start studio only
npm run build            # Build all workspaces
npm run lint             # Lint all workspaces
npm run type-check       # Type check all workspaces
```

### Individual Components
```bash
# Frontend (root level)
npm run dev:frontend
npm run build:frontend
npm run lint:frontend

# Studio
npm run dev:studio
npm run build:studio
npm run deploy:studio
```

## 🚀 Deployment

### Studio Deployment (Vercel)
1. Push code to GitHub/GitLab
2. Import `studio/` directory in Vercel
3. Configure environment variables
4. Deploy automatically

### Frontend Deployment (Vercel)
1. Import root directory in Vercel
2. Configure environment variables
3. Deploy automatically

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.

## 📁 Component Details

### Frontend (Root Level)
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Content**: Portable Text rendering
- **SEO**: Dynamic metadata generation
- **LLM**: Content intelligence display

### Studio (`/studio`)
- **CMS**: Sanity v3
- **Hosting**: Self-hosted on Vercel
- **Content**: Rich text with Portable Text
- **Schema**: TypeScript-based schemas
- **Features**: SEO, LLM metadata, image management

## 🔧 Configuration

### Environment Variables
See individual component READMEs for detailed environment variable requirements:
- [Studio Environment](studio/README.md)

### CORS Configuration
Configure CORS origins in studio environment:
```env
SANITY_STUDIO_CORS_ORIGINS=https://your-frontend-domain.com
```

## 📚 Documentation

- [Migration Plan](SANITY_MIGRATION_PLAN.md) - Self-hosted migration details
- [Deployment Guide](DEPLOYMENT_GUIDE.md) - Step-by-step deployment
- [Maintenance Schedule](MAINTENANCE_SCHEDULE.md) - Ongoing maintenance
- [Studio README](studio/README.md) - Studio-specific documentation

## 🛠️ Development

### Adding Dependencies
```bash
# Add to root (frontend dependencies)
npm install package-name

# Add to studio workspace
npm install package-name --workspace=studio

# Add to root (dev dependencies)
npm install -D package-name
```

### TypeScript Configuration
- Root level: `tsconfig.json` (frontend)
- Studio: `studio/tsconfig.json`

### Linting and Formatting
```bash
npm run lint              # Lint all components
npm run lint:fix          # Fix linting issues
```

## 🔍 Troubleshooting

### Common Issues
1. **Port conflicts**: Ensure ports 3000 and 3333 are available
2. **Environment variables**: Verify all required variables are set
3. **Build errors**: Check TypeScript compilation in each component
4. **CORS issues**: Verify CORS configuration for production

### Getting Help
- Check individual component READMEs
- Review [Deployment Guide](DEPLOYMENT_GUIDE.md)
- Check [Maintenance Schedule](MAINTENANCE_SCHEDULE.md)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
# sanity-starter
# sanity-starter
