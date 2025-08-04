import React from 'react';
import { Helmet } from 'react-helmet';

export const SEOHelmet = ({ 
  title = "Gerador de Currículos com IA - Crie seu CV Profissional",
  description = "Crie currículos profissionais para tecnologia usando inteligência artificial. Gerador gratuito, rápido e otimizado para recrutadores tech.",
  keywords = "currículo, CV, tecnologia, programador, desenvolvedor, IA, gerador de currículo, inteligência artificial, ATS",
  url = "https://geradordecurriculosai.com/",
  image = "https://geradordecurriculosai.com/og-image.jpg",
  type = "website",
  structuredData = null,
  noIndex = false
}) => {
  const canonical = url.endsWith('/') ? url : `${url}/`;
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content="Gerador de Currículos IA" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="author" content="Gerador de Currículos IA" />
      <meta name="language" content="pt-BR" />
      <meta name="google-adsense-account" content="ca-pub-4789090074866563" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

// Predefined structured data schemas
export const createServiceSchema = (serviceName, description, price = "0") => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": serviceName,
  "description": description,
  "provider": {
    "@type": "Organization",
    "name": "Gerador de Currículos IA",
    "url": "https://geradordecurriculosai.com"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Brazil"
  },
  "offers": {
    "@type": "Offer",
    "price": price,
    "priceCurrency": "BRL"
  }
});

export const createArticleSchema = (title, description, datePublished, dateModified) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": title,
  "description": description,
  "author": {
    "@type": "Organization",
    "name": "Gerador de Currículos IA"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Gerador de Currículos IA"
  },
  "datePublished": datePublished,
  "dateModified": dateModified || datePublished
});

export const createBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export default SEOHelmet;