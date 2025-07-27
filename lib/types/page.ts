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

export interface NavigationItem {
  label: string
  link?: string
  page?: {
    _id: string
    title: string
    slug: { current: string }
  }
  children?: NavigationItem[]
  openInNewTab?: boolean
  highlight?: boolean
} 