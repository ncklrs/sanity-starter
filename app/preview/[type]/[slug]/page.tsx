import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { previewClient } from '@/lib/sanity/preview-client'
import { pageBySlugQuery } from '@/lib/queries/pages'
import { postBySlugQuery } from '@/lib/queries/posts'
import { ModuleRenderer } from '@/components/modules/ModuleRenderer'
import { LLMMetadataDisplay } from '@/lib/llm-metadata'
import { generatePageMetadata, generatePostMetadata } from '@/lib/seo'
import { Metadata } from 'next'

interface PreviewPageProps {
  params: { type: string; slug: string }
}

export async function generateMetadata({ params }: PreviewPageProps): Promise<Metadata> {
  const { type, slug } = params
  
  if (type === 'page') {
    const page = await previewClient.fetch(pageBySlugQuery, { slug })
    return generatePageMetadata(page)
  } else if (type === 'post') {
    const post = await previewClient.fetch(postBySlugQuery, { slug })
    return generatePostMetadata(post, slug)
  }
  
  return {
    title: 'Preview',
  }
}

export default async function PreviewPage({ params }: PreviewPageProps) {
  const { enable } = draftMode()
  const { type, slug } = params
  
  // Enable draft mode
  enable()
  
  let data: any = null
  
  // Fetch preview data based on type
  if (type === 'page') {
    data = await previewClient.fetch(pageBySlugQuery, { slug })
  } else if (type === 'post') {
    data = await previewClient.fetch(postBySlugQuery, { slug })
  }
  
  if (!data) {
    redirect('/404')
  }
  
  // Render preview component based on type
  if (type === 'page') {
    return (
      <div className="min-h-screen">
        {data.llmMetadata && <LLMMetadataDisplay metadata={data.llmMetadata} />}
        <main>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{data.title}</h1>
          </div>
          {data.modules && data.modules.length > 0 && (
            <ModuleRenderer modules={data.modules} />
          )}
        </main>
      </div>
    )
  } else if (type === 'post') {
    return (
      <div className="min-h-screen">
        {data.llmMetadata && <LLMMetadataDisplay metadata={data.llmMetadata} />}
        <main>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{data.title}</h1>
            {data.body && (
              <div className="prose prose-lg max-w-none">
                {/* Render Portable Text content */}
                <div>{JSON.stringify(data.body)}</div>
              </div>
            )}
          </div>
        </main>
      </div>
    )
  }
  
  return <div>Preview not available for this content type</div>
} 