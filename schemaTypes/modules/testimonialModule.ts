import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonialModule',
  title: 'Testimonial Module',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'quote',
              title: 'Quote',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'author',
              title: 'Author',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'position',
              title: 'Position',
              type: 'string',
            },
            {
              name: 'company',
              title: 'Company',
              type: 'string',
            },
            {
              name: 'avatar',
              title: 'Avatar',
              type: 'image',
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
            },
            {
              name: 'rating',
              title: 'Rating',
              type: 'number',
              options: {
                list: [
                  { title: '5 Stars', value: 5 },
                  { title: '4 Stars', value: 4 },
                  { title: '3 Stars', value: 3 },
                  { title: '2 Stars', value: 2 },
                  { title: '1 Star', value: 1 },
                ],
              },
            },
          ],
          preview: {
            select: {
              title: 'author',
              subtitle: 'quote',
              media: 'avatar',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'Anonymous',
                subtitle: subtitle ? subtitle.substring(0, 50) + (subtitle.length > 50 ? '...' : '') : 'No quote',
                media,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'Carousel', value: 'carousel' },
          { title: 'List', value: 'list' },
        ],
      },
      initialValue: 'grid',
    }),
    defineField({
      name: 'columns',
      title: 'Columns (Grid Layout)',
      type: 'number',
      options: {
        list: [
          { title: '1 Column', value: 1 },
          { title: '2 Columns', value: 2 },
          { title: '3 Columns', value: 3 },
        ],
      },
      initialValue: 3,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      testimonials: 'testimonials',
      layout: 'layout',
    },
    prepare({ title, testimonials, layout }) {
      return {
        title: title || 'Testimonial Module',
        subtitle: `${testimonials?.length || 0} testimonials • ${layout || 'grid'} layout`,
        media: () => null,
      }
    },
  },
}) 