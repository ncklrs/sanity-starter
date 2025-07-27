import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title used for search engines (50-60 characters recommended)',
      validation: (Rule) => Rule.max(60).warning('Longer titles may be truncated by search engines'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Description for search engines (150-160 characters recommended)',
      validation: (Rule) => Rule.max(160).warning('Longer descriptions may be truncated by search engines'),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Keywords for search engines (comma separated)',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'The canonical URL for this page (optional, defaults to current URL)',
    }),
    defineField({
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      description: 'Prevent search engines from indexing this page',
      initialValue: false,
    }),
    defineField({
      name: 'noFollow',
      title: 'No Follow',
      type: 'boolean',
      description: 'Prevent search engines from following links on this page',
      initialValue: false,
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image displayed when shared on social media (1200x630px recommended)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for accessibility',
        },
      ],
    }),
    defineField({
      name: 'ogTitle',
      title: 'Open Graph Title',
      type: 'string',
      description: 'Title displayed when shared on social media (optional, defaults to meta title)',
    }),
    defineField({
      name: 'ogDescription',
      title: 'Open Graph Description',
      type: 'text',
      rows: 3,
      description: 'Description displayed when shared on social media (optional, defaults to meta description)',
    }),
    defineField({
      name: 'twitterCard',
      title: 'Twitter Card Type',
      type: 'string',
      options: {
        list: [
          { title: 'Summary', value: 'summary' },
          { title: 'Summary Large Image', value: 'summary_large_image' },
          { title: 'App', value: 'app' },
          { title: 'Player', value: 'player' },
        ],
      },
      initialValue: 'summary_large_image',
    }),
    defineField({
      name: 'twitterImage',
      title: 'Twitter Image',
      type: 'image',
      description: 'Image displayed when shared on Twitter (1200x600px recommended)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for accessibility',
        },
      ],
    }),
    defineField({
      name: 'structuredData',
      title: 'Structured Data',
      type: 'object',
      description: 'JSON-LD structured data for search engines',
      fields: [
        {
          name: 'type',
          title: 'Schema Type',
          type: 'string',
          options: {
            list: [
              { title: 'Article', value: 'Article' },
              { title: 'BlogPosting', value: 'BlogPosting' },
              { title: 'WebPage', value: 'WebPage' },
              { title: 'Product', value: 'Product' },
              { title: 'Organization', value: 'Organization' },
              { title: 'Person', value: 'Person' },
              { title: 'FAQPage', value: 'FAQPage' },
              { title: 'HowTo', value: 'HowTo' },
            ],
          },
        },
        {
          name: 'data',
          title: 'Structured Data',
          type: 'text',
          rows: 10,
          description: 'JSON-LD structured data (optional, can be auto-generated)',
        },
      ],
    }),
    defineField({
      name: 'additionalMetaTags',
      title: 'Additional Meta Tags',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              description: 'Meta tag name (e.g., robots, author, viewport)',
            },
            {
              name: 'content',
              title: 'Content',
              type: 'string',
              description: 'Meta tag content',
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'content',
            },
          },
        },
      ],
      description: 'Additional meta tags for specific SEO requirements',
    }),
  ],
  preview: {
    select: {
      title: 'metaTitle',
      subtitle: 'metaDescription',
      media: 'ogImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'SEO Settings',
        subtitle: subtitle ? subtitle.substring(0, 100) + (subtitle.length > 100 ? '...' : '') : 'No description set',
        media,
      }
    },
  },
})
