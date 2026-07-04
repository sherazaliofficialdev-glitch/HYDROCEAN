import React from 'react';
import { Helmet } from 'react-helmet-async';

const StructuredData = () => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Wave pilot Systems',
    description: 'Advanced USV and AUV marine systems for ocean exploration',
    url: 'https://Wave pilot.com',
    logo: 'https://Wave pilot.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'wavepilot1@gmail.com',
      contactType: 'customer service',
      availableLanguage: ['English', 'Urdu'],
    },
    sameAs: [
      'https://linkedin.com/company/Wave pilot',
      'https://facebook.com/Wave pilot',
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
};

export default StructuredData;