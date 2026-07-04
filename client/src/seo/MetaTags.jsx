import React from 'react';
import { Helmet } from 'react-helmet-async';

const MetaTags = ({ 
  title = 'Wave pilot Systems - Autonomous Marine Vehicles',
  description = 'Wave pilotspecializes in advanced USV and AUV marine systems for ocean exploration, research, and defense applications.',
  keywords = 'USV, AUV, marine robotics, autonomous vehicles, ocean research, subsea technology',
  image = '/og-image.jpg',
  url = '',
}) => {
  const siteUrl = 'https://Wave pilot.com';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Wave pilot Systems" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />
      
      {/* Canonical */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Wave pilot Systems",
          "description": description,
          "url": siteUrl,
          "logo": `${siteUrl}/logo.png`,
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "wavepilot1@gmail.com",
            "contactType": "customer service"
          },
          "sameAs": [
            "https://linkedin.com/company/Wave pilot",
            "https://facebook.com/Wave pilot"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default MetaTags;