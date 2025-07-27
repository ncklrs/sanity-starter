import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
          { title: 'Underline', value: 'underline' },
          { title: 'Strike', value: 'strike-through' },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (Rule) => Rule.uri({
                  scheme: ['http', 'https', 'mailto', 'tel']
                })
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean',
                initialValue: false,
              },
            ],
            preview: {
              select: {
                title: 'href',
                subtitle: 'blank',
              },
              prepare({ title, subtitle }) {
                return {
                  title: title || 'No URL set',
                  subtitle: subtitle ? 'Opens in new tab' : 'Opens in same tab',
                }
              },
            },
          },
          {
            title: 'Internal Link',
            name: 'internalLink',
            type: 'object',
            fields: [
              {
                title: 'Reference',
                name: 'reference',
                type: 'reference',
                to: [
                  { type: 'post' },
                  // { type: 'page' },
                  // Add more content types as needed
                ],
              },
            ],
            preview: {
              select: {
                title: 'reference.title',
                subtitle: 'reference._type',
              },
              prepare({ title, subtitle }) {
                return {
                  title: title || 'No reference set',
                  subtitle: subtitle ? `Links to ${subtitle}` : 'No reference type',
                }
              },
            },
          },
        ],
      },
    },
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
          validation: (Rule) => Rule.required().warning('Alt text is important for accessibility'),
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string',
          description: 'Optional caption to display below the image',
        },
        {
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
          initialValue: 'center',
        },
      ],
      preview: {
        select: {
          title: 'alt',
          subtitle: 'caption',
          media: 'asset',
        },
        prepare({ title, subtitle, media }) {
          return {
            title: title || 'No alt text set',
            subtitle: subtitle || 'No caption',
            media,
          }
        },
      },
    },
    // {
    //   type: 'code',
    //   options: {
    //     withFilename: true,
    //   },
    // },
  ],
}) 