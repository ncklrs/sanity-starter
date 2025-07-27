'use client'

import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

interface GalleryModuleProps {
  module: {
    title?: string
    images: any[]
    columns: number
    gap: 'small' | 'medium' | 'large'
  }
}

export function GalleryModule({ module }: GalleryModuleProps) {
  const { title, images, columns = 3, gap = 'medium' } = module

  const gapClasses = {
    small: 'gap-2',
    medium: 'gap-4',
    large: 'gap-8',
  }

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className="text-3xl font-bold mb-8 text-center">
            {title}
          </h2>
        )}
        
        <div className={`grid ${gridCols[columns as keyof typeof gridCols]} ${gapClasses[gap as keyof typeof gapClasses]}`}>
          {images.map((image, index) => (
            <div key={index} className="relative aspect-square">
              <Image
                src={urlFor(image).url()}
                alt={image.alt || `Gallery image ${index + 1}`}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 