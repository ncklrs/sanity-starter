// Token management for Sanity

export interface SanityToken {
  token: string
  expiresAt?: Date
  permissions: string[]
}

// Get the API token for server-side operations
export function getApiToken(): string | null {
  return process.env.SANITY_API_TOKEN || null
}

// Get the preview token for client-side preview mode
export function getPreviewToken(): string | null {
  return process.env.SANITY_PREVIEW_SECRET || null
}

// Validate if a token is valid for preview mode
export function validatePreviewToken(token: string): boolean {
  const validToken = getPreviewToken()
  return validToken ? token === validToken : false
}

// Check if preview mode is enabled
export function isPreviewMode(): boolean {
  return process.env.NODE_ENV === 'development' || !!getApiToken()
}

// Get token permissions (basic implementation)
export function getTokenPermissions(token: string): string[] {
  // In a real implementation, you'd decode the JWT token
  // and extract permissions from the payload
  if (token === getApiToken()) {
    return ['read', 'write', 'create', 'delete']
  }
  if (token === getPreviewToken()) {
    return ['read']
  }
  return []
}

// Check if token has specific permission
export function hasPermission(token: string, permission: string): boolean {
  const permissions = getTokenPermissions(token)
  return permissions.includes(permission)
}

// Token validation for API routes
export function validateApiToken(token: string): boolean {
  const apiToken = getApiToken()
  return apiToken ? token === apiToken : false
}

// Generate a secure token for webhooks
export function generateWebhookToken(): string {
  const webhookSecret = process.env.SANITY_WEBHOOK_SECRET
  if (!webhookSecret) {
    throw new Error('SANITY_WEBHOOK_SECRET is not configured')
  }
  return webhookSecret
}

// Validate webhook signature
export function validateWebhookSignature(
  signature: string,
  body: string,
  secret: string
): boolean {
  // In a real implementation, you'd use crypto to validate the signature
  // For now, we'll do a simple comparison
  return signature === secret
} 