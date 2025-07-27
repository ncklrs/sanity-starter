import { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, getSettings } from '@/lib/sanity/data'
import type { Post } from '@/lib/types/post'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  
  return {
    title: `Blog | ${settings?.siteTitle || 'Our Blog'}`,
    description: 'Read our latest articles and insights',
  }
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog</h1>
        
        {posts.length === 0 ? (
          <p className="text-gray-600">No posts found.</p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post._id} className="border-b border-gray-200 pb-8">
                <Link href={`/blog/${post.slug.current}`} className="block group">
                  <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                    {post.title}
                  </h2>
                  {post.publishedAt && (
                    <time className="text-sm text-gray-500">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </time>
                  )}
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  )
} 