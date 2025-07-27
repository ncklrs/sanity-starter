import { client } from './client'
import { pageBySlugQuery, allPagesQuery } from '../queries/pages'
import { postBySlugQuery, allPostsQuery } from '../queries/posts'
import { settingsQuery } from '../queries/settings'
import type { Page } from '../types/page'
import type { Post } from '../types/post'
import type { Settings } from '../types/settings'

// Tag-based data fetching functions
export async function getPageBySlug(slug: string): Promise<Page | null> {
  const page = await client.fetch<Page>(pageBySlugQuery, { slug }, {
    next: {
      tags: [`page:${slug}`, 'page']
    }
  })
  
  return page
}

export async function getAllPages(): Promise<Page[]> {
  const pages = await client.fetch<Page[]>(allPagesQuery, {}, {
    next: {
      tags: ['page']
    }
  })
  
  return pages
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = await client.fetch<Post>(postBySlugQuery, { slug }, {
    next: {
      tags: [`post:${slug}`, 'post']
    }
  })
  
  return post
}

export async function getAllPosts(): Promise<Post[]> {
  const posts = await client.fetch<Post[]>(allPostsQuery, {}, {
    next: {
      tags: ['post']
    }
  })
  
  return posts
}

export async function getSettings(): Promise<Settings | null> {
  const settings = await client.fetch<Settings>(settingsQuery, {}, {
    next: {
      tags: ['settings']
    }
  })
  
  return settings
}

// Utility function to get homepage
export async function getHomepage(): Promise<Page | null> {
  const settings = await getSettings()
  
  if (!settings?.homepage?.slug?.current) {
    return null
  }
  
  return getPageBySlug(settings.homepage.slug.current)
} 