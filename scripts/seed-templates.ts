import { PrismaClient, Preset } from '@prisma/client';

const prisma = new PrismaClient();

async function seedTemplateData() {
  console.log('🌱 Seeding template data...');

  // Clear existing data
  await prisma.contributionVote.deleteMany();
  await prisma.contribution.deleteMany();
  await prisma.asset.deleteMany();
  await prisma.lab.deleteMany();
  await prisma.chatMessage.deleteMany();
  await prisma.org.deleteMany();

  // Create organizations for each template
  const orgs = [
    {
      slug: 'springfield',
      name: 'City of Springfield',
      logoUrl: '/logo.png',
      primaryHex: '#2563EB',
      preset: Preset.CITY,
      themeJson: JSON.stringify({
        palette: ['#2563EB', '#10B981', '#F3F4F6'],
        theme: { brand: '#2563EB', brandInk: '#FFFFFF' },
        preset: 'CITY'
      })
    },
    {
      slug: 'springfield-pd',
      name: 'Springfield Police Department',
      logoUrl: '/logo.png',
      primaryHex: '#1E40AF',
      preset: Preset.PD,
      themeJson: JSON.stringify({
        palette: ['#1E40AF', '#DC2626', '#F3F4F6'],
        theme: { brand: '#1E40AF', brandInk: '#FFFFFF' },
        preset: 'PD'
      })
    },
    {
      slug: 'springfield-schools',
      name: 'Springfield School District',
      logoUrl: '/logo.png',
      primaryHex: '#059669',
      preset: Preset.CITY,
      themeJson: JSON.stringify({
        palette: ['#059669', '#10B981', '#F3F4F6'],
        theme: { brand: '#059669', brandInk: '#FFFFFF' },
        preset: 'CITY'
      })
    },
    {
      slug: 'springfield-health',
      name: 'Springfield Health Department',
      logoUrl: '/logo.png',
      primaryHex: '#DC2626',
      preset: Preset.FIRE,
      themeJson: JSON.stringify({
        palette: ['#DC2626', '#F59E0B', '#F3F4F6'],
        theme: { brand: '#DC2626', brandInk: '#FFFFFF' },
        preset: 'FIRE'
      })
    }
  ];

  for (const orgData of orgs) {
    await prisma.org.create({ data: orgData });
  }

  // Create sample labs for each organization
  const labs = [
    // CivicLabs
    {
      orgSlug: 'springfield',
      title: 'Lake Cleanup Concepts',
      slug: 'lake-cleanup-concepts',
      category: 'Public Works',
      summary: 'We need innovative ideas for cleaning up Lake Springfield while preserving wildlife habitat.',
      bodyMd: `## Challenge Overview

Lake Springfield has been experiencing water quality issues due to runoff and debris. We're looking for community-driven solutions that balance environmental protection with recreational use.

## What We're Looking For
- Sustainable cleanup methods
- Community engagement strategies  
- Cost-effective solutions
- Long-term maintenance plans

## Resources Available
- $5,000 prize pool
- City equipment access
- Environmental consultant support
- Community volunteer coordination`,
      prize: 5000,
      deadline: new Date('2024-04-30'),
      status: 'open',
      isBeginner: true
    },
    {
      orgSlug: 'springfield',
      title: 'Safer Crosswalks Initiative',
      slug: 'safer-crosswalks',
      category: 'Transportation',
      summary: 'Design safer pedestrian crossings for our downtown area.',
      bodyMd: `## Challenge Overview

Downtown Springfield needs safer pedestrian crossings. We want community input on design and placement.

## Focus Areas
- High-traffic intersections
- School zone crossings
- Accessibility compliance
- Visual design elements`,
      prize: 2000,
      deadline: new Date('2024-06-01'),
      status: 'open',
      isBeginner: false
    },
    // JusticeLabs
    {
      orgSlug: 'springfield-pd',
      title: 'Unidentified Person 2009-A',
      slug: 'unidentified-person-2009',
      category: 'Cold Case',
      summary: 'Help us identify this person found in 2009. Any information could help bring closure to a family.',
      bodyMd: `## Case Details

**Date Found:** March 15, 2009  
**Location:** Springfield River Trail  
**Age Estimate:** 25-35 years  
**Height:** 5'8" - 5'10"

## What We Need
- Any information about this person
- Similar cases or patterns
- Community memories from 2009
- Forensic analysis suggestions

## Confidential Reporting
Use our secure tip form for sensitive information.`,
      prize: 0,
      deadline: new Date('2025-12-31'),
      status: 'open',
      isBeginner: false
    },
    // EduLabs
    {
      orgSlug: 'springfield-schools',
      title: 'Accessible EdTech Challenge',
      slug: 'accessible-edtech',
      category: 'Innovation',
      summary: 'Design educational technology that works for students with disabilities.',
      bodyMd: `## Challenge Overview

Create educational technology solutions that are accessible to all students.

## Requirements
- Screen reader compatibility
- Keyboard navigation
- Visual accessibility
- Cost-effective solutions

## Target Users
- Students with visual impairments
- Students with motor disabilities
- Students with learning differences`,
      prize: 2500,
      deadline: new Date('2024-04-25'),
      status: 'open',
      isBeginner: true
    },
    // HealthLabs
    {
      orgSlug: 'springfield-health',
      title: 'Telehealth Innovation',
      slug: 'telehealth-innovation',
      category: 'Digital Health',
      summary: 'Improve telehealth access for underserved communities.',
      bodyMd: `## Challenge Overview

Expand telehealth services to reach underserved populations.

## Barriers to Address
- Digital literacy gaps
- Technology access
- Language barriers
- Cultural considerations

## Goals
- Increase access to care
- Reduce health disparities
- Improve health outcomes
- Community engagement`,
      prize: 4000,
      deadline: new Date('2024-05-05'),
      status: 'open',
      isBeginner: false
    }
  ];

  for (const labData of labs) {
    const org = await prisma.org.findUnique({ where: { slug: labData.orgSlug } });
    if (org) {
      await prisma.lab.create({
        data: {
          orgId: org.id,
          title: labData.title,
          slug: labData.slug,
          category: labData.category,
          summary: labData.summary,
          bodyMd: labData.bodyMd,
          prize: labData.prize,
          deadline: labData.deadline,
          status: labData.status,
          isBeginner: labData.isBeginner
        }
      });
    }
  }

  console.log('✅ Template data seeded successfully!');
  console.log('📊 Created:');
  console.log('  - 4 organizations (Civic, Justice, Edu, Health)');
  console.log('  - 5 sample labs across different categories');
  console.log('  - Template-specific branding and themes');
}

seedTemplateData()
  .catch((e) => {
    console.error('❌ Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
