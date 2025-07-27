import { revalidateTag, revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tag, path, secret } = body

    // Verify the request is authorized
    if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    // Revalidate by tag
    if (tag) {
      revalidateTag(tag)
      console.log(`Manually revalidated tag: ${tag}`)
    }

    // Revalidate by path
    if (path) {
      revalidatePath(path)
      console.log(`Manually revalidated path: ${path}`)
    }

    // If neither tag nor path provided, revalidate everything
    if (!tag && !path) {
      revalidateTag('sanity')
      revalidatePath('/')
      console.log('Manually revalidated all content')
    }

    return NextResponse.json({ 
      message: 'Manual revalidation successful',
      revalidated: true,
      tag,
      path
    })

  } catch (error) {
    console.error('Manual revalidation error:', error)
    return NextResponse.json(
      { message: 'Manual revalidation failed', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 