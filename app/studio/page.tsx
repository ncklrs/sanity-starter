'use client'

import { useEffect, useState } from 'react'

export default function StudioPage() {
  const [studioUrl, setStudioUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if studio is running on port 3333
    const checkStudio = async () => {
      try {
        const response = await fetch('http://localhost:3333/studio', { 
          method: 'HEAD',
          cache: 'no-cache'
        })
        if (response.ok) {
          setStudioUrl('http://localhost:3333/studio')
        } else {
          setStudioUrl('')
        }
      } catch (error) {
        setStudioUrl('')
      }
      setIsLoading(false)
    }

    checkStudio()
    const interval = setInterval(checkStudio, 5000) // Check every 5 seconds

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking studio status...</p>
        </div>
      </div>
    )
  }

  if (!studioUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-lg mb-6">
            <h1 className="text-xl font-semibold mb-2">Studio Not Running</h1>
            <p className="text-sm">The Sanity Studio needs to be started to access the content management interface.</p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => window.open('http://localhost:3333/studio', '_blank')}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Direct Studio Access
            </button>
            
            <div className="text-sm text-gray-600">
              <p className="mb-2">To start the studio, run:</p>
              <code className="bg-gray-100 px-2 py-1 rounded text-xs block">
                npm run studio
              </code>
            </div>
            
            <div className="text-xs text-gray-500">
              <p>Or use the combined command:</p>
              <code className="bg-gray-100 px-2 py-1 rounded block">
                npm run dev:with-studio
              </code>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <iframe
        src={studioUrl}
        className="w-full h-screen border-0"
        title="Sanity Studio"
        allow="camera; microphone; geolocation; encrypted-media"
      />
    </div>
  )
} 