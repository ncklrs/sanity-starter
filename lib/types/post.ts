export interface Post {
  _id: string
  title: string
  slug: { current: string }
  publishedAt?: string
  body?: any
  seo?: any
  llmMetadata?: any
} 