# Template Bundle Structure

This directory contains the template bundles that users can download from the Templates Hub.

## Structure

Each template bundle is a complete Next.js application with:

- **Core Labs Engine**: The shared Labs.gov clone + Collab Canvas
- **Agency-Specific Preset**: Pre-configured styling and features
- **Brand Integration**: Logo upload and theme generation ready
- **Deployment Ready**: Vercel configuration included

## Template Types

### civic.zip - CivicLabs Template
- **Preset**: CITY (community-friendly, rounded borders)
- **Features**: Community challenges, civic projects, open calls
- **Target**: City councils, community organizations
- **Styling**: Welcoming, accessible, community-focused

### justice.zip - JusticeLabs Template  
- **Preset**: PD (authoritative, square borders)
- **Features**: Cold case vault, crisis modes, community reporting
- **Target**: Police departments, sheriff offices, law enforcement
- **Styling**: Professional, authoritative, command presence

### edu.zip - EduLabs Template
- **Preset**: CITY (student-friendly, rounded borders) 
- **Features**: Student innovation, hackathons, research Labs
- **Target**: Schools, universities, educational institutions
- **Styling**: Engaging, academic, innovation-focused

### health.zip - HealthLabs Template
- **Preset**: FIRE (emergency-ready, warm colors)
- **Features**: Health challenges, access improvement, community health
- **Target**: Hospitals, health agencies, public health departments
- **Styling**: Urgent but helpful, emergency response ready

## Bundle Contents

Each zip file contains:

```
template-name/
├── package.json          # Dependencies and scripts
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind with preset variables
├── prisma/
│   └── schema.prisma     # Database schema
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── lib/              # Utilities and theme generation
│   └── styles/           # CSS and styling
├── public/               # Static assets
├── .env.example          # Environment variables template
├── README.md             # Setup instructions
└── vercel.json           # Vercel deployment config
```

## Deployment Options

### Option 1: Download & Self-Host
1. User downloads template zip
2. Extracts and runs `npm install`
3. Sets up environment variables
4. Runs `npm run dev` locally
5. Deploys to their preferred hosting

### Option 2: Deploy to Vercel
1. User clicks "Deploy to Vercel" button
2. Redirects to Vercel with template GitHub repo
3. One-click deployment to their Vercel account
4. Automatic environment setup
5. Live site in under 2 minutes

## Brand Customization

Each template includes:

- **Logo Upload**: Automatic color palette extraction
- **Theme Generation**: WCAG-compliant color schemes
- **Preset Application**: Agency-specific styling
- **Live Preview**: Real-time theme updates
- **CSS Variables**: Dynamic theming system

## Future Enhancements

- **Template Variants**: Additional presets and styling options
- **Custom Features**: Agency-specific functionality modules
- **Integration APIs**: Third-party service connections
- **Analytics Dashboard**: Usage and engagement metrics
- **Multi-language Support**: Internationalization ready

## Maintenance

Templates are updated regularly with:
- Security patches
- Feature enhancements  
- Bug fixes
- New agency presets
- Improved accessibility
- Performance optimizations
