import { urlFor } from './image'

// Utility functions for Sanity operations

export function formatDate(date: string | Date): string {
  if (!date) return ''
  
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function truncateText(text: string, maxLength: number = 150): string {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

export function getReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getImageUrl(image: any, width?: number, height?: number): string | null {
  if (!image) return null
  
  try {
    const imageUrl = urlFor(image)
    if (width || height) {
      return imageUrl.width(width || 800).height(height || 600).url()
    }
    return imageUrl.url()
  } catch (error) {
    console.error('Error generating image URL:', error)
    return null
  }
}

export function getImageAlt(image: any): string {
  return image?.alt || image?.asset?.altText || 'Image'
}

export function getImageCaption(image: any): string {
  return image?.caption || ''
}

// SEO utilities
export function generateMetaTitle(title: string, siteTitle?: string): string {
  if (!siteTitle) return title
  return `${title} | ${siteTitle}`
}

export function generateMetaDescription(description: string, maxLength: number = 160): string {
  return truncateText(description, maxLength)
}

// Content validation
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
}

export function sanitizeHtml(html: string): string {
  // Basic HTML sanitization - in production, use a proper library like DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
}

// Array utilities
export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

export function uniqueArray<T>(array: T[]): T[] {
  return [...new Set(array)]
}

// Object utilities
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key]
    }
  })
  return result
}

export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj }
  keys.forEach(key => {
    delete result[key]
  })
  return result
} 