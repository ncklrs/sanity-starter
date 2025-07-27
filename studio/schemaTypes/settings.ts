import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'navigation', title: 'Navigation' },
    { name: 'social', title: 'Social Media' },
    { name: 'contact', title: 'Contact Information' },
    { name: 'analytics', title: 'Analytics' },
  ],
  fields: [
    // General Group
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      group: 'general',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'general',
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
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      group: 'general',
      description: '32x32 pixel icon for browser tabs',
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO Settings',
      type: 'seo',
      group: 'general',
      description: 'Default SEO settings for pages without specific SEO',
    }),
    
    // Navigation Group
    defineField({
      name: 'homepage',
      title: 'Homepage',
      type: 'reference',
      to: [{ type: 'page' }],
      group: 'navigation',
      description: 'Select the page to serve as the homepage',
    }),
    defineField({
      name: 'mainNavigation',
      title: 'Main Navigation',
      type: 'array',
      of: [{ type: 'navigationItem' }],
      group: 'navigation',
    }),
    defineField({
      name: 'footerNavigation',
      title: 'Footer Navigation',
      type: 'array',
      of: [{ type: 'navigationItem' }],
      group: 'navigation',
    }),
    
    // Social Media Group
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'twitter',
      title: 'Twitter URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'github',
      title: 'GitHub URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'tiktok',
      title: 'TikTok URL',
      type: 'url',
      group: 'social',
    }),
    
    // Contact Group
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
      group: 'contact',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
      group: 'contact',
    }),
    defineField({
      name: 'contactForm',
      title: 'Contact Form Settings',
      type: 'object',
      group: 'contact',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Contact Form',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'recipientEmail',
          title: 'Recipient Email',
          type: 'email',
          description: 'Email address to receive form submissions',
        },
        {
          name: 'successMessage',
          title: 'Success Message',
          type: 'string',
          initialValue: 'Thank you for your message. We\'ll get back to you soon!',
        },
      ],
    }),
    
    // Analytics Group
    defineField({
      name: 'googleAnalyticsId',
      title: 'Google Analytics ID',
      type: 'string',
      group: 'analytics',
      description: 'Google Analytics 4 Measurement ID (G-XXXXXXXXXX)',
    }),
    defineField({
      name: 'googleTagManagerId',
      title: 'Google Tag Manager ID',
      type: 'string',
      group: 'analytics',
      description: 'Google Tag Manager Container ID (GTM-XXXXXXX)',
    }),
    defineField({
      name: 'facebookPixelId',
      title: 'Facebook Pixel ID',
      type: 'string',
      group: 'analytics',
      description: 'Facebook Pixel ID for tracking',
    }),
    defineField({
      name: 'hotjarId',
      title: 'Hotjar ID',
      type: 'string',
      group: 'analytics',
      description: 'Hotjar Site ID for heatmaps and recordings',
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle',
      subtitle: 'siteDescription',
      media: 'logo',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Site Settings',
        subtitle: subtitle ? subtitle.substring(0, 100) + (subtitle.length > 100 ? '...' : '') : 'No description',
        media,
      }
    },
  },
}) 