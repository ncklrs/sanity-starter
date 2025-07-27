'use client'

import { useDraftMode } from '@/hooks/use-draft-mode'

export function DraftOverlay() {
  const { isDraftMode } = useDraftMode()
  
  if (!isDraftMode) return null
  
  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-black text-center py-2 z-50">
      <div className="flex items-center justify-center space-x-2">
        <span className="font-semibold">Preview Mode</span>
        <span>•</span>
        <span>Draft Content</span>
      </div>
    </div>
  )
} 