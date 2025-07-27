'use client'

import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

interface ImageModuleProps {
  module: {
    image: any
    caption?: string
    alignment?: 'left' | 'center' | 'right'
    maxWidth?: 'full' | 'large' | 'medium' | 'small'
  }
}

export function ImageModule({ module }: ImageModuleProps) {
  const { image, caption, alignment = 'center', maxWidth = 'medium' } = module

  const maxWidthClasses = {
    full: 'max-w-none',
    large: 'max-w-6xl',
    medium: 'max-w-4xl',
    small: 'max-w-2xl',
  }

  const alignmentClasses = {
    left: 'ml-0 mr-auto',
    center: 'mx-auto',
    right: 'ml-auto mr-0',
  }

  return (
    <section className="py-16">
      <div className={`px-4 sm:px-6 lg:px-8 ${maxWidthClasses[maxWidth as keyof typeof maxWidthClasses]} ${alignmentClasses[alignment as keyof typeof alignmentClasses]}`}>
        <figure className="relative">
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={urlFor(image).url()}
              alt={image.alt || caption || 'Image'}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          {caption && (
            <figcaption className="mt-4 text-sm text-gray-600 text-center">
              {caption}
            </figcaption>
          )}
        </figure>
      </div>
    </section>
  )
} 