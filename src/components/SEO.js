import React from 'react';
import { Helmet } from 'react-helmet';

// SEO Component for dynamic meta tags
export const SEO = ({ 
  title = "PRAXIS - Advanced Research Intelligence Platform",
  description = "Research-driven development platform for advanced algorithms and computational systems. Autonomous research systems that operate continuously, generating breakthrough insights across multiple scientific domains.",
  keywords = "AI research, autonomous research, machine learning, quantum computing, scientific discovery, research platform, artificial intelligence, computational systems",
  image = "/images/praxis-share-card.svg",
  url = "https://praxis-research.com",
  type = "website",
  structuredData = null
}) => {
  const fullTitle = title.includes('PRAXIS') ? title : `PRAXIS - ${title}`;
  const fullUrl = url.startsWith('http') ? url : `https://praxis-research.com${url}`;
  const fullImage = image.startsWith('http') ? image : `https://praxis-research.com${image}`;
  const structuredDataGraph = Array.isArray(structuredData)
    ? { "@context": "https://schema.org", "@graph": structuredData }
    : structuredData;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="PRAXIS Research & Development" />
      <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
      <meta name="googlebot" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/svg+xml" />
      <meta property="og:image:alt" content="PRAXIS engineering intelligence platform preview" />
      <meta property="og:site_name" content="PRAXIS" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImage} />
      <meta property="twitter:image:alt" content="PRAXIS engineering intelligence platform preview" />
      <meta property="twitter:site" content="@PraxisResearch" />
      <meta property="twitter:creator" content="@PraxisResearch" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="PRAXIS" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Structured Data */}
      {structuredDataGraph && (
        <script type="application/ld+json">
          {JSON.stringify(structuredDataGraph)}
        </script>
      )}
    </Helmet>
  );
};

// Default structured data for the organization
export const defaultStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "PRAXIS Research & Development",
  "description": "Advanced research intelligence platform specializing in autonomous research systems, AI-driven scientific discovery, and computational innovation.",
  "url": "https://praxis-research.com",
  "logo": "https://praxis-research.com/logo.png",
  "foundingDate": "2024",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Research Inquiries",
    "email": "jack@praxislabs.technology"
  },
  "sameAs": [
    "https://twitter.com/PraxisResearch",
    "https://linkedin.com/company/praxis-research",
    "https://github.com/praxis-research"
  ],
  "knowsAbout": [
    "Artificial Intelligence",
    "Machine Learning",
    "Quantum Computing",
    "Scientific Research",
    "Autonomous Systems",
    "Computational Biology",
    "Materials Science",
    "Climate Science"
  ]
};

export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "PRAXIS",
  "url": "https://praxis-research.com",
  "description": "Electrical engineering-grade software, AI systems, and research-to-deployment platform.",
  "publisher": {
    "@type": "Organization",
    "name": "PRAXIS Research & Development",
    "url": "https://praxis-research.com"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://praxis-research.com/research?query={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export const homePageStructuredData = [
  defaultStructuredData,
  websiteStructuredData,
  {
    "@type": "WebPage",
    "name": "PRAXIS - Advanced Research Intelligence Platform",
    "url": "https://praxis-research.com/",
    "isPartOf": {
      "@type": "WebSite",
      "name": "PRAXIS",
      "url": "https://praxis-research.com"
    },
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "url": "https://praxis-research.com/images/praxis-share-card.svg"
    }
  }
];

// Research paper structured data
export const researchPaperStructuredData = (paper) => ({
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  "headline": paper.title,
  "description": paper.abstract,
  "author": {
    "@type": "Organization",
    "name": paper.authors
  },
  "publisher": {
    "@type": "Organization",
    "name": "PRAXIS Research & Development"
  },
  "datePublished": paper.year,
  "about": {
    "@type": "Thing",
    "name": paper.domain
  },
  "isPartOf": {
    "@type": "Periodical",
    "name": "PRAXIS Research Publications"
  }
});

// Software application structured data
export const softwareStructuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "PRAXIS Research Platform",
  "description": "Advanced autonomous research system for scientific discovery and computational innovation",
  "applicationCategory": "Research Software",
  "operatingSystem": "Web-based",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "150"
  }
};

// Breadcrumb structured data
export const breadcrumbStructuredData = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

// FAQ structured data
export const faqStructuredData = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// Page-specific SEO configurations
export const pageSEOConfigs = {
  home: {
    title: "PRAXIS - Advanced Research Intelligence Platform",
    description: "Research-driven development platform for advanced algorithms and computational systems. Autonomous research systems that operate continuously, generating breakthrough insights across multiple scientific domains.",
    keywords: "AI research, autonomous research, machine learning, quantum computing, scientific discovery, research platform, artificial intelligence, computational systems",
    structuredData: homePageStructuredData
  },
  research: {
    title: "Research Publications - PRAXIS",
    description: "Discover documented research papers and technical records from our autonomous research systems across multiple scientific domains including AI, quantum computing, and materials science.",
    keywords: "research papers, technical records, AI research, quantum computing research, materials science, autonomous research, scientific discovery",
    structuredData: defaultStructuredData
  },
  engineering: {
    title: "Engineering Systems - PRAXIS",
    description: "Engineering-grade software architecture, deterministic validation workflows, telemetry integration, and local-first AI systems for mission-critical operations.",
    keywords: "engineering software systems, deterministic validation, local-first AI, telemetry integration, hardware software integration, praxis engineering",
    structuredData: [
      defaultStructuredData,
      {
        "@type": "WebPage",
        "name": "Engineering Systems - PRAXIS",
        "url": "https://praxis-research.com/engineering",
        "description": "Technical engineering capabilities and system architecture from PRAXIS."
      }
    ]
  },
  about: {
    title: "About PRAXIS - Research Intelligence",
    description: "Learn about PRAXIS Research & Development, our mission to advance scientific discovery through autonomous research systems and cutting-edge computational intelligence.",
    keywords: "about praxis, research company, AI research team, scientific innovation, autonomous systems, computational intelligence",
    structuredData: defaultStructuredData
  },
  services: {
    title: "Research Services - PRAXIS",
    description: "Comprehensive research services including algorithm research, development platforms, and innovation labs. Advanced tools for research and development challenges.",
    keywords: "research services, algorithm research, development platform, innovation lab, research tools, scientific consulting",
    structuredData: defaultStructuredData
  },
  demo: {
    title: "Demo Environment - PRAXIS",
    description: "Interactive PRAXIS demonstration environment for AI-assisted engineering workflows, system previews, and platform capabilities.",
    keywords: "praxis demo, ai demo, engineering assistant demo, platform preview, interactive research tools",
    structuredData: [
      defaultStructuredData,
      {
        "@type": "WebPage",
        "name": "Demo Environment - PRAXIS",
        "url": "https://praxis-research.com/demo",
        "description": "Interactive preview environment for PRAXIS platform capabilities."
      },
      {
        "@type": "SoftwareApplication",
        "name": "PRAXIS Demo Environment",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "url": "https://praxis-research.com/demo"
      }
    ]
  },
  'algorithm-research': {
    title: "Algorithm Research - PRAXIS",
    description: "Applied algorithm engineering for optimization, intelligence systems, and measurable performance outcomes across production environments.",
    keywords: "algorithm research, optimization systems, applied ai engineering, performance engineering",
    structuredData: defaultStructuredData
  },
  'development-platform': {
    title: "Development Platform - PRAXIS",
    description: "High-performance development platform for distributed workloads, analytics, and operational software delivery.",
    keywords: "development platform, distributed processing, real-time analytics, software delivery systems",
    structuredData: defaultStructuredData
  },
  'innovation-lab': {
    title: "Innovation Lab - PRAXIS",
    description: "R&D execution layer for prototype validation, product feasibility, and frontier engineering programs.",
    keywords: "innovation lab, research and development, prototype engineering, product feasibility",
    structuredData: defaultStructuredData
  },
  'small-business': {
    title: "Small Business · Engineering Pathway - PRAXIS",
    description:
      "Engineering partner for startups and SMBs: POS and commercial systems, marketing software, web from landing to product, environmental and health-sector builds, privacy-first custom AI, LLMs, agents, and long-term innovation support.",
    keywords:
      "POS software integration, retail systems SMB, marketing software development, custom AI SMB, LLM fine-tuning, AI agents business, privacy first AI, environmental technology software, agriculture technology, energy software, PRAXIS",
    structuredData: [
      defaultStructuredData,
      {
        "@type": "WebPage",
        "name": "Small Business Engineering Pathway - PRAXIS",
        "url": "https://praxis-research.com/small-business",
        "description": "Engineering pathway for small businesses: software systems, hardware integration, and privacy-first AI delivery."
      },
      {
        "@type": "Service",
        "serviceType": "Small Business Engineering and AI Integration",
        "provider": {
          "@type": "Organization",
          "name": "PRAXIS Research & Development",
          "url": "https://praxis-research.com"
        },
        "areaServed": "Global",
        "offers": {
          "@type": "Offer",
          "url": "https://praxis-research.com/demo"
        }
      }
    ]
  }
};

// Hook to get page-specific SEO config
export const usePageSEO = (page) => {
  return pageSEOConfigs[page] || pageSEOConfigs.home;
};

export const getPageKeyFromPath = (pathname = '/') => {
  const path = pathname.toLowerCase();
  if (path === '/') return 'home';
  if (path === '/research' || path.startsWith('/research/')) return 'research';
  if (path === '/engineering') return 'engineering';
  if (path === '/about') return 'about';
  if (path === '/services') return 'services';
  if (path === '/demo') return 'demo';
  if (path === '/algorithm-research') return 'algorithm-research';
  if (path === '/development-platform') return 'development-platform';
  if (path === '/innovation-lab') return 'innovation-lab';
  if (path === '/small-business') return 'small-business';
  return 'home';
};
