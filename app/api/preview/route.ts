import { redirect } from 'next/navigation'
import { previewClient } from '@/lib/sanity/preview-client'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  const type = searchParams.get('type')
  
  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 })
  }
  
  if (!slug || !type) {
    return new Response('Missing slug or type', { status: 400 })
  }
  
  // Redirect to preview page
  redirect(`/preview/${type}/${slug}`)
} 