import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'galleryModule',
  title: 'Gallery Module',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
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
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'number',
      options: {
        list: [
          { title: '2 Columns', value: 2 },
          { title: '3 Columns', value: 3 },
          { title: '4 Columns', value: 4 },
          { title: '5 Columns', value: 5 },
        ],
      },
      initialValue: 3,
    }),
    defineField({
      name: 'gap',
      title: 'Gap Between Images',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
        ],
      },
      initialValue: 'medium',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      images: 'images',
      columns: 'columns',
    },
    prepare({ title, images, columns }) {
      return {
        title: title || 'Gallery Module',
        subtitle: `${images?.length || 0} images • ${columns || 3} columns`,
        media: images?.[0],
      }
    },
  },
}) 