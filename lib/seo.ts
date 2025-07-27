import { Metadata } from 'next'

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

export function generatePostMetadata(post: Post, slug: string): Metadata {
  const seo = post.seo || {}
  
  // Generate meta title
  const metaTitle = seo.metaTitle || post.title
  
  // Generate meta description
  const metaDescription = seo.metaDescription || 
    `Read "${post.title}" - ${post.llmMetadata?.purpose || 'A blog post'}`

  // Generate keywords
  const keywords = seo.keywords || post.llmMetadata?.contextTags || []

  // Generate Open Graph data
  const ogImage = seo.ogImage?.asset?.url
  const ogTitle = seo.ogTitle || metaTitle
  const ogDescription = seo.ogDescription || metaDescription

  // Generate Twitter Card data
  const twitterImage = seo.twitterImage?.asset?.url || ogImage
  const twitterCard = (seo.twitterCard as 'summary' | 'summary_large_image' | 'player' | 'app') || 'summary_large_image'

  // Generate structured data
  const structuredData = seo.structuredData?.data ? 
    JSON.parse(seo.structuredData.data) : 
    generateDefaultStructuredData(post)

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: keywords.join(', '),
    robots: {
      index: !seo.noIndex,
      follow: !seo.noFollow,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: 'article',
      publishedTime: post.publishedAt,
      images: ogImage ? [
        {
          url: ogImage,
          alt: seo.ogImage?.alt || post.title,
          width: 1200,
          height: 630,
        }
      ] : [],
    },
    twitter: {
      card: twitterCard,
      title: ogTitle,
      description: ogDescription,
      images: twitterImage ? [twitterImage] : [],
    },
    alternates: {
      canonical: seo.canonicalUrl || `/blog/${slug}`,
    },
    other: {
      'structured-data': JSON.stringify(structuredData),
    },
  }
}

export function generateDefaultStructuredData(post: Post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Person',
      name: 'Author Name', // You can customize this
    },
    publisher: {
      '@type': 'Organization',
      name: 'Your Site Name', // You can customize this
    },
    ...(post.llmMetadata?.purpose && {
      description: post.llmMetadata.purpose,
    }),
    ...(post.llmMetadata?.contextTags && {
      keywords: post.llmMetadata.contextTags.join(', '),
    }),
    ...(post.llmMetadata?.metadata?.estimatedReadTime && {
      timeRequired: `PT${post.llmMetadata.metadata.estimatedReadTime}M`,
    }),
  }
}

export function generatePageMetadata(page: Page): Metadata {
  const seo = page.seo || {}
  
  // Generate meta title
  const metaTitle = seo.metaTitle || page.title
  
  // Generate meta description
  const metaDescription = seo.metaDescription || 
    `Visit "${page.title}" - ${page.llmMetadata?.purpose || 'A page on our website'}`

  // Generate keywords
  const keywords = seo.keywords || page.llmMetadata?.contextTags || []

  // Generate Open Graph data
  const ogImage = seo.ogImage?.asset?.url
  const ogTitle = seo.ogTitle || metaTitle
  const ogDescription = seo.ogDescription || metaDescription

  // Generate Twitter Card data
  const twitterImage = seo.twitterImage?.asset?.url || ogImage
  const twitterCard = (seo.twitterCard as 'summary' | 'summary_large_image' | 'player' | 'app') || 'summary_large_image'

  // Generate structured data
  const structuredData = seo.structuredData?.data ? 
    JSON.parse(seo.structuredData.data) : 
    generateDefaultPageStructuredData(page)

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: keywords.join(', '),
    robots: {
      index: !seo.noIndex,
      follow: !seo.noFollow,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: 'website',
      ...(page.publishedAt && { publishedTime: page.publishedAt }),
      images: ogImage ? [
        {
          url: ogImage,
          alt: seo.ogImage?.alt || page.title,
          width: 1200,
          height: 630,
        }
      ] : [],
    },
    twitter: {
      card: twitterCard,
      title: ogTitle,
      description: ogDescription,
      images: twitterImage ? [twitterImage] : [],
    },
    alternates: {
      canonical: seo.canonicalUrl || `/pages/${page.slug.current}`,
    },
    other: {
      'structured-data': JSON.stringify(structuredData),
    },
  }
}

export function generateDefaultPageStructuredData(page: Page) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    headline: page.title,
    ...(page.publishedAt && { datePublished: page.publishedAt }),
    ...(page.llmMetadata?.purpose && {
      description: page.llmMetadata.purpose,
    }),
    ...(page.llmMetadata?.contextTags && {
      keywords: page.llmMetadata.contextTags.join(', '),
    }),
  }
} 