import React, { useEffect } from 'react';
import { BUSINESS_INFO } from '@/data';

interface DynamicSEOProps {
  pageTitle?: string;
  pageDescription?: string;
  pagePath: string; // e.g. '/', '/menu', '/tentang'
}

export default function DynamicSEO({ pageTitle, pageDescription, pagePath }: DynamicSEOProps) {
  const baseDomain = "https://warungpapatong.com";
  const canonicalUrl = `${baseDomain}${pagePath}`;
  const finalTitle = pageTitle 
    ? `${pageTitle} | ${BUSINESS_INFO.name}` 
    : `${BUSINESS_INFO.name} - ${BUSINESS_INFO.tagline}`;
  const finalDescription = pageDescription || BUSINESS_INFO.description;
  const ogImage = "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1200&h=630&fit=crop&q=85"; // Kepiting Jumbo preview photo

  useEffect(() => {
    // 1. Update Document Title
    document.title = finalTitle;

    // 2. Manage General Meta Tags
    const updateMetaTag = (attribute: string, attrValue: string, contentValue: string) => {
      let element = document.querySelector(`meta[${attribute}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentValue);
    };

    updateMetaTag('name', 'description', finalDescription);
    updateMetaTag('name', 'keywords', "warung papatong cibinong, kuliner sunda bogor, seafood saus padang cibinong, restoran keluarga bogor, lesehan sunda pemda bogor, sate maranggi cibinong");
    updateMetaTag('name', 'robots', "index, follow");

    // 3. Manage OpenGraph OG Tags for WhatsApp / Social share previews
    updateMetaTag('property', 'og:title', finalTitle);
    updateMetaTag('property', 'og:description', finalDescription);
    updateMetaTag('property', 'og:image', ogImage);
    updateMetaTag('property', 'og:url', canonicalUrl);
    updateMetaTag('property', 'og:type', "restaurant");
    updateMetaTag('property', 'og:site_name', BUSINESS_INFO.name);

    // 4. Manage Twitter Cards
    updateMetaTag('name', 'twitter:card', "summary_large_image");
    updateMetaTag('name', 'twitter:title', finalTitle);
    updateMetaTag('name', 'twitter:description', finalDescription);
    updateMetaTag('name', 'twitter:image', ogImage);

    // 5. Update Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 6. Inject LocalBusiness Structured Data (JSON-LD) for flawless Google search snippets
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "@id": "https://warungpapatong.com/#restaurant",
      "name": BUSINESS_INFO.name,
      "image": [
        "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&fit=crop",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&fit=crop"
      ],
      "url": baseDomain,
      "telephone": BUSINESS_INFO.phone,
      "priceRange": "$$",
      "servesCuisine": "Sundanese, Seafood, Indonesian",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": BUSINESS_INFO.address,
        "addressLocality": "Kabupaten Bogor",
        "addressRegion": "Jawa Barat",
        "postalCode": "16912",
        "addressCountry": "ID"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-6.5120209",
        "longitude": "106.8329725"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "11:00",
        "closes": "22:00"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "4076"
      }
    };

    let scriptElement = document.querySelector('script[type="application/ld+json"]');
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptElement);
    }
    scriptElement.textContent = JSON.stringify(structuredData);

    return () => {
      // Cleanup structured data script element on components unmount if desired
    };
  }, [finalTitle, finalDescription, canonicalUrl]);

  return null; // Side-effect purely component
}
