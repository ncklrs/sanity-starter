import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'faqModule',
  title: 'FAQ Module',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'blockContent',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'category',
              title: 'Category',
              type: 'string',
              options: {
                list: [
                  { title: 'General', value: 'general' },
                  { title: 'Technical', value: 'technical' },
                  { title: 'Pricing', value: 'pricing' },
                  { title: 'Support', value: 'support' },
                  { title: 'Other', value: 'other' },
                ],
              },
              initialValue: 'general',
            },
          ],
          preview: {
            select: {
              title: 'question',
              category: 'category',
            },
            prepare({ title, category }) {
              return {
                title: title || 'Untitled Question',
                subtitle: category ? `Category: ${category}` : 'No category',
                media: () => null,
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
          { title: 'Accordion', value: 'accordion' },
          { title: 'List', value: 'list' },
          { title: 'Grid', value: 'grid' },
        ],
      },
      initialValue: 'accordion',
    }),
    defineField({
      name: 'showCategories',
      title: 'Show Categories',
      type: 'boolean',
      description: 'Group FAQs by category',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      faqs: 'faqs',
      layout: 'layout',
    },
    prepare({ title, faqs, layout }) {
      return {
        title: title || 'FAQ Module',
        subtitle: `${faqs?.length || 0} questions • ${layout || 'accordion'} layout`,
        media: () => null,
      }
    },
  },
}) 