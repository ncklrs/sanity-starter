import { NavigationItem } from './page'

export interface Settings {
  siteTitle: string
  siteDescription?: string
  logo?: any
  favicon?: any
  defaultSeo?: any
  homepage?: { _id: string; title: string; slug: { current: string } }
  mainNavigation?: NavigationItem[]
  footerNavigation?: NavigationItem[]
  socialMedia?: {
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
    youtube?: string
    github?: string
  }
  contact?: {
    email?: string
    phone?: string
    address?: string
  }
  analytics?: {
    googleAnalyticsId?: string
    googleTagManagerId?: string
  }
} 