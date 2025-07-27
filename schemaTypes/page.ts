import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'llm', title: 'LLM Metadata' },
    // { name: 'modules', title: 'Content Modules' },
  ],
  fields: [
    // Content Group
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
        ],
      },
      group: 'content',
      initialValue: 'draft',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'content',
    }),
    
    // SEO Group
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      group: 'seo',
    }),
    
    // LLM Group
    defineField({
      name: 'llmMetadata',
      title: 'LLM Metadata',
      type: 'llmMetadata',
      group: 'llm',
    }),
    
    // Modules Group
    defineField({
      name: 'modules',
      title: 'Content Modules',
      type: 'array',
      of: [
        { type: 'heroModule' },
        { type: 'textModule' },
        { type: 'imageModule' },
        { type: 'galleryModule' },
        { type: 'ctaModule' },
        { type: 'testimonialModule' },
        { type: 'faqModule' },
      ],
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug',
      status: 'status',
      publishedAt: 'publishedAt',
    },
    prepare({ title, slug, status, publishedAt }) {
      return {
        title: title || 'Untitled Page',
        subtitle: `${status === 'published' ? 'Published' : 'Draft'} • ${slug?.current || 'No slug'}`,
        media: () => null,
      }
    },
  },
}) 