import { Metadata } from 'next';
import { TEMPLATE_CONFIGS, TemplateKey } from './template-configs';

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  twitterCard: 'summary' | 'summary_large_image' | 'app' | 'player';
  canonical: string;
  robots: 'index, follow' | 'noindex, nofollow' | 'index, nofollow' | 'noindex, follow';
  locale: string;
  alternateLocales?: string[];
}

export interface LabSEOData {
  title: string;
  description: string;
  category: string;
  deadline: string;
  prize: number;
  status: string;
  slug: string;
  isBeginner: boolean;
}

export interface TemplateSEOData {
  name: string;
  description: string;
  orgName: string;
  features: string[];
  preset: string;
}

// Generate comprehensive metadata for pages
export function generatePageMetadata({
  title,
  description,
  keywords = [],
  ogImage = '/images/og-default.png',
  canonical,
  robots = 'index, follow',
  locale = 'en_US',
  alternateLocales = []
}: Partial<SEOConfig>): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://labsforamerica.org';
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;
  
  return {
    title,
    description,
    keywords: keywords.join(', '),
    robots,
    alternates: {
      canonical: fullCanonical,
      languages: alternateLocales.reduce((acc, locale) => {
        acc[locale] = `${baseUrl}/${locale}${canonical || ''}`;
        return acc;
      }, {} as Record<string, string>)
    },
    openGraph: {
      title,
      description,
      url: fullCanonical,
      siteName: 'LabsForAmerica',
      images: [
        {
          url: ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title || 'LabsForAmerica - Civic Engagement Platform'
        }
      ],
      locale,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`],
      creator: '@labsforamerica',
      site: '@labsforamerica'
    },
    other: {
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:type': 'image/png',
      'twitter:image:alt': title || 'LabsForAmerica - Civic Engagement Platform'
    }
  };
}

// Generate metadata for Lab pages
export function generateLabMetadata(
  lab: LabSEOData,
  template: TemplateKey = 'civic'
): Metadata {
  const config = TEMPLATE_CONFIGS[template];
  const deadline = new Date(lab.deadline);
  const daysLeft = Math.ceil((deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  const title = `${lab.title} - ${config.name}`;
  const description = `${lab.description} Join ${config.orgName} in solving this community challenge. ${lab.isBeginner ? 'No experience required.' : ''} ${daysLeft > 0 ? `${daysLeft} days left.` : 'Deadline passed.'}`;
  
  const keywords = [
    'civic engagement',
    'community challenge',
    lab.category.toLowerCase(),
    config.orgName.toLowerCase(),
    'public participation',
    'civic innovation',
    'community solutions',
    'public policy',
    'government innovation',
    'civic technology'
  ];

  return generatePageMetadata({
    title,
    description,
    keywords,
    ogImage: `/images/og-lab-${lab.slug}.png`,
    canonical: `/labs/${lab.slug}`,
    robots: lab.status === 'closed' ? 'noindex, follow' : 'index, follow'
  });
}

// Generate metadata for template pages
export function generateTemplateMetadata(
  template: TemplateKey,
  templateData: TemplateSEOData
): Metadata {
  const title = `${templateData.name} - Free Civic Template`;
  const description = `${templateData.description} Download and deploy your own ${templateData.name} platform for ${templateData.orgName}. Free, open-source civic engagement template.`;
  
  const keywords = [
    'civic template',
    'government template',
    templateData.name.toLowerCase(),
    templateData.orgName.toLowerCase(),
    'civic engagement platform',
    'open source',
    'free template',
    'civic technology',
    'government innovation',
    'community platform'
  ];

  return generatePageMetadata({
    title,
    description,
    keywords,
    ogImage: `/images/og-template-${template}.png`,
    canonical: `/templates`
  });
}

// Generate metadata for browse page
export function generateBrowseMetadata(template: TemplateKey = 'civic'): Metadata {
  const config = TEMPLATE_CONFIGS[template];
  
  const title = `Browse Active Challenges - ${config.name}`;
  const description = `Explore current community challenges from ${config.orgName}. Join collaborative problem-solving and contribute your ideas to make a difference.`;
  
  const keywords = [
    'active challenges',
    'community challenges',
    'civic engagement',
    config.orgName.toLowerCase(),
    'public participation',
    'community solutions',
    'civic innovation',
    'open challenges'
  ];

  return generatePageMetadata({
    title,
    description,
    keywords,
    ogImage: `/images/og-browse-${template}.png`,
    canonical: '/browse'
  });
}

// Generate metadata for archive page
export function generateArchiveMetadata(template: TemplateKey = 'civic'): Metadata {
  const config = TEMPLATE_CONFIGS[template];
  
  const title = `Archive - Past Labs - ${config.name}`;
  const description = `Browse completed community challenges and their outcomes from ${config.orgName}. Learn from past solutions and see the impact of community collaboration.`;
  
  const keywords = [
    'completed challenges',
    'past labs',
    'archive',
    'community outcomes',
    config.orgName.toLowerCase(),
    'civic engagement results',
    'community impact',
    'completed projects'
  ];

  return generatePageMetadata({
    title,
    description,
    keywords,
    ogImage: `/images/og-archive-${template}.png`,
    canonical: '/archive'
  });
}

// Generate metadata for preview pages
export function generatePreviewMetadata(
  template: TemplateKey,
  templateData: TemplateSEOData
): Metadata {
  const title = `Preview ${templateData.name} - Live Demo`;
  const description = `See ${templateData.name} in action. Preview the features and functionality of this civic engagement platform designed for ${templateData.orgName}.`;
  
  const keywords = [
    'preview',
    'demo',
    templateData.name.toLowerCase(),
    templateData.orgName.toLowerCase(),
    'civic platform preview',
    'live demo',
    'civic engagement demo',
    'government platform preview'
  ];

  return generatePageMetadata({
    title,
    description,
    keywords,
    ogImage: `/images/og-preview-${template}.png`,
    canonical: `/preview/${template}`,
    robots: 'noindex, follow' // Preview pages shouldn't be indexed
  });
}

// Generate structured data for Labs
export function generateLabStructuredData(lab: LabSEOData, template: TemplateKey = 'civic') {
  const config = TEMPLATE_CONFIGS[template];
  const deadline = new Date(lab.deadline);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: lab.title,
    description: lab.description,
    startDate: new Date().toISOString(),
    endDate: deadline.toISOString(),
    location: {
      '@type': 'VirtualLocation',
      name: `${config.name} Platform`,
      url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://labsforamerica.org'}/labs/${lab.slug}`
    },
    organizer: {
      '@type': 'Organization',
      name: config.orgName,
      url: config.orgUrl
    },
    offers: lab.prize > 0 ? {
      '@type': 'Offer',
      price: lab.prize,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    } : {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    audience: {
      '@type': 'Audience',
      audienceType: lab.isBeginner ? 'General Public' : 'Experts and Professionals'
    },
    keywords: lab.category,
    eventStatus: lab.status === 'open' ? 'https://schema.org/EventScheduled' : 'https://schema.org/EventPostponed'
  };
}

// Generate structured data for organization
export function generateOrganizationStructuredData(template: TemplateKey = 'civic') {
  const config = TEMPLATE_CONFIGS[template];
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.orgName,
    description: config.description,
    url: config.orgUrl,
    logo: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://labsforamerica.org'}/images/logo-${template}.png`,
    sameAs: [
      config.orgUrl,
      `${process.env.NEXT_PUBLIC_BASE_URL || 'https://labsforamerica.org'}/templates`
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'General Inquiry',
      url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://labsforamerica.org'}/contact`
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States'
    },
    knowsAbout: [
      'Civic Engagement',
      'Community Development',
      'Public Policy',
      'Government Innovation',
      'Civic Technology'
    ]
  };
}

// Generate structured data for website
export function generateWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'LabsForAmerica',
    description: 'Free, open-source civic engagement platforms for communities',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://labsforamerica.org',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://labsforamerica.org'}/browse?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      name: 'LabsForAmerica',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://labsforamerica.org'}/lfa-logo.png`
      }
    }
  };
}
