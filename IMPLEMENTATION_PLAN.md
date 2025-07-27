# Implementation Plan: Studio at /studio URL with Page Schema and Settings

## Overview
This plan outlines the implementation of:
1. Studio accessible at `/studio` URL path
2. Page schema with SEO, LLM metadata, and content modules
3. Settings schema for site configuration and homepage selection
4. Proper field categorization and organization

## 🎯 Phase 1: Studio URL Configuration

### 1.1 Update Studio Base Path
**File**: `studio/sanity.config.ts`
**Changes**:
- Set `basePath: '/studio'` in the configuration
- Update CORS origins to include the new studio URL
- Ensure proper routing for the studio

**Code Changes**:
```typescript
export default defineConfig({
  // ... existing config
  basePath: '/studio', // Add this line
  // ... rest of config
});
```

### 1.2 Update Frontend Configuration
**File**: `next.config.js`
**Changes**:
- Add proxy configuration to route `/studio` requests to the studio dev server
- Configure proper rewrites for production deployment

**Code Changes**:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/studio/:path*',
        destination: process.env.NODE_ENV === 'development' 
          ? 'http://localhost:3333/studio/:path*' 
          : '/studio/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
```

### 1.3 Update Development Scripts
**File**: `package.json`
**Changes**:
- Update studio dev script to use the correct base path
- Ensure proper port configuration

## 🎯 Phase 2: Page Schema Implementation

### 2.1 Create Page Schema
**File**: `studio/schemaTypes/page.ts`
**Features**:
- SEO metadata (reuse existing SEO object)
- LLM metadata (reuse existing LLM metadata object)
- Content modules array
- Page settings (slug, title, status, etc.)

**Schema Structure**:
```typescript
export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'llm', title: 'LLM Metadata' },
    { name: 'modules', title: 'Content Modules' },
  ],
  fields: [
    // Content Group
    defineField({ name: 'title', title: 'Page Title', type: 'string', group: 'content' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', group: 'content' }),
    defineField({ name: 'status', title: 'Status', type: 'string', options: { list: ['draft', 'published'] }, group: 'content' }),
    
    // SEO Group
    defineField({ name: 'seo', title: 'SEO Settings', type: 'seo', group: 'seo' }),
    
    // LLM Group
    defineField({ name: 'llmMetadata', title: 'LLM Metadata', type: 'llmMetadata', group: 'llm' }),
    
    // Modules Group
    defineField({ 
      name: 'modules', 
      title: 'Content Modules', 
      type: 'array', 
      of: [
        { type: 'heroModule' },
        { type: 'textModule' },
        { type: 'imageModule' },
        { type: 'galleryModule' },
        { type: 'ctaModule' },
        { type: 'testimonialModule' },
        { type: 'faqModule' },
      ],
      group: 'modules'
    }),
  ],
});
```

### 2.2 Create Content Module Schemas
**Files**: `studio/schemaTypes/modules/`

#### 2.2.1 Hero Module
**File**: `studio/schemaTypes/modules/heroModule.ts`
```typescript
export default defineType({
  name: 'heroModule',
  title: 'Hero Module',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'text', rows: 2 }),
    defineField({ name: 'image', title: 'Background Image', type: 'image' }),
    defineField({ name: 'ctaText', title: 'CTA Text', type: 'string' }),
    defineField({ name: 'ctaLink', title: 'CTA Link', type: 'url' }),
  ],
});
```

#### 2.2.2 Text Module
**File**: `studio/schemaTypes/modules/textModule.ts`
```typescript
export default defineType({
  name: 'textModule',
  title: 'Text Module',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'content', title: 'Content', type: 'blockContent' }),
    defineField({ name: 'alignment', title: 'Alignment', type: 'string', options: { list: ['left', 'center', 'right'] } }),
  ],
});
```

#### 2.2.3 Image Module
**File**: `studio/schemaTypes/modules/imageModule.ts`
```typescript
export default defineType({
  name: 'imageModule',
  title: 'Image Module',
  type: 'object',
  fields: [
    defineField({ name: 'image', title: 'Image', type: 'image' }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
    defineField({ name: 'altText', title: 'Alt Text', type: 'string' }),
    defineField({ name: 'alignment', title: 'Alignment', type: 'string', options: { list: ['left', 'center', 'right'] } }),
  ],
});
```

#### 2.2.4 Gallery Module
**File**: `studio/schemaTypes/modules/galleryModule.ts`
```typescript
export default defineType({
  name: 'galleryModule',
  title: 'Gallery Module',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ 
      name: 'images', 
      title: 'Images', 
      type: 'array', 
      of: [{ type: 'image' }] 
    }),
    defineField({ name: 'columns', title: 'Columns', type: 'number', initialValue: 3 }),
  ],
});
```

#### 2.2.5 CTA Module
**File**: `studio/schemaTypes/modules/ctaModule.ts`
```typescript
export default defineType({
  name: 'ctaModule',
  title: 'Call to Action Module',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'buttonText', title: 'Button Text', type: 'string' }),
    defineField({ name: 'buttonLink', title: 'Button Link', type: 'url' }),
    defineField({ name: 'backgroundColor', title: 'Background Color', type: 'string' }),
  ],
});
```

#### 2.2.6 Testimonial Module
**File**: `studio/schemaTypes/modules/testimonialModule.ts`
```typescript
export default defineType({
  name: 'testimonialModule',
  title: 'Testimonial Module',
  type: 'object',
  fields: [
    defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 4 }),
    defineField({ name: 'author', title: 'Author', type: 'string' }),
    defineField({ name: 'position', title: 'Position', type: 'string' }),
    defineField({ name: 'company', title: 'Company', type: 'string' }),
    defineField({ name: 'avatar', title: 'Avatar', type: 'image' }),
  ],
});
```

#### 2.2.7 FAQ Module
**File**: `studio/schemaTypes/modules/faqModule.ts`
```typescript
export default defineType({
  name: 'faqModule',
  title: 'FAQ Module',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ 
      name: 'faqs', 
      title: 'FAQs', 
      type: 'array', 
      of: [{
        type: 'object',
        fields: [
          { name: 'question', title: 'Question', type: 'string' },
          { name: 'answer', title: 'Answer', type: 'text', rows: 3 },
        ],
      }],
    }),
  ],
});
```

### 2.3 Update Schema Index
**File**: `studio/schemaTypes/index.ts`
**Changes**:
```typescript
import post from './post'
import page from './page'
import seo from './objects/seo'
import llmMetadata from './objects/llmMetadata'
import blockContent from './objects/blockContent'

// Import modules
import heroModule from './modules/heroModule'
import textModule from './modules/textModule'
import imageModule from './modules/imageModule'
import galleryModule from './modules/galleryModule'
import ctaModule from './modules/ctaModule'
import testimonialModule from './modules/testimonialModule'
import faqModule from './modules/faqModule'

export const schemaTypes = [
  post, 
  page, 
  seo, 
  llmMetadata, 
  blockContent,
  heroModule,
  textModule,
  imageModule,
  galleryModule,
  ctaModule,
  testimonialModule,
  faqModule,
]
```

## 🎯 Phase 3: Settings Schema Implementation

### 3.1 Create Settings Schema
**File**: `studio/schemaTypes/settings.ts`
**Features**:
- Site information (title, description, logo)
- Homepage selection (page reference)
- Social media links
- Contact information
- Analytics settings

**Schema Structure**:
```typescript
export default defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'navigation', title: 'Navigation' },
    { name: 'social', title: 'Social Media' },
    { name: 'contact', title: 'Contact Information' },
    { name: 'analytics', title: 'Analytics' },
  ],
  fields: [
    // General Group
    defineField({ name: 'siteTitle', title: 'Site Title', type: 'string', group: 'general' }),
    defineField({ name: 'siteDescription', title: 'Site Description', type: 'text', rows: 3, group: 'general' }),
    defineField({ name: 'logo', title: 'Logo', type: 'image', group: 'general' }),
    defineField({ name: 'favicon', title: 'Favicon', type: 'image', group: 'general' }),
    
    // Navigation Group
    defineField({ 
      name: 'homepage', 
      title: 'Homepage', 
      type: 'reference', 
      to: [{ type: 'page' }], 
      group: 'navigation' 
    }),
    defineField({ 
      name: 'mainNavigation', 
      title: 'Main Navigation', 
      type: 'array', 
      of: [{ type: 'navigationItem' }], 
      group: 'navigation' 
    }),
    
    // Social Media Group
    defineField({ name: 'facebook', title: 'Facebook URL', type: 'url', group: 'social' }),
    defineField({ name: 'twitter', title: 'Twitter URL', type: 'url', group: 'social' }),
    defineField({ name: 'instagram', title: 'Instagram URL', type: 'url', group: 'social' }),
    defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url', group: 'social' }),
    defineField({ name: 'youtube', title: 'YouTube URL', type: 'url', group: 'social' }),
    
    // Contact Group
    defineField({ name: 'email', title: 'Email', type: 'email', group: 'contact' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string', group: 'contact' }),
    defineField({ name: 'address', title: 'Address', type: 'text', rows: 3, group: 'contact' }),
    
    // Analytics Group
    defineField({ name: 'googleAnalyticsId', title: 'Google Analytics ID', type: 'string', group: 'analytics' }),
    defineField({ name: 'googleTagManagerId', title: 'Google Tag Manager ID', type: 'string', group: 'analytics' }),
  ],
});
```

### 3.2 Create Navigation Item Schema
**File**: `studio/schemaTypes/objects/navigationItem.ts`
```typescript
export default defineType({
  name: 'navigationItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string' }),
    defineField({ name: 'link', title: 'Link', type: 'url' }),
    defineField({ 
      name: 'page', 
      title: 'Page Reference', 
      type: 'reference', 
      to: [{ type: 'page' }] 
    }),
    defineField({ 
      name: 'children', 
      title: 'Submenu Items', 
      type: 'array', 
      of: [{ type: 'navigationItem' }] 
    }),
  ],
});
```

### 3.3 Update Schema Index for Settings
**File**: `studio/schemaTypes/index.ts`
**Additional Changes**:
```typescript
import settings from './settings'
import navigationItem from './objects/navigationItem'

export const schemaTypes = [
  post, 
  page, 
  settings, // Add this
  seo, 
  llmMetadata, 
  blockContent,
  navigationItem, // Add this
  // ... modules
]
```

## 🎯 Phase 4: Frontend Integration

### 4.1 Create Page Components
**Files**: `app/pages/[slug]/page.tsx`
**Features**:
- Dynamic page rendering based on slug
- Module rendering system
- SEO metadata integration
- LLM metadata display

### 4.2 Create Module Components
**Directory**: `components/modules/`
**Components**:
- `HeroModule.tsx`
- `TextModule.tsx`
- `ImageModule.tsx`
- `GalleryModule.tsx`
- `CTAModule.tsx`
- `TestimonialModule.tsx`
- `FAQModule.tsx`

### 4.3 Create Settings Context
**File**: `lib/settings.ts`
**Features**:
- Fetch site settings
- Provide settings context
- Handle homepage routing

### 4.4 Update Navigation
**File**: `components/Navigation.tsx`
**Features**:
- Dynamic navigation from settings
- Homepage link handling
- Mobile responsive menu

## 🎯 Phase 5: Studio Structure and Organization

### 5.1 Update Studio Structure
**File**: `studio/sanity.config.ts`
**Changes**:
- Configure document structure
- Set up proper ordering
- Add custom document actions

### 5.2 Create Studio Customization
**File**: `studio/structure.ts`
**Features**:
- Custom document structure
- Group pages and settings
- Add custom actions

## 🎯 Phase 6: Testing and Validation

### 6.1 Schema Validation
- Test all schema types
- Validate field relationships
- Check preview configurations

### 6.2 Frontend Testing
- Test page rendering
- Validate module components
- Check SEO integration

### 6.3 Studio Testing
- Test studio at `/studio` URL
- Validate settings functionality
- Check page creation and editing

## 📋 Implementation Checklist

### Phase 1: Studio URL Configuration
- [x] Update `studio/sanity.config.ts` with basePath
- [x] Update `next.config.js` with proxy configuration
- [x] Test studio accessibility at `/studio`
- [x] Update development scripts
- [x] Add port conflict handling and fallback ports
- [x] Create smart development script with automatic port management

### Phase 2: Page Schema Implementation
- [x] Create `page.ts` schema
- [x] Create all module schemas
- [x] Update schema index
- [x] Test page creation in studio

### Phase 3: Settings Schema Implementation
- [x] Create `settings.ts` schema
- [x] Create `navigationItem.ts` schema
- [x] Update schema index
- [x] Test settings creation

### Phase 4: Frontend Integration
- [x] Create page components
- [x] Create module components
- [x] Create settings context
- [ ] Update navigation

### Phase 5: Studio Organization
- [ ] Update studio structure
- [ ] Create custom document actions
- [ ] Test studio functionality

### Phase 6: Testing
- [ ] Schema validation
- [ ] Frontend testing
- [ ] Studio testing
- [ ] End-to-end testing

## 🚀 Success Criteria

1. **Studio Access**: Studio accessible at `http://localhost:3000/studio`
2. **Page Creation**: Ability to create pages with SEO, LLM metadata, and modules
3. **Settings Management**: Site settings with homepage selection and social links
4. **Module System**: All content modules working and rendering correctly
5. **Navigation**: Dynamic navigation from settings
6. **SEO Integration**: Proper SEO metadata generation
7. **LLM Integration**: LLM metadata display and functionality

## 📚 Documentation Updates

- Update `README.md` with new structure
- Create module documentation
- Update deployment guide
- Create settings guide

## ⏱️ Estimated Timeline

- **Phase 1**: 1-2 hours
- **Phase 2**: 4-6 hours
- **Phase 3**: 2-3 hours
- **Phase 4**: 6-8 hours
- **Phase 5**: 2-3 hours
- **Phase 6**: 2-4 hours

**Total Estimated Time**: 17-26 hours

## 🔧 Technical Considerations

1. **URL Routing**: Ensure proper Next.js routing for `/studio`
2. **Schema Relationships**: Proper reference handling between pages and settings
3. **Module Flexibility**: Easy addition of new module types
4. **Performance**: Optimize module rendering and data fetching
5. **SEO**: Ensure all SEO metadata is properly generated
6. **Accessibility**: All modules should be accessible

This plan provides a comprehensive roadmap for implementing the studio at `/studio` URL with a robust page schema system and settings management. 