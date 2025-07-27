'use client'

import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

interface TestimonialModuleProps {
  module: {
    title?: string
    testimonials: Array<{
      quote: string
      author: string
      position?: string
      company?: string
      avatar?: any
      rating?: number
    }>
    layout: 'grid' | 'carousel' | 'list'
    columns: number
  }
}

export function TestimonialModule({ module }: TestimonialModuleProps) {
  const { title, testimonials, layout = 'grid', columns = 3 } = module

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
        ★
      </span>
    ))
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className="text-3xl font-bold mb-12 text-center">
            {title}
          </h2>
        )}
        
        <div className={`grid ${gridCols[columns as keyof typeof gridCols]} gap-8`}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              {testimonial.rating && (
                <div className="flex mb-4">
                  {renderStars(testimonial.rating)}
                </div>
              )}
              
              <blockquote className="text-gray-700 mb-6 italic">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center">
                {testimonial.avatar && (
                  <div className="relative w-12 h-12 mr-4">
                    <Image
                      src={urlFor(testimonial.avatar).url()}
                      alt={testimonial.author}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                )}
                
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.author}
                  </div>
                  {(testimonial.position || testimonial.company) && (
                    <div className="text-sm text-gray-600">
                      {testimonial.position}
                      {testimonial.position && testimonial.company && ', '}
                      {testimonial.company}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 