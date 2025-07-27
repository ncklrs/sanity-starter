import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity'
import { postBySlugQuery } from '@/lib/queries'
import { generatePostMetadata } from '@/lib/seo'
import { LLMMetadataDisplay } from '@/lib/llm-metadata'
import { PortableText } from '@/lib/portable-text'

interface Post {
  title: string
  slug: {
    current: string
  }
  publishedAt: string
  body?: any
  llmMetadata?: {
    purpose?: string
    audiencePersona?: string
    format?: string
    contextTags?: string[]
    relatedEntities?: any[]
    metadata?: {
      readingLevel?: string
      estimatedReadTime?: number
      tokens?: number
    }
  }
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
    canonicalUrl?: string
    noIndex?: boolean
    noFollow?: boolean
    ogImage?: {
      asset: {
        url: string
      }
      alt?: string
    }
    ogTitle?: string
    ogDescription?: string
    twitterCard?: string
    twitterImage?: {
      asset: {
        url: string
      }
      alt?: string
    }
    structuredData?: {
      type?: string
      data?: string
    }
  }
}

interface PageProps {
  params: {
    slug: string[]
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = params.slug.join('/')
  const post = await client.fetch<Post>(postBySlugQuery, { slug })

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.',
    }
  }

  return generatePostMetadata(post, slug)
}

export default async function BlogPost({ params }: PageProps) {
  const slug = params.slug.join('/')
  const post = await client.fetch<Post>(postBySlugQuery, { slug })

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        {post.publishedAt && (
          <time 
            dateTime={post.publishedAt}
            className="text-gray-600 text-sm"
          >
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        )}
      </header>

      {/* LLM Metadata Display */}
      <LLMMetadataDisplay metadata={post.llmMetadata} />

      {/* Main Content */}
      {post.body ? (
        <PortableText value={post.body} />
      ) : (
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700">
            No content available for this post.
          </p>
        </div>
      )}

      {/* SEO Debug Info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <section className="mt-12 p-6 bg-yellow-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">SEO Debug Info</h2>
          <details className="text-sm">
            <summary className="cursor-pointer font-medium">View SEO Data</summary>
            <pre className="mt-2 p-4 bg-white rounded overflow-auto">
              {JSON.stringify(post.seo, null, 2)}
            </pre>
          </details>
          <details className="text-sm mt-4">
            <summary className="cursor-pointer font-medium">View LLM Metadata</summary>
            <pre className="mt-2 p-4 bg-white rounded overflow-auto">
              {JSON.stringify(post.llmMetadata, null, 2)}
            </pre>
          </details>
        </section>
      )}
    </article>
  )
} 