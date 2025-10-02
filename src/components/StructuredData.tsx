import React from 'react';

interface StructuredDataProps {
  data: object;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 2)
      }}
    />
  );
}

// Breadcrumb structured data
export function BreadcrumbStructuredData({ items }: { items: Array<{ name: string; url: string }> }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://labsforamerica.org'}${item.url}`
    }))
  };

  return <StructuredData data={structuredData} />;
}

// FAQ structured data
export function FAQStructuredData({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return <StructuredData data={structuredData} />;
}

// Article structured data for blog posts or detailed content
export function ArticleStructuredData({
  title,
  description,
  author,
  publishDate,
  modifiedDate,
  url,
  image
}: {
  title: string;
  description: string;
  author: string;
  publishDate: string;
  modifiedDate?: string;
  url: string;
  image?: string;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: {
      '@type': 'Person',
      name: author
    },
    publisher: {
      '@type': 'Organization',
      name: 'LabsForAmerica',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://labsforamerica.org'}/lfa-logo.png`
      }
    },
    datePublished: publishDate,
    dateModified: modifiedDate || publishDate,
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://labsforamerica.org'}${url}`,
    ...(image && {
      image: {
        '@type': 'ImageObject',
        url: image.startsWith('http') ? image : `${process.env.NEXT_PUBLIC_BASE_URL || 'https://labsforamerica.org'}${image}`
      }
    })
  };

  return <StructuredData data={structuredData} />;
}

// Software Application structured data
export function SoftwareApplicationStructuredData({
  name,
  description,
  applicationCategory,
  operatingSystem,
  url,
  screenshot
}: {
  name: string;
  description: string;
  applicationCategory: string;
  operatingSystem: string;
  url: string;
  screenshot?: string;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    applicationCategory,
    operatingSystem,
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://labsforamerica.org'}${url}`,
    ...(screenshot && {
      screenshot: {
        '@type': 'ImageObject',
        url: screenshot.startsWith('http') ? screenshot : `${process.env.NEXT_PUBLIC_BASE_URL || 'https://labsforamerica.org'}${screenshot}`
      }
    }),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    publisher: {
      '@type': 'Organization',
      name: 'LabsForAmerica'
    }
  };

  return <StructuredData data={structuredData} />;
}
