// Re-export from modular structure
export { client, previewClient } from './sanity/client'
export { urlFor } from './sanity/image'

// Export API configuration
export { projectId, dataset, apiVersion, revalidateSecret, studioUrl } from './sanity/api'

// Export utilities (excluding duplicates)
export * from './sanity/token'

// Export utils with specific exports to avoid conflicts
export {
  formatDate,
  truncateText,
  getReadingTime,
  slugify,
  getImageAlt,
  getImageCaption,
  generateMetaTitle,
  generateMetaDescription,
  isValidSlug,
  sanitizeHtml,
  chunkArray,
  uniqueArray,
  pick,
  omit
} from './sanity/utils' 