'use client'

import { useSearchParams } from 'next/navigation'

export function useDraftMode() {
  const searchParams = useSearchParams()
  const isDraftMode = searchParams.get('preview') === 'true'
  
  return { isDraftMode }
} 