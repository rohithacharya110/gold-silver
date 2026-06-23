import { business, siteName, siteTagline, siteUrl } from "@/lib/site";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: siteName,
        alternateName: ["Jaganmathe Gold and Silver Artwork", "Shri Jaganmathe"],
        url: siteUrl,
        description: `${siteName} — handcrafted gold and silver artwork, commissions, and workshop pieces in Udupi, Karnataka.`,
        email: business.email,
        telephone: business.phone,
        logo: `${siteUrl}/logo.svg`,
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#localbusiness`,
        name: `${siteName} — ${siteTagline}`,
        image: `${siteUrl}/logo.svg`,
        url: siteUrl,
        telephone: business.phone,
        email: business.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: business.address.street,
          addressLocality: business.address.city,
          addressRegion: business.address.region,
          postalCode: business.address.postalCode,
          addressCountry: business.address.country,
        },
        description:
          "Jaganmathe gold and silver artwork workshop — fine gold works, silver artistry, and custom commissions.",
        priceRange: "$$",
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: `${siteName} — ${siteTagline}`,
        description: "Jaganmathe gold and silver artwork gallery and workshop.",
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "en-IN",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
