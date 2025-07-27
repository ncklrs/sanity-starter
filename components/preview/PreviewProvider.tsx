'use client'

import { LiveQueryProvider } from '@sanity/preview-kit'
import { previewClient } from '@/lib/sanity/preview-client'

interface PreviewProviderProps {
  children: React.ReactNode
  token?: string
}

export function PreviewProvider({ children, token }: PreviewProviderProps) {
  return (
    <LiveQueryProvider 
      client={previewClient} 
      token={token || process.env.NEXT_PUBLIC_SANITY_API_TOKEN}
    >
      {children}
    </LiveQueryProvider>
  )
} 