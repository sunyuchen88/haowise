# CMS Integration Plan

## Overview
This document outlines the plan for integrating a headless CMS with the Haowise website. The CMS will allow content managers to update website content without requiring code changes.

## Chosen CMS
We will use Strapi as our headless CMS because:
- It's open-source and free to use
- It provides a user-friendly admin interface
- It has good TypeScript support
- It offers REST and GraphQL APIs
- It's easy to deploy and maintain

## Content Models

### 1. Page Model
- Title (string)
- Slug (string)
- Content (richtext)
- Language (enumeration: 'zh', 'en')
- Published status (boolean)
- Created/Updated timestamps

### 2. Navigation Model
- Menu items with title, URL, and order
- Separate navigation for each language

### 3. Settings Model
- Site title
- Site description
- Contact information
- Social media links

## Implementation Steps

1. Set up Strapi project
2. Create content models
3. Add sample content
4. Connect Next.js frontend to Strapi API
5. Update website components to fetch content from CMS
6. Test content management workflow

## API Endpoints

- GET /api/pages?slug=home&language=zh
- GET /api/navigation?language=zh
- GET /api/settings

## Deployment

The CMS will be deployed separately from the website and will be accessible at:
- Development: http://localhost:1337/admin
- Production: https://cms.haowise.com/admin

## Integration with Next.js

We will use getStaticProps and getStaticPaths to fetch content from the CMS at build time, with incremental static regeneration to update content periodically.