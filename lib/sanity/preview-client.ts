import { createClient } from 'next-sanity'

export const previewClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false, // Always false for preview
  token: process.env.SANITY_API_TOKEN, // Required for preview
}) 