import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'llmMetadata',
  title: 'LLM Metadata',
  type: 'object',
  fields: [
    defineField({ name: 'purpose', type: 'string', description: 'Why this content exists' }),
    defineField({ name: 'audiencePersona', type: 'string', description: 'Intended reader persona' }),
    defineField({
      name: 'format',
      type: 'string',
      options: {
        list: ['instruction','faq','how-to','definition','story','step-by-step'],
      },
    }),
    defineField({
      name: 'contextTags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Contextual topic tags helpful for retrieval',
    }),
    defineField({
      name: 'relatedEntities',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      description: 'Structured grounding references to related content',
    }),
    defineField({
      name: 'metadata',
      type: 'object',
      fields: [
        { name: 'readingLevel', type: 'string' },
        { name: 'estimatedReadTime', type: 'number', description: 'minutes' },
        { name: 'tokens', type: 'number', description: 'estimated token count' },
      ],
    }),
  ],
})
