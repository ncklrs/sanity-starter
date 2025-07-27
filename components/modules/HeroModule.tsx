'use client'

import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

interface HeroModuleProps {
  module: {
    title: string
    subtitle?: string
    image?: any
    ctaText?: string
    ctaLink?: string
    backgroundColor?: string
  }
}

export function HeroModule({ module }: HeroModuleProps) {
  const { title, subtitle, image, ctaText, ctaLink, backgroundColor = 'default' } = module

  const bgColors = {
    default: 'bg-white',
    primary: 'bg-blue-600',
    secondary: 'bg-gray-600',
    dark: 'bg-gray-900',
  }

  const textColors = {
    default: 'text-gray-900',
    primary: 'text-white',
    secondary: 'text-white',
    dark: 'text-white',
  }

  return (
    <section className={`relative min-h-[60vh] flex items-center justify-center ${bgColors[backgroundColor as keyof typeof bgColors]}`}>
      {/* Background Image */}
      {image && (
        <div className="absolute inset-0 z-0">
          <Image
            src={urlFor(image).url()}
            alt={image.alt || title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${textColors[backgroundColor as keyof typeof textColors]}`}>
          {title}
        </h1>
        
        {subtitle && (
          <p className={`text-xl md:text-2xl mb-8 ${textColors[backgroundColor as keyof typeof textColors]} opacity-90`}>
            {subtitle}
          </p>
        )}

        {ctaText && ctaLink && (
          <a
            href={ctaLink}
            className="inline-block bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {ctaText}
          </a>
        )}
      </div>
    </section>
  )
} 