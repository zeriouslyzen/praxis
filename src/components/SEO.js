import React from 'react';
import { Helmet } from 'react-helmet';

// SEO Component for dynamic meta tags
export const SEO = ({ 
  title = "PRAXIS - Advanced Research Intelligence Platform",
  description = "Research-driven development platform for advanced algorithms and computational systems. Autonomous research systems that operate continuously, generating breakthrough insights across multiple scientific domains.",
  keywords = "AI research, autonomous research, machine learning, quantum computing, scientific discovery, research platform, artificial intelligence, computational systems",
  image = "/og-image.jpg",
  url = "https://praxis-research.com",
  type = "website",
  structuredData = null
}) => {
  const fullTitle = title.includes('PRAXIS') ? title : `PRAXIS - ${title}`;
  const fullUrl = url.startsWith('http') ? url : `https://praxis-research.com${url}`;
  const fullImage = image.startsWith('http') ? image : `https://praxis-research.com${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="PRAXIS Research & Development" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content="PRAXIS" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImage} />
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
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
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
    "email": "research@praxis-research.com"
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
    structuredData: defaultStructuredData
  },
  research: {
    title: "Research Publications - PRAXIS",
    description: "Discover breakthrough research papers and publications generated through our autonomous research systems across multiple scientific domains including AI, quantum computing, and materials science.",
    keywords: "research papers, scientific publications, AI research, quantum computing research, materials science, autonomous research, scientific discovery",
    structuredData: defaultStructuredData
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
  }
};

// Hook to get page-specific SEO config
export const usePageSEO = (page) => {
  return pageSEOConfigs[page] || pageSEOConfigs.home;
};
