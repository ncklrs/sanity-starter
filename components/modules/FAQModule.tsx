'use client'

import { useState } from 'react'
import { PortableText } from '@portabletext/react'
import { portableTextComponents } from '@/lib/portable-text'

interface FAQModuleProps {
  module: {
    title?: string
    description?: string
    faqs: Array<{
      question: string
      answer: any
      category?: string
    }>
    layout: 'accordion' | 'list' | 'grid'
    showCategories: boolean
  }
}

export function FAQModule({ module }: FAQModuleProps) {
  const { title, description, faqs, layout = 'accordion', showCategories = false } = module
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const groupedFaqs = showCategories 
    ? faqs.reduce((acc, faq) => {
        const category = faq.category || 'General'
        if (!acc[category]) acc[category] = []
        acc[category].push(faq)
        return acc
      }, {} as Record<string, typeof faqs>)
    : { 'All': faqs }

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className="text-3xl font-bold mb-4 text-center">
            {title}
          </h2>
        )}
        
        {description && (
          <p className="text-lg text-gray-600 mb-12 text-center">
            {description}
          </p>
        )}

        {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
          <div key={category} className="mb-12">
            {showCategories && (
              <h3 className="text-xl font-semibold mb-6 text-gray-900">
                {category}
              </h3>
            )}
            
            <div className="space-y-4">
              {categoryFaqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900">
                      {faq.question}
                    </span>
                    <span className="text-gray-500">
                      {openItems.includes(index) ? '−' : '+'}
                    </span>
                  </button>
                  
                  {openItems.includes(index) && (
                    <div className="px-6 pb-4">
                      <div className="prose prose-sm max-w-none">
                        <PortableText value={faq.answer} components={portableTextComponents} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
} 