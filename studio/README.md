# Sanity Studio

This is a [Sanity Studio](https://www.sanity.io/) project configured for self-hosted deployment on Vercel.

## Features

- **Content Management**: Rich text editing with Portable Text
- **SEO Management**: Comprehensive SEO fields and metadata
- **LLM Integration**: AI/LLM metadata for content intelligence
- **Image Management**: Hotspot support and optimization
- **Schema Validation**: TypeScript-based schema definitions

## Development

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Sanity account and project

### Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment configuration**:
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your Sanity project details:
   ```env
   SANITY_STUDIO_PROJECT_ID=your-project-id
   SANITY_STUDIO_DATASET=production
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open Studio**: Navigate to [http://localhost:3333](http://localhost:3333)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:prod` - Build with production optimizations
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## Deployment

### Vercel Deployment

1. **Connect to Vercel**:
   - Push code to GitHub/GitLab
   - Import project in Vercel dashboard
   - Set build settings:
     - Framework: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`

2. **Environment Variables**:
   Set the following in Vercel dashboard:
   ```env
   SANITY_STUDIO_PROJECT_ID=your-project-id
   SANITY_STUDIO_DATASET=production
   SANITY_STUDIO_STUDIO_HOST=https://your-studio-domain.com
   SANITY_STUDIO_CORS_ORIGINS=https://your-frontend-domain.com
   ```

3. **Deploy**: Vercel will automatically build and deploy

### Custom Domain

1. Add custom domain in Vercel dashboard
2. Update `SANITY_STUDIO_STUDIO_HOST` environment variable
3. Update CORS origins if needed

## Schema Types

### Post
- **Content**: Rich text body with Portable Text
- **SEO**: Meta tags, Open Graph, structured data
- **LLM Metadata**: AI content intelligence

### Objects
- **SEO**: Reusable SEO configuration
- **LLM Metadata**: AI/LLM content processing data
- **Block Content**: Standardized rich text content

## Configuration

### CORS Settings
Configure allowed origins for frontend integration:
```env
SANITY_STUDIO_CORS_ORIGINS=https://your-frontend.com,https://staging.your-frontend.com
```

### Base Path
For subdirectory deployment:
```env
SANITY_STUDIO_BASE_PATH=/studio
```

## Troubleshooting

### Build Issues
- Ensure all environment variables are set
- Check TypeScript compilation: `npm run type-check`
- Verify schema types are properly exported

### CORS Issues
- Verify `SANITY_STUDIO_CORS_ORIGINS` includes frontend domain
- Check browser console for CORS errors
- Ensure HTTPS is used in production

### Performance
- Monitor build times in Vercel dashboard
- Check bundle size with `npm run build`
- Optimize images and assets

## Security

- Environment variables are encrypted in Vercel
- CORS is configured to prevent unauthorized access
- Security headers are set via `vercel.json`
- HTTPS is enforced in production

## Support

- [Sanity Documentation](https://www.sanity.io/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Portable Text](https://portabletext.org/) 