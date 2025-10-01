# Template Publishing Workflow

This document explains how to publish template bundles to Vercel Blob Storage for the Templates Hub.

## Overview

The template publishing system allows you to:
1. **Bundle** template directories into zip files
2. **Upload** them to Vercel Blob Storage
3. **Generate** a dynamic template map
4. **Update** the Templates Hub automatically

## Quick Start

```bash
# 1. Set up your template source files
mkdir templates-src
mkdir templates-src/civic
mkdir templates-src/justice
mkdir templates-src/edu
mkdir templates-src/health

# 2. Add your template files to each directory
# (Copy your Next.js projects into each folder)

# 3. Run the publishing script
npm run publish-templates
```

## Directory Structure

```
templates-src/
├── civic/           # CivicLabs template
│   ├── package.json
│   ├── next.config.js
│   ├── src/
│   └── ...
├── justice/         # JusticeLabs template
│   ├── package.json
│   ├── next.config.js
│   ├── src/
│   └── ...
├── edu/             # EduLabs template
│   └── ...
└── health/          # HealthLabs template
    └── ...
```

## Publishing Script

The `scripts/publish-templates.ts` script:

1. **Scans** `templates-src/` for template directories
2. **Zips** each template into `templates-dist/`
3. **Uploads** each zip to Vercel Blob Storage
4. **Generates** a `template-map.json` with all URLs
5. **Uploads** the template map to blob storage

### Output

```
🚀 Publishing 4 templates to Vercel Blob...
📁 Source: /path/to/templates-src
📦 Output: /path/to/templates-dist

📦 Zipping civic...
☁️ Uploading civic.zip to Vercel Blob...
✅ civic: https://yourproj.public.blob.vercel-storage.com/civic.zip

📦 Zipping justice...
☁️ Uploading justice.zip to Vercel Blob...
✅ justice: https://yourproj.public.blob.vercel-storage.com/justice.zip

📋 Template Map Generated: /path/to/templates-dist/template-map.json
☁️ Uploading template-map.json to Vercel Blob...
✅ Template Map: https://yourproj.public.blob.vercel-storage.com/template-map.json

🎉 Publishing complete!
```

## Template Map

The generated `template-map.json`:

```json
{
  "generatedAt": "2025-01-01T12:00:00.000Z",
  "templates": {
    "civic": "https://yourproj.public.blob.vercel-storage.com/civic.zip",
    "justice": "https://yourproj.public.blob.vercel-storage.com/justice.zip",
    "edu": "https://yourproj.public.blob.vercel-storage.com/edu.zip",
    "health": "https://yourproj.public.blob.vercel-storage.com/health.zip"
  },
  "count": 4,
  "mapUrl": "https://yourproj.public.blob.vercel-storage.com/template-map.json"
}
```

## Download API Integration

The `/api/download` route automatically:

1. **Fetches** the latest template map from blob storage
2. **Redirects** to the appropriate template URL
3. **Falls back** to static URLs if blob fetch fails
4. **Caches** the template map for 5 minutes

## Template Requirements

Each template should include:

### Required Files
- `package.json` - Dependencies and scripts
- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind with preset variables
- `prisma/schema.prisma` - Database schema
- `src/app/` - Next.js App Router pages
- `src/components/` - React components
- `src/lib/` - Utilities and theme generation
- `public/` - Static assets including `quick-deploy.html`
- `docs/deploy.md` - Deployment instructions
- `.env.example` - Environment variables template
- `README.md` - Setup instructions
- `vercel.json` - Vercel deployment config

### Optional Files
- `public/quick-deploy.html` - One-page deployment guide
- `docs/` - Additional documentation
- `scripts/` - Custom build scripts

## Deployment Documentation

Each template includes comprehensive deployment docs:

### `/docs/deploy.md`
- Complete step-by-step deployment guide
- GitHub account creation
- Vercel deployment
- Domain customization
- Authentication setup

### `/public/quick-deploy.html`
- Single-page deployment guide
- Browser-only workflow
- Print-friendly format
- Direct links to GitHub and Vercel

## Workflow Benefits

### For Maintainers
- **One Command**: `npm run publish-templates` updates everything
- **Automatic**: No manual URL management
- **Versioned**: Each publish generates new URLs
- **Cached**: Template map cached for performance

### For Users
- **Always Fresh**: Downloads latest template versions
- **Fast**: Blob storage provides quick downloads
- **Reliable**: Fallback URLs ensure availability
- **Documented**: Every template includes deployment guides

## Troubleshooting

### Common Issues

1. **Vercel CLI Not Found**
   ```bash
   npm i -D vercel
   ```

2. **Permission Denied**
   ```bash
   # Make sure you're logged into Vercel
   npx vercel login
   ```

3. **Template Not Found**
   ```bash
   # Check templates-src directory exists
   ls templates-src/
   ```

4. **Upload Failed**
   ```bash
   # Check Vercel project settings
   npx vercel project ls
   ```

### Debug Mode

Add `--debug` flag to see detailed output:

```bash
npx vercel blob put template.zip --public --debug
```

## Future Enhancements

- **Template Versioning**: Semantic versioning for templates
- **Differential Updates**: Only upload changed files
- **CDN Integration**: Global distribution
- **Analytics**: Download tracking and metrics
- **Template Validation**: Automated testing before publish
