# CivicLabs / JusticeLabs Template

> Dear federal, state, and local public servants — please fork this and use it!

This project is MIT-licensed for maximum reuse. No warranty. Community contributions welcome.

## Overview

A template site for local governments and law enforcement agencies to create community-driven problem-solving platforms. Every city/county/PD gets a Labs template site with:

- **Auto-branded**: Drop their logo, auto-color scheme via AI color picker
- **Dashboard**: Add/remove Labs, set prize, deadline, description
- **Upload assets**: Images, PDFs, rules
- **Roles**: Civic vs law enforcement vs internal

## Example Use Cases

- **Local Police Dept**: Cold case Lab → upload redacted case docs, community submits leads/analysis
- **City Council**: Community Lab → residents propose & prototype lake cleanup ideas  
- **Public Works**: Traffic safety Lab → citizens test new intersection flow with VR simulation plugin

## Quick Start

1. **Clone and install**:
   ```bash
   git clone <your-fork>
   cd civiclabs
   npm install
   ```

2. **Set up environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

3. **Initialize database**:
   ```bash
   npx prisma migrate dev
   npx tsx scripts/seed.ts
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Open** http://localhost:3000

## Features

### Public Pages
- **Home**: Welcome page with featured Labs
- **Browse**: Search and filter Labs by category
- **Lab Detail**: Full Lab description with assets and collaborative canvas

### Admin Dashboard
- **Dashboard**: Overview of all Labs and organization settings
- **Lab Management**: Create, edit, and manage Labs
- **Organization**: Branding and theming settings

### Collaborative Features
- **Canvas**: Interactive drawing space for brainstorming
- **Assets**: Upload and share documents, images, PDFs
- **Categories**: Organize Labs by Civic, Justice, Health, etc.

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Prisma** with SQLite for database
- **React Hook Form** with Zod validation
- **MDX** for rich content

## Customization

### Branding
1. Update `NEXT_PUBLIC_APP_NAME` in `.env`
2. Replace logo in `/public/logo.png`
3. Modify colors in `src/lib/theme.ts`

### Categories
Edit the category options in:
- `src/app/browse/page.tsx` (filter sidebar)
- `src/components/LabForm.tsx` (form dropdown)

### Styling
All styling uses Tailwind CSS utility classes. Key files:
- `src/app/globals.css` - Global styles
- `src/components/Header.tsx` - Navigation
- `src/lib/theme.ts` - Color palette

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy

### Other Platforms
- **Railway**: Add `DATABASE_URL` environment variable
- **Netlify**: Use Netlify Functions for API routes
- **Self-hosted**: Use PostgreSQL instead of SQLite

## Forking for Different Use Cases

### CivicLabs (City/County)
- Focus on community engagement
- Categories: Civic, Health, Mobility, Energy
- Public participation emphasis

### JusticeLabs (Law Enforcement)
- Focus on case collaboration
- Categories: Cold Cases, Missing Persons, Community Tips
- Privacy and security considerations

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Documentation**: This README

---

**Note**: This is a template designed for maximum reusability. Customize it for your specific needs while maintaining the core civic engagement principles.