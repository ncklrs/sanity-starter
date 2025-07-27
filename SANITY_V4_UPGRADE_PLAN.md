# Sanity v4 Upgrade & Advanced Features Implementation Plan

## Overview
This plan outlines the upgrade from Sanity v3 to v4 and implementation of advanced features including preview mode, co-located client logic, and live previews with @sanity/preview-kit.

## Phase 1: Sanity v4 Upgrade (Estimated: 2-3 hours)

### 1.1 Environment Preparation
- [ ] **Node.js Version Check**
  - Verify Node.js 20+ is installed
  - Update if necessary (required for Sanity v4)
  - Update package.json engines field

- [ ] **Backup Current Setup**
  - Create git branch: `feature/sanity-v4-upgrade`
  - Document current working configuration
  - Backup environment variables

### 1.2 Sanity Studio v4 Migration
- [ ] **Update Studio Dependencies**
  ```bash
  cd studio
  npm install sanity@^4.0.0 @sanity/vision@^4.0.0
  npm install @sanity/preview-kit@^3.0.0
  ```

- [ ] **Update Studio Configuration**
  - Migrate `sanity.config.ts` to v4 syntax
  - Update plugin imports and configuration
  - Test studio functionality

- [ ] **Schema Updates**
  - Verify all schemas are v4 compatible
  - Update any deprecated field types
  - Test schema validation

### 1.3 Frontend Dependencies Update
- [ ] **Update Sanity Client**
  ```bash
  npm install next-sanity@^7.0.0 @sanity/client@^6.0.0
  npm install @sanity/preview-kit@^3.0.0
  ```

- [ ] **Update Image Handling**
  - Migrate from `@sanity/image-url` to v4 image handling
  - Update `lib/sanity.ts` with new client configuration
  - Test image rendering

## Phase 2: Co-located Client Logic (Estimated: 1-2 hours)

### 2.1 Restructure Sanity Client Architecture
- [ ] **Create Modular Client Structure**
  ```
  lib/
  ├── sanity/
  │   ├── client.ts          # Base client configuration
  │   ├── preview-client.ts  # Preview client with token
  │   └── image.ts           # Image URL builder
  ├── queries/
  │   ├── pages.ts           # Page-specific queries
  │   ├── posts.ts           # Post-specific queries
  │   ├── settings.ts        # Settings queries
  │   └── modules.ts         # Content module queries
  └── types/
      ├── page.ts            # Page type definitions
      ├── post.ts            # Post type definitions
      └── settings.ts        # Settings type definitions
  ```

### 2.2 Implement Base Client Configuration
- [ ] **Create `lib/sanity/client.ts`**
  ```typescript
  import { createClient } from 'next-sanity'
  
  export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: '2024-01-01',
    useCdn: process.env.NODE_ENV === 'production',
  })
  ```

### 2.3 Implement Preview Client
- [ ] **Create `lib/sanity/preview-client.ts`**
  ```typescript
  import { createClient } from 'next-sanity'
  
  export const previewClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: '2024-01-01',
    useCdn: false, // Always false for preview
    token: process.env.SANITY_API_TOKEN, // Required for preview
  })
  ```

### 2.4 Update Image Handling
- [ ] **Create `lib/sanity/image.ts`**
  ```typescript
  import { urlForImage } from '@sanity/image-url/lib/types/types'
  import { client } from './client'
  
  export function urlFor(source: any) {
    return urlForImage(client).image(source)
  }
  ```

## Phase 3: Preview Mode Implementation (Estimated: 2-3 hours)

### 3.1 Environment Setup
- [ ] **Add Preview Environment Variables**
  ```env
  # .env.local
  SANITY_API_TOKEN=your_preview_token_here
  SANITY_PREVIEW_SECRET=your_preview_secret_here
  ```

### 3.2 Create Preview API Route
- [ ] **Create `app/api/preview/route.ts`**
  ```typescript
  import { redirect } from 'next/navigation'
  import { previewClient } from '@/lib/sanity/preview-client'
  
  export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get('secret')
    const slug = searchParams.get('slug')
    const type = searchParams.get('type')
    
    if (secret !== process.env.SANITY_PREVIEW_SECRET) {
      return new Response('Invalid token', { status: 401 })
    }
    
    if (!slug || !type) {
      return new Response('Missing slug or type', { status: 400 })
    }
    
    // Redirect to preview page
    redirect(`/preview/${type}/${slug}`)
  }
  ```

### 3.3 Create Preview Pages
- [ ] **Create `app/preview/[type]/[slug]/page.tsx`**
  ```typescript
  import { draftMode } from 'next/headers'
  import { redirect } from 'next/navigation'
  import { previewClient } from '@/lib/sanity/preview-client'
  
  export default async function PreviewPage({ params }: { params: { type: string; slug: string } }) {
    const { enable } = draftMode()
    
    // Enable draft mode
    enable()
    
    // Fetch preview data
    const data = await previewClient.fetch(
      `*[_type == $type && slug.current == $slug][0]`,
      { type: params.type, slug: params.slug }
    )
    
    if (!data) {
      redirect('/404')
    }
    
    // Render preview component
    return <PreviewComponent data={data} type={params.type} />
  }
  ```

### 3.4 Implement Draft Overlays
- [ ] **Create `components/preview/DraftOverlay.tsx`**
  ```typescript
  'use client'
  
  import { useDraftMode } from '@/hooks/use-draft-mode'
  
  export function DraftOverlay() {
    const { isDraftMode } = useDraftMode()
    
    if (!isDraftMode) return null
    
    return (
      <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-black text-center py-2 z-50">
        Preview Mode - Draft Content
      </div>
    )
  }
  ```

## Phase 4: @sanity/preview-kit Integration (Estimated: 2-3 hours)

### 4.1 Install Preview Kit
- [ ] **Add Preview Kit Dependencies**
  ```bash
  npm install @sanity/preview-kit
  ```

### 4.2 Create Preview Hook
- [ ] **Create `hooks/use-preview.ts`**
  ```typescript
  import { usePreview } from '@sanity/preview-kit'
  import { client } from '@/lib/sanity/client'
  import { previewClient } from '@/lib/sanity/preview-client'
  
  export function usePreviewData<T>(
    initialData: T,
    query: string,
    params: Record<string, any> = {}
  ): T {
    const [data] = usePreview(initialData, query, params, {
      client: previewClient,
    })
    
    return data
  }
  ```

### 4.3 Implement Conditional Hydration
- [ ] **Create `components/preview/PreviewProvider.tsx`**
  ```typescript
  'use client'
  
  import { PreviewProvider as SanityPreviewProvider } from '@sanity/preview-kit'
  import { previewClient } from '@/lib/sanity/preview-client'
  
  export function PreviewProvider({ children }: { children: React.ReactNode }) {
    return (
      <SanityPreviewProvider client={previewClient}>
        {children}
      </SanityPreviewProvider>
    )
  }
  ```

### 4.4 Update Page Components
- [ ] **Update `app/pages/[slug]/page.tsx`**
  ```typescript
  import { usePreviewData } from '@/hooks/use-preview'
  import { pageBySlugQuery } from '@/lib/queries/pages'
  
  export default function Page({ params, searchParams }: PageProps) {
    const isPreview = searchParams.preview === 'true'
    const initialData = await client.fetch(pageBySlugQuery, { slug: params.slug })
    
    if (isPreview) {
      return (
        <PreviewProvider>
          <PreviewPage data={initialData} slug={params.slug} />
        </PreviewProvider>
      )
    }
    
    return <ProductionPage data={initialData} />
  }
  ```

## Phase 5: Query Module Restructuring (Estimated: 1-2 hours)

### 5.1 Create Query Modules
- [ ] **Create `lib/queries/pages.ts`**
  ```typescript
  import { groq } from 'next-sanity'
  
  export const pageBySlugQuery = groq`
    *[_type == "page" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      status,
      publishedAt,
      seo,
      llmMetadata,
      modules[] {
        _type,
        _key,
        // ... module fields
      }
    }
  `
  
  export const allPagesQuery = groq`
    *[_type == "page" && status == "published"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt
    }
  `
  ```

- [ ] **Create `lib/queries/posts.ts`**
  ```typescript
  import { groq } from 'next-sanity'
  
  export const postBySlugQuery = groq`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      body,
      seo,
      llmMetadata
    }
  `
  ```

- [ ] **Create `lib/queries/settings.ts`**
  ```typescript
  import { groq } from 'next-sanity'
  
  export const settingsQuery = groq`
    *[_type == "settings"][0] {
      siteTitle,
      siteDescription,
      logo,
      favicon,
      defaultSeo,
      homepage->{
        _id,
        title,
        slug
      },
      mainNavigation[] {
        label,
        link,
        page->{
          _id,
          title,
          slug
        },
        children[] {
          label,
          link,
          page->{
            _id,
            title,
            slug
          }
        },
        openInNewTab,
        highlight
      }
    }
  `
  ```

### 5.2 Create Type Definitions
- [ ] **Create `lib/types/page.ts`**
  ```typescript
  export interface Page {
    _id: string
    title: string
    slug: { current: string }
    status: 'draft' | 'published'
    publishedAt?: string
    seo?: any
    llmMetadata?: any
    modules?: any[]
  }
  ```

- [ ] **Create `lib/types/post.ts`**
  ```typescript
  export interface Post {
    _id: string
    title: string
    slug: { current: string }
    publishedAt?: string
    body?: any
    seo?: any
    llmMetadata?: any
  }
  ```

- [ ] **Create `lib/types/settings.ts`**
  ```typescript
  export interface Settings {
    siteTitle: string
    siteDescription?: string
    logo?: any
    favicon?: any
    defaultSeo?: any
    homepage?: { _id: string; title: string; slug: { current: string } }
    mainNavigation?: NavigationItem[]
  }
  ```

## Phase 6: Testing & Validation (Estimated: 1-2 hours)

### 6.1 Sanity Studio Testing
- [ ] **Test Studio Functionality**
  - Verify all schemas load correctly
  - Test content creation and editing
  - Verify image uploads work
  - Test preview functionality

### 6.2 Frontend Testing
- [ ] **Test Production Mode**
  - Verify pages render correctly
  - Test image rendering
  - Verify SEO metadata
  - Test navigation

- [ ] **Test Preview Mode**
  - Test preview URL generation
  - Verify draft content displays
  - Test live preview updates
  - Verify draft overlays

### 6.3 Integration Testing
- [ ] **Test End-to-End Workflow**
  - Create content in studio
  - Preview content immediately
  - Publish content
  - Verify production display

## Phase 7: Documentation & Cleanup (Estimated: 1 hour)

### 7.1 Update Documentation
- [ ] **Update README.md**
  - Document new preview workflow
  - Update development instructions
  - Document environment variables

- [ ] **Create Preview Documentation**
  - How to use preview mode
  - Preview URL structure
  - Troubleshooting guide

### 7.2 Code Cleanup
- [ ] **Remove Deprecated Code**
  - Remove old client configurations
  - Clean up unused imports
  - Update type definitions

- [ ] **Optimize Performance**
  - Verify bundle size
  - Optimize queries
  - Test build performance

## Success Criteria

### ✅ Sanity v4 Upgrade
- [ ] Studio runs on Sanity v4 without errors
- [ ] All schemas are v4 compatible
- [ ] Image handling works with v4
- [ ] No deprecated API usage

### ✅ Co-located Client Logic
- [ ] Modular client structure implemented
- [ ] Separate preview and production clients
- [ ] Organized query modules
- [ ] Type-safe implementations

### ✅ Preview Mode
- [ ] Draft content accessible via preview URLs
- [ ] Secure token-based access
- [ ] Draft overlays visible in preview mode
- [ ] Preview mode can be disabled

### ✅ Live Previews
- [ ] @sanity/preview-kit integrated
- [ ] Conditional hydration working
- [ ] Real-time content updates
- [ ] Smooth preview experience

## Risk Mitigation

### High Risk Items
1. **Breaking Changes**: Sanity v4 may have breaking changes
   - *Mitigation*: Test thoroughly in development before production
   
2. **Preview Token Security**: API tokens need proper security
   - *Mitigation*: Use environment variables and proper validation

3. **Performance Impact**: Preview mode may impact performance
   - *Mitigation*: Implement proper caching and optimization

### Rollback Plan
- Keep v3 branch as backup
- Document rollback procedure
- Test rollback process before upgrade

## Timeline Summary

| Phase | Duration | Dependencies |
|-------|----------|--------------|
| 1. Sanity v4 Upgrade | 2-3 hours | None |
| 2. Co-located Client Logic | 1-2 hours | Phase 1 |
| 3. Preview Mode | 2-3 hours | Phase 2 |
| 4. Preview Kit Integration | 2-3 hours | Phase 3 |
| 5. Query Restructuring | 1-2 hours | Phase 2 |
| 6. Testing & Validation | 1-2 hours | All phases |
| 7. Documentation & Cleanup | 1 hour | All phases |

**Total Estimated Time: 10-16 hours**

## Next Steps

1. **Review this plan** and provide feedback
2. **Confirm Node.js 20+** is available
3. **Create backup branch** before starting
4. **Begin with Phase 1** (Sanity v4 upgrade)
5. **Test each phase** before proceeding to the next

---

*This plan ensures a systematic upgrade to Sanity v4 with advanced preview capabilities while maintaining code quality and performance.* 