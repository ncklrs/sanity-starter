import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sanity LLM - Home',
  description: 'Welcome to our Sanity-powered website',
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Sanity LLM
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A Next.js frontend with Sanity Studio integration
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frontend</h2>
              <p className="text-gray-600 mb-4">
                Built with Next.js 14, TypeScript, and Tailwind CSS
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Server-side rendering</li>
                <li>• Type-safe development</li>
                <li>• Responsive design</li>
                <li>• SEO optimized</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Studio</h2>
              <p className="text-gray-600 mb-4">
                Sanity Studio with advanced plugins and custom structure
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• AI-powered assistance</li>
                <li>• Code and color inputs</li>
                <li>• Media management</li>
                <li>• Custom desk structure</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12">
            <a
              href="/studio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Open Sanity Studio
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
