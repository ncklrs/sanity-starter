import { groq } from 'next-sanity'

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    status,
    publishedAt,
    seo,
    llmMetadata,
    modules[] {
      _type,
      _key,
      // Hero Module
      title,
      subtitle,
      image,
      ctaText,
      ctaLink,
      backgroundColor,
      // Text Module
      content,
      alignment,
      maxWidth,
      // Image Module
      caption,
      // Gallery Module
      images,
      columns,
      gap,
      // CTA Module
      description,
      buttonText,
      buttonLink,
      buttonStyle,
      // Testimonial Module
      testimonials[] {
        quote,
        author,
        position,
        company,
        avatar,
        rating
      },
      layout,
      // FAQ Module
      faqs[] {
        question,
        answer,
        category
      },
      showCategories
    }
  }
`

export const allPagesQuery = groq`
  *[_type == "page" && status == "published"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt
  }
` 