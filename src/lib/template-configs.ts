// Template-specific seed data and configurations
export const TEMPLATE_CONFIGS = {
  civic: {
    name: "CivicLabs",
    orgName: "City of Springfield",
    orgSlug: "springfield",
    preset: "CITY",
    primaryHex: "#2563EB",
    description: "Community challenges and civic engagement for cities and towns",
    sampleLabs: [
      {
        title: "Lake Cleanup Concepts",
        category: "Public Works",
        summary: "We need innovative ideas for cleaning up Lake Springfield while preserving wildlife habitat.",
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
        deadline: "2024-04-30T00:00:00Z",
        status: "open",
        isBeginner: true,
        slug: "lake-cleanup-concepts"
      },
      {
        title: "Safer Crosswalks Initiative",
        category: "Transportation", 
        summary: "Design safer pedestrian crossings for our downtown area.",
        bodyMd: `## Challenge Overview

Downtown Springfield needs safer pedestrian crossings. We want community input on design and placement.

## Focus Areas
- High-traffic intersections
- School zone crossings
- Accessibility compliance
- Visual design elements`,
        prize: 2000,
        deadline: "2024-06-01T00:00:00Z",
        status: "open",
        isBeginner: false,
        slug: "safer-crosswalks"
      },
      {
        title: "Smart Lighting Initiative",
        category: "Infrastructure",
        summary: "Modernize street lighting with energy-efficient, smart technology.",
        bodyMd: `## Challenge Overview

Upgrade our street lighting system with smart, energy-efficient technology.

## Goals
- Reduce energy consumption
- Improve safety
- Smart monitoring capabilities
- Community input on placement`,
        prize: 3000,
        deadline: "2024-05-15T00:00:00Z",
        status: "upcoming",
        isBeginner: false,
        slug: "smart-lighting"
      }
    ]
  },
  
  justice: {
    name: "JusticeLabs",
    orgName: "Springfield Police Department",
    orgSlug: "springfield-pd",
    preset: "PD",
    primaryHex: "#1E40AF",
    description: "Cold case management and community reporting for law enforcement",
    sampleLabs: [
      {
        title: "Unidentified Person 2009-A",
        category: "Cold Case",
        summary: "Help us identify this person found in 2009. Any information could help bring closure to a family.",
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
        deadline: "2025-12-31T00:00:00Z",
        status: "open",
        isBeginner: false,
        slug: "unidentified-person-2009"
      },
      {
        title: "Missing Person: Sarah Chen",
        category: "Active Case",
        summary: "Sarah Chen, 28, was last seen on March 10th. We need community help to locate her.",
        bodyMd: `## Missing Person Details

**Name:** Sarah Chen  
**Age:** 28  
**Last Seen:** March 10, 2024  
**Last Location:** Downtown Springfield  
**Height:** 5'4"  
**Hair:** Black, shoulder length

## What We Need
- Any sightings or information
- Digital forensics assistance
- Community awareness
- Pattern analysis`,
        prize: 0,
        deadline: "2025-12-31T00:00:00Z",
        status: "open",
        isBeginner: false,
        slug: "missing-sarah-chen"
      },
      {
        title: "Community Safety Initiative",
        category: "Prevention",
        summary: "Help us design better community safety programs.",
        bodyMd: `## Challenge Overview

We want to improve community safety through better programs and outreach.

## Focus Areas
- Neighborhood watch programs
- Youth engagement
- Crime prevention education
- Community-police relations`,
        prize: 1000,
        deadline: "2024-05-30T00:00:00Z",
        status: "open",
        isBeginner: true,
        slug: "community-safety"
      }
    ]
  },

  edu: {
    name: "EduLabs",
    orgName: "Springfield School District",
    orgSlug: "springfield-schools",
    preset: "CITY",
    primaryHex: "#059669",
    description: "Student innovation and research challenges for all school types and universities",
    sampleLabs: [
      {
        title: "Accessible EdTech Challenge",
        category: "Innovation",
        summary: "Design educational technology that works for students with disabilities.",
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
        deadline: "2024-04-25T00:00:00Z",
        status: "open",
        isBeginner: true,
        slug: "accessible-edtech"
      },
      {
        title: "Campus Sustainability",
        category: "Research",
        summary: "Develop sustainable practices for our school campus.",
        bodyMd: `## Challenge Overview

Make our campus more environmentally sustainable.

## Focus Areas
- Energy efficiency
- Waste reduction
- Water conservation
- Student engagement

## Resources
- Campus facilities access
- Environmental data
- Student research support`,
        prize: 1500,
        deadline: "2024-05-20T00:00:00Z",
        status: "open",
        isBeginner: false,
        slug: "campus-sustainability"
      },
      {
        title: "Student Mental Health App",
        category: "Technology",
        summary: "Create an app to support student mental health and wellness.",
        bodyMd: `## Challenge Overview

Design a mobile app to support student mental health.

## Features Needed
- Mood tracking
- Resource connections
- Peer support
- Crisis intervention

## Considerations
- Privacy protection
- Professional oversight
- Accessibility
- Scalability`,
        prize: 3000,
        deadline: "2024-06-10T00:00:00Z",
        status: "upcoming",
        isBeginner: false,
        slug: "mental-health-app"
      }
    ]
  },

  health: {
    name: "HealthLabs",
    orgName: "Springfield Health Department",
    orgSlug: "springfield-health",
    preset: "FIRE",
    primaryHex: "#DC2626",
    description: "Health improvement challenges and community wellness initiatives",
    sampleLabs: [
      {
        title: "Telehealth Innovation",
        category: "Digital Health",
        summary: "Improve telehealth access for underserved communities.",
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
        deadline: "2024-05-05T00:00:00Z",
        status: "open",
        isBeginner: false,
        slug: "telehealth-innovation"
      },
      {
        title: "Community Health Outreach",
        category: "Prevention",
        summary: "Design better health outreach programs for our community.",
        bodyMd: `## Challenge Overview

Improve community health through better outreach programs.

## Focus Areas
- Preventive care
- Health education
- Community partnerships
- Cultural sensitivity

## Target Populations
- Seniors
- Families with children
- Non-English speakers
- Low-income residents`,
        prize: 2000,
        deadline: new Date("2024-04-30"),
        status: "open",
        isBeginner: true,
        slug: "health-outreach"
      },
      {
        title: "Mental Health Resources",
        category: "Wellness",
        summary: "Create better mental health resources for our community.",
        bodyMd: `## Challenge Overview

Develop comprehensive mental health resources for Springfield.

## Resource Types
- Crisis intervention
- Support groups
- Educational materials
- Professional referrals

## Community Needs
- Reduced stigma
- Increased awareness
- Better access
- Cultural competence`,
        prize: 3500,
        deadline: "2024-06-15T00:00:00Z",
        status: "upcoming",
        isBeginner: false,
        slug: "mental-health-resources"
      }
    ]
  }
};

export type TemplateKey = keyof typeof TEMPLATE_CONFIGS;
