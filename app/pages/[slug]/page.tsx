import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client, previewClient } from '@/lib/sanity'
import { pageBySlugQuery } from '@/lib/queries'
import { generatePageMetadata } from '@/lib/seo'
import { LLMMetadataDisplay } from '@/lib/llm-metadata'
import { ModuleRenderer } from '@/components/modules/ModuleRenderer'
import { PreviewProvider } from '@/components/preview/PreviewProvider'
import { DraftOverlay } from '@/components/preview/DraftOverlay'
import { getPageBySlug } from '@/lib/sanity/data'

interface Page {
  _id: string
  title: string
  slug: { current: string }
  status: 'draft' | 'published'
  publishedAt?: string
  seo?: any
  llmMetadata?: any
  modules?: any[]
}

interface PageProps {
  params: { slug: string[] }
  searchParams: { preview?: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = params.slug.join('/')
  const page = await client.fetch<Page>(pageBySlugQuery, { slug })
  
  if (!page) {
    return {
      title: 'Page Not Found',
    }
  }

  return generatePageMetadata(page)
}

export default async function Page({ params, searchParams }: PageProps) {
  const slug = params.slug.join('/')
  const isPreview = searchParams.preview === 'true'
  
  let page: Page | null = null
  
  if (isPreview) {
    // Use preview client for draft content
    page = await previewClient.fetch<Page>(pageBySlugQuery, { slug })
  } else {
    // Use tagged data fetching for production
    page = await getPageBySlug(slug)
  }

  if (!page) {
    notFound()
  }

  // In preview mode, allow draft content; otherwise only published
  if (!isPreview && page.status !== 'published') {
    notFound()
  }

  const content = (
    <div className="min-h-screen">
      {/* Draft Overlay */}
      {isPreview && <DraftOverlay />}
      
      {/* LLM Metadata Display */}
      {page.llmMetadata && (
        <div className="bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <LLMMetadataDisplay metadata={page.llmMetadata} />
          </div>
        </div>
      )}

      {/* Page Content */}
      <main>
        {/* Page Title */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {page.title}
          </h1>
        </div>

        {/* Content Modules */}
        {page.modules && page.modules.length > 0 && (
          <ModuleRenderer modules={page.modules} />
        )}
      </main>
    </div>
  )

  // Wrap in PreviewProvider if in preview mode
  if (isPreview) {
    return (
      <PreviewProvider>
        {content}
      </PreviewProvider>
    )
  }

  return content
} 