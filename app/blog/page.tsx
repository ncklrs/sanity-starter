import Link from 'next/link'
import { client } from '@/lib/sanity'
import { allPostsQuery } from '@/lib/queries'

interface Post {
  title: string
  slug: {
    current: string
  }
}

export default async function BlogIndex() {
  const posts = await client.fetch<Post[]>(allPostsQuery)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      
      {posts.length === 0 ? (
        <p className="text-gray-600">No posts found.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.slug.current} className="border-b border-gray-200 pb-6">
              <Link 
                href={`/blog/${post.slug.current}`}
                className="block hover:bg-gray-50 p-4 rounded-lg transition-colors"
              >
                <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600">
                  Read more →
                </p>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  )
} 