'use client'

import { useLiveQuery } from '@sanity/preview-kit'
import { previewClient } from '@/lib/sanity/preview-client'

export function usePreviewData<T>(
  initialData: T,
  query: string,
  params: Record<string, any> = {}
): [T, boolean] {
  return useLiveQuery(initialData, query, params)
} 