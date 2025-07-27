import groq from 'groq'

export const allPostsQuery = groq`*[_type == "post"]{title, slug}`
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    title, 
    slug, 
    publishedAt,
    body,
    llmMetadata, 
    seo
  }
`

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
      ...,
      // Hero Module
      ...(_type == "heroModule" => {
        title,
        subtitle,
        image,
        ctaText,
        ctaLink,
        backgroundColor
      }),
      // Text Module
      ...(_type == "textModule" => {
        title,
        content,
        alignment,
        maxWidth
      }),
      // Image Module
      ...(_type == "imageModule" => {
        image,
        caption,
        alignment,
        maxWidth
      }),
      // Gallery Module
      ...(_type == "galleryModule" => {
        title,
        images[] {
          ...,
          asset->
        },
        columns,
        gap
      }),
      // CTA Module
      ...(_type == "ctaModule" => {
        title,
        description,
        buttonText,
        buttonLink,
        backgroundColor,
        buttonStyle,
        alignment
      }),
      // Testimonial Module
      ...(_type == "testimonialModule" => {
        title,
        testimonials[] {
          quote,
          author,
          position,
          company,
          avatar,
          rating
        },
        layout,
        columns
      }),
      // FAQ Module
      ...(_type == "faqModule" => {
        title,
        description,
        faqs[] {
          question,
          answer,
          category
        },
        layout,
        showCategories
      })
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

export const settingsQuery = groq`
  *[_type == "settings"][0] {
    siteTitle,
    siteDescription,
    logo,
    favicon,
    defaultSeo,
    homepage->{
      _id,
      title,
      slug
    },
    mainNavigation[] {
      label,
      link,
      page->{
        _id,
        title,
        slug
      },
      children[] {
        label,
        link,
        page->{
          _id,
          title,
          slug
        }
      },
      openInNewTab,
      highlight
    },
    facebook,
    twitter,
    instagram,
    linkedin,
    youtube,
    github,
    tiktok,
    email,
    phone,
    address,
    googleAnalyticsId,
    googleTagManagerId,
    facebookPixelId,
    hotjarId
  }
` 