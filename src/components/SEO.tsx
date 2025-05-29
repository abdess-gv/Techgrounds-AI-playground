
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
  keywords?: string;
}

const SEO = ({ title, description, canonical, noindex = false, keywords }: SEOProps) => {
  const { language } = useLanguage();
  
  const siteTitle = 'AI Leren - Nederlands AI en Prompt Engineering Platform';
  const siteDescription = 'Leer AI gebruiken en prompt engineering in het Nederlands. Gratis toegang tot oefeningen, frameworks en veiligheidsrichtlijnen voor verantwoord AI-gebruik.';
  
  const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const pageDescription = description || siteDescription;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="language" content={language} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={language === 'nl' ? 'nl_NL' : 'en_US'} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      
      {/* Technical */}
      <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow"} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content={language} />
      
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "AI Leren",
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
