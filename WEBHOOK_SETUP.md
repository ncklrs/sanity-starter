# Sanity Webhook Setup & Revalidation

This document explains how to set up webhooks for automatic revalidation when content changes in Sanity.

## Overview

The system implements both **tag-based** and **path-based** revalidation to ensure content updates are immediately reflected on the frontend.

## Webhook Endpoints

### 1. Automatic Revalidation Webhook
**Endpoint**: `POST /api/revalidate`

This endpoint is called automatically by Sanity when content changes.

**Headers**:
```
sanity-webhook-signature: your_webhook_secret
```

**Body**:
```json
{
  "_type": "page|post|settings",
  "_id": "document_id",
  "slug": "document_slug",
  "operation": "create|update|delete"
}
```

### 2. Manual Revalidation Webhook
**Endpoint**: `POST /api/revalidate/manual`

This endpoint allows manual revalidation for testing or admin purposes.

**Body**:
```json
{
  "secret": "your_webhook_secret",
  "tag": "optional_tag_to_revalidate",
  "path": "optional_path_to_revalidate"
}
```

## Sanity Studio Webhook Configuration

### 1. Create Webhook in Sanity Studio

1. Go to your Sanity project dashboard
2. Navigate to **API** → **Webhooks**
3. Click **Create webhook**
4. Configure as follows:

**Name**: `Content Revalidation`
**URL**: `https://your-domain.com/api/revalidate`
**HTTP Method**: `POST`
**Dataset**: `production` (or your dataset)
**API Version**: `v2024-01-01`

### 2. Configure Webhook Filters

**Filter**: `_type in ["page", "post", "settings"]`

This ensures the webhook only triggers for relevant content types.

### 3. Set Headers

Add a custom header:
- **Name**: `sanity-webhook-signature`
- **Value**: `your_webhook_secret` (same as SANITY_WEBHOOK_SECRET)

## Environment Variables

Add these to your `.env.local`:

```env
# Webhook Configuration
SANITY_WEBHOOK_SECRET=your_webhook_secret_here
```

## Revalidation Strategy

### Tag-Based Revalidation

The system uses Next.js tags for granular revalidation:

- `page` - All pages
- `page:slug` - Specific page
- `post` - All posts  
- `post:slug` - Specific post
- `settings` - Site settings

### Path-Based Revalidation

The system also revalidates specific paths:

- `/` - Homepage
- `/pages/slug` - Specific page
- `/blog` - Blog listing
- `/blog/slug` - Specific blog post

## Data Fetching with Tags

All data fetching functions include appropriate tags:

```typescript
// Example: Fetching a page with tags
const page = await client.fetch(pageBySlugQuery, { slug }, {
  next: {
    tags: [`page:${slug}`, 'page']
  }
})
```

## Testing Revalidation

### 1. Test Automatic Revalidation

1. Make a change in Sanity Studio
2. Publish the change
3. Check the webhook logs in your deployment platform
4. Verify the content updates on your site

### 2. Test Manual Revalidation

```bash
curl -X POST https://your-domain.com/api/revalidate/manual \
  -H "Content-Type: application/json" \
  -d '{
    "secret": "your_webhook_secret",
    "tag": "page:homepage"
  }'
```

### 3. Test Path Revalidation

```bash
curl -X POST https://your-domain.com/api/revalidate/manual \
  -H "Content-Type: application/json" \
  -d '{
    "secret": "your_webhook_secret",
    "path": "/"
  }'
```

## Troubleshooting

### Webhook Not Triggering

1. Check webhook URL is correct
2. Verify webhook is enabled in Sanity
3. Check webhook filters are correct
4. Verify dataset matches

### Revalidation Not Working

1. Check webhook secret matches environment variable
2. Verify webhook signature header is set
3. Check server logs for errors
4. Ensure tags are properly set in data fetching

### Content Not Updating

1. Check if content is published in Sanity
2. Verify revalidation tags match content type
3. Check cache headers and CDN settings
4. Test manual revalidation

## Security Considerations

1. **Webhook Secret**: Use a strong, unique secret
2. **HTTPS**: Always use HTTPS for webhook URLs
3. **Signature Verification**: The system verifies webhook signatures
4. **Rate Limiting**: Consider implementing rate limiting for manual revalidation

## Performance Optimization

1. **Granular Tags**: Use specific tags to avoid unnecessary revalidation
2. **Selective Paths**: Only revalidate affected paths
3. **Batch Operations**: Consider batching multiple revalidations
4. **Monitoring**: Monitor webhook performance and success rates

## Monitoring

Monitor webhook performance through:

1. **Server Logs**: Check for webhook errors
2. **Sanity Dashboard**: Monitor webhook delivery status
3. **Application Metrics**: Track revalidation success rates
4. **User Feedback**: Monitor content update delays

## Best Practices

1. **Test Thoroughly**: Test webhooks in development first
2. **Monitor Logs**: Keep an eye on webhook logs
3. **Backup Strategy**: Have manual revalidation as backup
4. **Documentation**: Keep webhook configuration documented
5. **Security**: Regularly rotate webhook secrets 