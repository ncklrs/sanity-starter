'use client'

import { PortableText } from '@portabletext/react'
import { portableTextComponents } from '@/lib/portable-text'

interface TextModuleProps {
  module: {
    title?: string
    content: any
    alignment?: 'left' | 'center' | 'right'
    maxWidth?: 'full' | 'medium' | 'narrow'
  }
}

export function TextModule({ module }: TextModuleProps) {
  const { title, content, alignment = 'left', maxWidth = 'medium' } = module

  const maxWidthClasses = {
    full: 'max-w-none',
    medium: 'max-w-4xl',
    narrow: 'max-w-2xl',
  }

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <section className="py-16">
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${maxWidthClasses[maxWidth as keyof typeof maxWidthClasses]}`}>
        {title && (
          <h2 className={`text-3xl font-bold mb-8 ${alignmentClasses[alignment as keyof typeof alignmentClasses]}`}>
            {title}
          </h2>
        )}
        
        <div className={`prose prose-lg max-w-none ${alignmentClasses[alignment as keyof typeof alignmentClasses]}`}>
          <PortableText value={content} components={portableTextComponents} />
        </div>
      </div>
    </section>
  )
} 