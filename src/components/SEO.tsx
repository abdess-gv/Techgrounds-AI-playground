
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
  keywords?: string;
}

const SEO = ({ title, description, canonical, noindex = false, keywords }: SEOProps) => {
  const siteTitle = 'Techgrounds AI-Playground - Interactive Learning Platform';
  const siteDescription = 'Leer programmeren en workflows met onze interactieve AI-aangedreven leerplatform voor JSON, Python en Workflow Design.';
  
  const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const pageDescription = description || siteDescription;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="language" content="nl" />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="nl_NL" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      
      {/* Technical */}
      <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow"} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="nl" />
      
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Techgrounds AI-Playground",
          "description": pageDescription,
          "applicationCategory": "EducationalApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EUR"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
