interface LLMMetadata {
  purpose?: string
  audiencePersona?: string
  format?: string
  contextTags?: string[]
  relatedEntities?: any[]
  metadata?: {
    readingLevel?: string
    estimatedReadTime?: number
    tokens?: number
  }
}

interface LLMMetadataDisplayProps {
  metadata?: LLMMetadata
}

export function LLMMetadataDisplay({ metadata }: LLMMetadataDisplayProps) {
  if (!metadata) return null

  return (
    <section className="mb-8 p-6 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Content Intelligence</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metadata.purpose && (
          <div>
            <h3 className="font-medium text-gray-700">Purpose</h3>
            <p className="text-gray-600">{metadata.purpose}</p>
          </div>
        )}
        {metadata.audiencePersona && (
          <div>
            <h3 className="font-medium text-gray-700">Target Audience</h3>
            <p className="text-gray-600">{metadata.audiencePersona}</p>
          </div>
        )}
        {metadata.format && (
          <div>
            <h3 className="font-medium text-gray-700">Content Format</h3>
            <p className="text-gray-600 capitalize">{metadata.format.replace('-', ' ')}</p>
          </div>
        )}
        {metadata.contextTags && metadata.contextTags.length > 0 && (
          <div>
            <h3 className="font-medium text-gray-700">Context Tags</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {metadata.contextTags.map((tag: string, index: number) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
        {metadata.metadata && (
          <>
            {metadata.metadata.readingLevel && (
              <div>
                <h3 className="font-medium text-gray-700">Reading Level</h3>
                <p className="text-gray-600">{metadata.metadata.readingLevel}</p>
              </div>
            )}
            {metadata.metadata.estimatedReadTime && (
              <div>
                <h3 className="font-medium text-gray-700">Estimated Read Time</h3>
                <p className="text-gray-600">{metadata.metadata.estimatedReadTime} minutes</p>
              </div>
            )}
            {metadata.metadata.tokens && (
              <div>
                <h3 className="font-medium text-gray-700">Token Count</h3>
                <p className="text-gray-600">{metadata.metadata.tokens.toLocaleString()} tokens</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
} 