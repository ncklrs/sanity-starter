# Sanity Studio Self-Hosted Deployment Guide

## Overview
This guide covers the deployment of Sanity Studio to Vercel for self-hosted management.

## Prerequisites
- Vercel account
- GitHub/GitLab repository
- Sanity project with API access
- Domain name (optional)

## Deployment Steps

### 1. Repository Setup
Ensure your studio code is in a Git repository:
```bash
cd studio
git init
git add .
git commit -m "Initial commit for self-hosted deployment"
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Vercel Project Setup
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your Git repository
4. Configure project settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `studio` (if in monorepo)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 3. Environment Variables
Set the following in Vercel dashboard:

#### Required Variables
```env
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
```

#### Production Variables
```env
SANITY_STUDIO_STUDIO_HOST=https://your-studio-domain.com
SANITY_STUDIO_CORS_ORIGINS=https://your-frontend-domain.com
```

#### Optional Variables
```env
SANITY_STUDIO_BASE_PATH=/studio
SANITY_STUDIO_API_VERSION=2024-01-01
```

### 4. Custom Domain (Optional)
1. In Vercel dashboard, go to project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update `SANITY_STUDIO_STUDIO_HOST` environment variable
5. Update CORS origins if needed

### 5. Deploy
1. Vercel will automatically build and deploy
2. Monitor build logs for any issues
3. Test the deployed studio at your domain

## Frontend Integration

### Update Frontend Environment
Add to your frontend `.env.local`:
```env
NEXT_PUBLIC_SANITY_STUDIO_URL=https://your-studio-domain.com
```

### Test Integration
1. Verify API connectivity
2. Test content creation and editing
3. Check CORS configuration
4. Validate image uploads

## Monitoring & Maintenance

### Health Checks
- Monitor Vercel deployment status
- Check build times and success rates
- Monitor API response times

### Performance
- Review Vercel analytics
- Monitor bundle sizes
- Check CDN performance

### Security
- Regularly update dependencies
- Monitor for security vulnerabilities
- Review access logs

## Troubleshooting

### Build Failures
1. Check environment variables
2. Verify TypeScript compilation
3. Review build logs in Vercel

### CORS Issues
1. Verify CORS origins configuration
2. Check browser console for errors
3. Ensure HTTPS is used

### Performance Issues
1. Monitor bundle size
2. Check CDN configuration
3. Review asset optimization

## Rollback Plan
1. Keep previous deployment URL
2. Maintain environment variable backups
3. Document rollback procedures
4. Test rollback process

## Support
- [Vercel Documentation](https://vercel.com/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Migration Guide](SANITY_MIGRATION_PLAN.md) 