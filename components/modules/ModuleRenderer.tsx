'use client'

import { HeroModule } from './HeroModule'
import { TextModule } from './TextModule'
import { ImageModule } from './ImageModule'
import { GalleryModule } from './GalleryModule'
import { CTAModule } from './CTAModule'
import { TestimonialModule } from './TestimonialModule'
import { FAQModule } from './FAQModule'

interface ModuleRendererProps {
  modules: any[]
}

export function ModuleRenderer({ modules }: ModuleRendererProps) {
  if (!modules || modules.length === 0) {
    return null
  }

  return (
    <div className="space-y-16">
      {modules.map((module, index) => {
        const { _type, _key } = module

        switch (_type) {
          case 'heroModule':
            return <HeroModule key={_key || index} module={module} />
          case 'textModule':
            return <TextModule key={_key || index} module={module} />
          case 'imageModule':
            return <ImageModule key={_key || index} module={module} />
          case 'galleryModule':
            return <GalleryModule key={_key || index} module={module} />
          case 'ctaModule':
            return <CTAModule key={_key || index} module={module} />
          case 'testimonialModule':
            return <TestimonialModule key={_key || index} module={module} />
          case 'faqModule':
            return <FAQModule key={_key || index} module={module} />
          default:
            console.warn(`Unknown module type: ${_type}`)
            return null
        }
      })}
    </div>
  )
} 