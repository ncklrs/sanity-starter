import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'navigationItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'External Link',
      type: 'url',
      description: 'Use this for external links (e.g., https://example.com)',
    }),
    defineField({
      name: 'page',
      title: 'Page Reference',
      type: 'reference',
      to: [{ type: 'page' }],
      description: 'Use this for internal pages',
    }),
    defineField({
      name: 'children',
      title: 'Submenu Items',
      type: 'array',
      of: [{ type: 'navigationItem' }],
      description: 'Add submenu items for dropdown menus',
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      description: 'Open link in a new browser tab',
      initialValue: false,
    }),
    defineField({
      name: 'highlight',
      title: 'Highlight',
      type: 'boolean',
      description: 'Highlight this item (e.g., for CTA buttons)',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'label',
      link: 'link',
      page: 'page.title',
      children: 'children',
    },
    prepare({ title, link, page, children }) {
      const url = link || (page ? `Page: ${page}` : 'No link')
      const hasChildren = children && children.length > 0
      return {
        title: title || 'Untitled',
        subtitle: `${url}${hasChildren ? ` • ${children.length} children` : ''}`,
        media: () => null,
      }
    },
  },
  validation: (Rule) => 
    Rule.custom((fields) => {
      if (!fields?.link && !fields?.page) {
        return 'Either External Link or Page Reference is required'
      }
      if (fields?.link && fields?.page) {
        return 'Cannot have both External Link and Page Reference'
      }
      return true
    }),
}) 