# Template Development Guide

This guide explains how to refine individual templates locally before combining them for Vercel deployment.

## 🚀 Quick Start

1. **Seed Template Data**
   ```bash
   npm run db:seed-templates
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Switch Templates**
   - Look for the "Template Preview" widget in the top-right corner
   - Click any template to switch between CivicLabs, JusticeLabs, EduLabs, and HealthLabs
   - Each template shows realistic data and working links

## 🔧 Template Development Workflow

### 1. Individual Template Refinement

Each template has its own:
- **Organization branding** (colors, logos, preset styling)
- **Sample challenges** with realistic content
- **Working navigation** and links
- **Template-specific features**

### 2. Template Switching System

The `TemplateSwitcher` component (development only):
- Appears in top-right corner during development
- Switches between all 4 template configurations
- Persists selection in localStorage
- Reloads page to apply template-specific changes

### 3. Template Configurations

Located in `src/lib/template-configs.ts`:
- **CivicLabs**: City government challenges (Lake Cleanup, Crosswalks, Lighting)
- **JusticeLabs**: Law enforcement cases (Cold Cases, Missing Persons, Safety)
- **EduLabs**: Educational challenges (EdTech, Sustainability, Mental Health)
- **HealthLabs**: Health department initiatives (Telehealth, Outreach, Resources)

### 4. Realistic Data

Each template includes:
- **Organization details** (name, branding, preset)
- **Sample challenges** with full descriptions
- **Working links** to challenge detail pages
- **Template-specific navigation** and content

## 📁 File Structure

```
src/
├── lib/
│   ├── template-configs.ts     # Template configurations
│   └── lab-report.ts          # Report generation
├── components/
│   ├── TemplateSwitcher.tsx   # Development template switcher
│   ├── LabCollaboration.tsx   # Collaboration features
│   └── ContributionModal.tsx  # Contribution submission
├── app/
│   ├── page.tsx               # Template-aware homepage
│   ├── browse/page.tsx        # Template-aware browse page
│   └── labs/[slug]/page.tsx   # Template-aware lab details
└── scripts/
    └── seed-templates.ts      # Template data seeding
```

## 🎯 Development Process

### Step 1: Choose Template
Use the Template Switcher to select which template to refine:
- **CivicLabs** - City government focus
- **JusticeLabs** - Law enforcement focus  
- **EduLabs** - Educational focus
- **HealthLabs** - Health department focus

### Step 2: Refine Content
- Edit `template-configs.ts` to update sample challenges
- Modify template-specific content and descriptions
- Test navigation and links work correctly
- Verify collaboration features function properly

### Step 3: Test Features
- Submit contributions and test voting
- Test Lab closure and report generation
- Verify template-specific styling and branding
- Check responsive design across devices

### Step 4: Iterate
- Switch between templates to compare
- Refine individual template experiences
- Ensure universal features work across all templates
- Test edge cases and error handling

## 🔄 Template-Specific Features

### CivicLabs
- Community challenges and civic projects
- City government branding and terminology
- Public works and infrastructure focus

### JusticeLabs  
- Cold case management and community reporting
- Law enforcement branding and terminology
- Crisis modes and secure tip forms

### EduLabs
- Student innovation and research challenges
- Educational institution branding
- Accessibility and inclusion focus

### HealthLabs
- Health improvement and community wellness
- Health department branding and terminology
- Telehealth and digital health focus

## 📊 Database Seeding

The `seed-templates.ts` script creates:
- 4 organizations (one per template)
- 5+ sample labs across different categories
- Template-specific branding and themes
- Realistic content and deadlines

## 🚀 Deployment Preparation

Once templates are refined:
1. **Test all templates** thoroughly
2. **Verify collaboration features** work correctly
3. **Check responsive design** across devices
4. **Validate content** and links
5. **Prepare for Vercel deployment**

## 💡 Tips

- **Use the Template Switcher** frequently to compare experiences
- **Test collaboration features** with realistic data
- **Verify links work** between pages
- **Check responsive design** on mobile devices
- **Test edge cases** like empty states and errors

This development workflow ensures each template is polished and functional before deployment!
