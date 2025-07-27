import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'textModule',
  title: 'Text Module',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'maxWidth',
      title: 'Max Width',
      type: 'string',
      options: {
        list: [
          { title: 'Full Width', value: 'full' },
          { title: 'Medium', value: 'medium' },
          { title: 'Narrow', value: 'narrow' },
        ],
      },
      initialValue: 'medium',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      content: 'content',
    },
    prepare({ title, content }) {
      const contentText = content?.[0]?.children?.[0]?.text || 'No content'
      return {
        title: title || 'Text Module',
        subtitle: contentText.substring(0, 50) + (contentText.length > 50 ? '...' : ''),
        media: () => null,
      }
    },
  },
}) 