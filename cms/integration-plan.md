# CMS Integration Plan

## Overview
This document describes the integration plan for connecting the Haowise website with a headless CMS (Content Management System). This integration will allow content managers to update website content without requiring developer intervention.

## Chosen CMS
We will use Strapi as our headless CMS because:
- It's open-source and free to use
- It provides a user-friendly admin interface
- It has good TypeScript support
- It offers both REST and GraphQL APIs
- It's easy to deploy and maintain

## Content Models

### 1. Page Content Model
- **Title**: String - The page title
- **Slug**: String - URL-friendly identifier (e.g., 'home', 'solutions')
- **Content**: Rich text - Main page content
- **Language**: Enumeration ('zh', 'en') - Content language
- **Meta Title**: String - SEO title
- **Meta Description**: Text - SEO description
- **Published**: Boolean - Publication status
- **CreatedAt**: DateTime - Creation timestamp
- **UpdatedAt**: DateTime - Last update timestamp

### 2. Navigation Model
- **Name**: String - Navigation name (e.g., 'Main Menu')
- **Language**: Enumeration ('zh', 'en') - Navigation language
- **Items**: Component (repeated) - Navigation items
  - **Title**: String - Item title
  - **URL**: String - Item URL
  - **Order**: Integer - Display order

### 3. Settings Model
- **Site Name**: String - Website name
- **Site Description**: Text - Website description
- **Contact Email**: Email - Contact email address
- **Phone**: String - Contact phone number
- **Address**: Text - Physical address
- **Social Media Links**: JSON - Social media URLs
- **Language**: Enumeration ('zh', 'en') - Settings language

## API Integration

### Endpoints
1. **Pages API**
   - GET `/api/pages?filters[slug][$eq]=home&locale=zh` - Get homepage content in Chinese
   - GET `/api/pages?filters[slug][$eq]=solutions&locale=en` - Get solutions page content in English

2. **Navigation API**
   - GET `/api/navigations?filters[name][$eq]=main-menu&locale=zh` - Get main navigation in Chinese

3. **Settings API**
   - GET `/api/settings?locale=zh` - Get site settings in Chinese

## Next.js Integration

### Data Fetching Strategy
We will use Next.js's data fetching methods:
- `getStaticProps` - For static content that doesn't change frequently
- `getStaticPaths` - For dynamic routes
- Incremental Static Regeneration (ISR) - To update content periodically

### Implementation Example
```javascript
// pages/[slug].js
export async function getStaticProps({ params, locale }) {
  const res = await fetch(`${process.env.CMS_URL}/api/pages?filters[slug][$eq]=${params.slug}&locale=${locale}`);
  const pageData = await res.json();
  
  return {
    props: {
      page: pageData.data[0],
    },
    revalidate: 60, // Revalidate at most once every 60 seconds
  };
}
```

## Content Management Workflow

1. **Content Creation**
   - Content managers create and edit content in Strapi admin panel
   - Content is saved as drafts initially
   - Content is published when ready

2. **Content Delivery**
   - Next.js fetches content from Strapi API at build time
   - Content is cached and served statically
   - Content is refreshed periodically through ISR

3. **Content Updates**
   - Changes in Strapi are reflected on the website within 60 seconds
   - No manual deployment is required for content changes

## Deployment Architecture

### Development Environment
- Strapi: http://localhost:1337
- Next.js: http://localhost:3000

### Production Environment
- Strapi: https://cms.haowise.com
- Next.js: https://haowise.com

## Security Considerations

1. **API Security**
   - Use environment variables for API URLs and keys
   - Implement proper CORS settings in Strapi
   - Use HTTPS for all API requests

2. **Content Security**
   - Sanitize HTML content from CMS
   - Validate all content before rendering
   - Implement proper user roles in Strapi

## Performance Optimization

1. **Caching Strategy**
   - Use ISR to cache content with periodic revalidation
   - Implement Redis caching for frequently accessed content
   - Use CDN for static assets

2. **Image Optimization**
   - Use Strapi's responsive image plugin
   - Implement Next.js Image component for optimized image delivery

## Testing Plan

1. **Unit Tests**
   - Test content rendering components
   - Test API integration functions

2. **Integration Tests**
   - Test content fetching from CMS
   - Test content rendering in different languages

3. **End-to-End Tests**
   - Test content management workflow
   - Test content updates and propagation

## Rollout Plan

1. **Phase 1**: Setup Strapi instance and content models
2. **Phase 2**: Implement API integration in Next.js
3. **Phase 3**: Migrate existing content to CMS
4. **Phase 4**: Test and optimize performance
5. **Phase 5**: Train content managers and go live