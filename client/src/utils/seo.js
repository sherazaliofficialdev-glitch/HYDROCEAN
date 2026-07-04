export const SEO_CONFIG = {
  title: 'Wave pilot Systems - Autonomous Marine Vehicles',
  description: 'Wave pilotspecializes in advanced USV and AUV marine systems for ocean exploration, research, and defense applications.',
  keywords: 'USV, AUV, marine robotics, autonomous vehicles, ocean research, subsea technology',
  siteUrl: 'https://Wave pilot.com',
  twitterHandle: '@Wave pilot',
  ogImage: '/og-image.jpg',
  favicon: '/favicon.ico',
};

export const generateMetaTags = ({
  title = SEO_CONFIG.title,
  description = SEO_CONFIG.description,
  keywords = SEO_CONFIG.keywords,
  image = SEO_CONFIG.ogImage,
  url = '',
  type = 'website',
}) => {
  const siteUrl = SEO_CONFIG.siteUrl;
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;

  return {
    title,
    meta: [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: `${siteUrl}${image}` },
      { property: 'og:url', content: fullUrl },
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: SEO_CONFIG.title },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: `${siteUrl}${image}` },
      { name: 'twitter:site', content: SEO_CONFIG.twitterHandle },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    ],
    link: [
      { rel: 'canonical', href: fullUrl },
      { rel: 'icon', href: SEO_CONFIG.favicon },
    ],
  };
};