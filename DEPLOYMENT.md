# Deployment Guide

## Quick Deploy to Vercel

1. **Fork this repository** to your GitHub account
2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your forked repository
   - Vercel will auto-detect Next.js settings

3. **Set Environment Variables** in Vercel dashboard:
   ```
   DATABASE_URL=postgresql://username:password@host:port/database
   NEXT_PUBLIC_APP_NAME=CivicLabs
   NEXT_PUBLIC_BRAND_DEFAULT=#2563EB
   ```

4. **Database Setup**:
   - Use Vercel Postgres or any PostgreSQL provider
   - Run migrations: `npx prisma migrate deploy`
   - Seed data: `npm run db:seed`

## Alternative Platforms

### Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### Netlify
```bash
# Build command
npm run build

# Publish directory
.next
```

### Self-Hosted
```bash
# Build
npm run build

# Start production server
npm start
```

## Environment Variables

### Required
- `DATABASE_URL`: PostgreSQL connection string
- `NEXT_PUBLIC_APP_NAME`: Display name for your app
- `NEXT_PUBLIC_BRAND_DEFAULT`: Primary color hex code

### Optional
- `NEXTAUTH_SECRET`: For production authentication
- `NEXTAUTH_URL`: Your production URL

## Database Migrations

```bash
# Development
npm run db:migrate

# Production
npx prisma migrate deploy
npx prisma generate
```

## Customization

### Branding
1. Update `NEXT_PUBLIC_APP_NAME` in environment variables
2. Replace logo in `/public/images/`
3. Modify colors in `src/lib/theme.ts`

### Categories
Edit category options in:
- `src/app/browse/page.tsx`
- `src/lib/badges.ts`

## Security Notes

- Change default admin credentials in production
- Use proper authentication (NextAuth.js, Clerk, etc.)
- Enable HTTPS in production
- Set up proper CORS policies
- Consider rate limiting for API endpoints

## Performance

- Enable edge caching for static assets
- Use CDN for images
- Consider database connection pooling
- Monitor API response times
