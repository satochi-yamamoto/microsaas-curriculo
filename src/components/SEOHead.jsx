import React from 'react';
import { Helmet } from 'react-helmet';

export function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = "website",
  jsonLd,
  noindex = false
}) {
  const defaultTitle = "Gerador de Currículos com IA Grátis | Crie CV Profissional para Tecnologia";
  const defaultDescription = "Crie currículos profissionais para área de tecnologia usando inteligência artificial. Gerador gratuito, rápido e otimizado para ATS.";
  const defaultKeywords = "gerador de currículo, currículo online, CV tecnologia, currículo programador, currículo desenvolvedor, currículo IA";
  
  const siteUrl = "https://curriculo-ia.com";
  const fullTitle = title ? `${title} | Gerador de Currículos IA` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const canonicalUrl = canonical || siteUrl;
  const imageUrl = ogImage || `${siteUrl}/og-image.jpg`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      
      {/* Robots directive */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:site_name" content="Gerador de Currículos com IA" />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:creator" content="@ydsoftware" />
      
      {/* Additional Meta Tags */}
      <meta name="author" content="YD Software" />
      <meta name="language" content="pt-BR" />
      <meta name="revisit-after" content="1 days" />
      
      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}

// Predefined JSON-LD schemas
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Gerador de Currículos com IA",
  "url": "https://curriculo-ia.com",
  "description": "Ferramenta online gratuita para criar currículos profissionais na área de tecnologia usando inteligência artificial",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://curriculo-ia.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "YD Software",
    "url": "https://ydsoftware.com"
  }
};

export const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Gerador de Currículos com IA",
  "url": "https://curriculo-ia.com",
  "description": "Ferramenta online gratuita para criar currículos profissionais na área de tecnologia usando inteligência artificial",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Any",
  "browserRequirements": "Requires JavaScript. Requires HTML5.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "@type": "Offer",
    "priceCurrency": "BRL",
    "availability": "https://schema.org/InStock"
  },
  "featureList": [
    "Geração automática de currículos com IA",
    "Templates otimizados para ATS",
    "Foco em profissionais de tecnologia",
    "Export em PDF profissional",
    "Interface intuitiva e moderna"
  ],
  "screenshot": "https://curriculo-ia.com/screenshot.jpg"
};

export const articleSchema = (title, description, author, datePublished, dateModified) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": title,
  "description": description,
  "author": {
    "@type": "Person",
    "name": author || "YD Software Team"
  },
  "publisher": {
    "@type": "Organization",
    "name": "YD Software",
    "logo": {
      "@type": "ImageObject",
      "url": "https://curriculo-ia.com/logo.png"
    }
  },
  "datePublished": datePublished,
  "dateModified": dateModified || datePublished,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://curriculo-ia.com/blog"
  }
});
