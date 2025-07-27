import { revalidateTag, revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Verify the request is from Sanity
function isValidRequest(request: NextRequest) {
  const signature = request.headers.get('sanity-webhook-signature')
  const secret = process.env.SANITY_WEBHOOK_SECRET
  
  if (!signature || !secret) {
    return false
  }
  
  // In a real implementation, you'd verify the signature
  // For now, we'll use a simple secret check
  return signature === secret
}

export async function POST(request: NextRequest) {
  try {
    // Verify the request is from Sanity
    if (!isValidRequest(request)) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })
    }

    const body = await request.json()
    const { _type, _id, slug, operation } = body

    console.log('Revalidation webhook received:', { _type, _id, slug, operation })

    // Handle different content types
    switch (_type) {
      case 'page':
        await handlePageRevalidation(slug, operation)
        break
      case 'post':
        await handlePostRevalidation(slug, operation)
        break
      case 'settings':
        await handleSettingsRevalidation(operation)
        break
      default:
        // For unknown types, revalidate everything
        revalidateTag('sanity')
        revalidatePath('/')
        console.log('Revalidated all content for unknown type:', _type)
    }

    return NextResponse.json({ 
      message: 'Revalidation successful',
      revalidated: true 
    })

  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { message: 'Revalidation failed', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

async function handlePageRevalidation(slug: string, operation: string) {
  // Tag-based revalidation
  revalidateTag('page')
  revalidateTag(`page:${slug}`)
  
  // Path-based revalidation
  revalidatePath('/')
  revalidatePath(`/pages/${slug}`)
  
  // If it's the homepage, also revalidate the root
  if (slug === 'homepage' || slug === 'home') {
    revalidatePath('/')
  }
  
  console.log(`Revalidated page: ${slug} (operation: ${operation})`)
}

async function handlePostRevalidation(slug: string, operation: string) {
  // Tag-based revalidation
  revalidateTag('post')
  revalidateTag(`post:${slug}`)
  
  // Path-based revalidation
  revalidatePath('/')
  revalidatePath(`/blog/${slug}`)
  revalidatePath('/blog')
  
  console.log(`Revalidated post: ${slug} (operation: ${operation})`)
}

async function handleSettingsRevalidation(operation: string) {
  // Settings affect the entire site
  revalidateTag('settings')
  revalidatePath('/')
  
  console.log(`Revalidated settings (operation: ${operation})`)
} 