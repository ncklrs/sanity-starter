# Sanity Studio Self-Hosted Migration Plan

## Overview
Migrate Sanity Studio from managed hosting to self-hosted deployment while maintaining all functionality and ensuring seamless integration with the frontend.

## Current State Analysis
- **Studio Location**: `studio/` directory
- **Build System**: Vite-based (Sanity v3)
- **Dependencies**: React 18, TypeScript, Styled Components
- **Configuration**: Environment-based project ID and dataset
- **Features**: Structure tool, Vision tool, custom schemas

## Migration Strategy

### Phase 1: Preparation & Configuration
**Duration**: 1-2 days

#### 1.1 Environment Setup
- [ ] Create production environment variables file
- [ ] Document all required environment variables
- [ ] Set up different configurations for dev/staging/prod
- [ ] Configure CORS settings for self-hosted deployment

#### 1.2 Build Configuration
- [ ] Update `sanity.config.ts` for production deployment
- [ ] Configure base path for subdirectory deployment (if needed)
- [ ] Set up proper asset handling and CDN configuration
- [ ] Configure build output directory and optimization

#### 1.3 Package.json Updates
- [ ] Add production build scripts
- [ ] Add deployment scripts for different platforms
- [ ] Update dependencies for production compatibility
- [ ] Add health check endpoints

### Phase 2: Deployment Platform Selection
**Duration**: 1 day

#### 2.1 Platform Options Analysis
- [ ] **Vercel**: Easy deployment, good for Next.js integration
- [ ] **Netlify**: Static hosting, good for SPAs
- [ ] **Railway**: Full-stack platform, good for Node.js
- [ ] **Docker**: Containerized deployment, maximum flexibility
- [ ] **AWS/GCP**: Cloud platform deployment

#### 2.2 Recommended Approach
**Primary**: Vercel (for seamless integration with Next.js frontend)
**Backup**: Docker container for maximum portability

### Phase 3: Deployment Implementation
**Duration**: 2-3 days

#### 3.1 Vercel Deployment
- [ ] Create `vercel.json` configuration
- [ ] Set up build and output settings
- [ ] Configure environment variables in Vercel dashboard
- [ ] Set up custom domain (if needed)
- [ ] Configure redirects and rewrites

#### 3.2 Docker Alternative
- [ ] Create `Dockerfile` for containerized deployment
- [ ] Create `docker-compose.yml` for local development
- [ ] Set up multi-stage build for optimization
- [ ] Configure nginx for static file serving
- [ ] Set up health check endpoints

#### 3.3 Environment Configuration
- [ ] Set up production environment variables
- [ ] Configure CORS origins for frontend domain
- [ ] Set up proper security headers
- [ ] Configure CDN for static assets

### Phase 4: Frontend Integration
**Duration**: 1 day

#### 4.1 API Configuration
- [ ] Update frontend Sanity client configuration
- [ ] Test API connectivity with new studio URL
- [ ] Update CORS settings for frontend domain
- [ ] Configure proper error handling

#### 4.2 Environment Updates
- [ ] Update frontend environment variables
- [ ] Document new configuration requirements
- [ ] Update deployment documentation

### Phase 5: Testing & Validation
**Duration**: 1-2 days

#### 5.1 Functionality Testing
- [ ] Test all schema types and fields
- [ ] Verify image upload and management
- [ ] Test content creation and editing
- [ ] Validate API queries and mutations
- [ ] Test real-time collaboration features

#### 5.2 Performance Testing
- [ ] Measure build times
- [ ] Test load times and responsiveness
- [ ] Validate asset optimization
- [ ] Test with different content volumes

#### 5.3 Security Testing
- [ ] Verify CORS configuration
- [ ] Test authentication and authorization
- [ ] Validate environment variable security
- [ ] Check for exposed sensitive information

### Phase 6: Documentation & Handover
**Duration**: 1 day

#### 6.1 Documentation Updates
- [ ] Update README with deployment instructions
- [ ] Document environment variable requirements
- [ ] Create troubleshooting guide
- [ ] Document rollback procedures

#### 6.2 Monitoring & Maintenance
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Configure performance monitoring
- [ ] Set up automated backups
- [ ] Create maintenance schedule

## Technical Requirements

### Environment Variables
```env
# Required for all environments
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production

# Production specific
SANITY_STUDIO_STUDIO_HOST=https://your-studio-domain.com
SANITY_STUDIO_CORS_ORIGINS=https://your-frontend-domain.com
```

### Build Configuration
- **Output**: Static files for CDN deployment
- **Optimization**: Code splitting and tree shaking
- **Assets**: Optimized images and fonts
- **Security**: Proper headers and CORS

### Deployment Considerations
- **SSL**: HTTPS required for production
- **CDN**: Static asset optimization
- **Caching**: Proper cache headers
- **Monitoring**: Health checks and error tracking

## Risk Assessment

### High Risk
- **Data Loss**: Ensure proper backup before migration
- **Downtime**: Plan for zero-downtime deployment
- **API Breaking Changes**: Test all frontend integrations

### Medium Risk
- **Performance**: Monitor load times after migration
- **CORS Issues**: Test cross-origin requests thoroughly
- **Environment Variables**: Ensure proper configuration

### Low Risk
- **Build Process**: Standard Vite build should work
- **Dependencies**: No major version changes required

## Rollback Plan
1. Keep current managed studio running during migration
2. Test thoroughly before switching DNS
3. Maintain backup of all configurations
4. Document rollback procedures for each platform

## Success Criteria
- [ ] Studio accessible at new self-hosted URL
- [ ] All schema types working correctly
- [ ] Frontend integration functioning
- [ ] Performance meets or exceeds current levels
- [ ] Security requirements satisfied
- [ ] Documentation complete and accurate

## Timeline Summary
- **Total Duration**: 6-9 days
- **Critical Path**: Environment setup → Deployment → Testing
- **Dependencies**: Frontend team coordination for integration testing

## Next Steps
1. Review and approve this plan
2. Select deployment platform
3. Begin Phase 1 implementation
4. Set up monitoring and testing procedures 