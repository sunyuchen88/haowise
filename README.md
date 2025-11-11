This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
cd website-dev && npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Production Deployment

To deploy this application to production, follow these steps:

1. **Build the application:**
   
   ```bash
   npm run build
   ```

2. **Start the production server:**
   
   ```bash
   npm start
   ```

3. **Or use the deployment script:**
   
   ```bash
   npm run deploy
   ```

The application will be available on port 3000 by default. For production deployment, you may want to use a reverse proxy like Nginx to serve the application on port 80/443.

### Environment Variables

For production deployment, make sure to set the appropriate environment variables in `.env.production` file.

docker部署

构建docker镜像

docker build -t haowise-website:latest .

启动docker容器

docker run -d --name haowise-website -p 3000:3000 haowise-website:latest

docker run -d --name haowise-website -p 3000:3000 --env-file .env.production haowise-website:latest

### Security Considerations

- Ensure HTTPS is configured for production
- Set appropriate HTTP security headers
- Regularly update dependencies
- Use strong authentication for admin interfaces