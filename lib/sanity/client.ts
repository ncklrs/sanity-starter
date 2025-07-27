import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion } from './api'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
})

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Always false for preview
  token: process.env.SANITY_API_TOKEN, // Required for preview
}) 