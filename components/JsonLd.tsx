import Script from "next/script";

export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CargoLand Logistics ",
    logo: "https://cargoland.africa/og-image.png",
    description:
      "Ship packages across countries via Air, Ocean, or Road freight with real-time tracking and transparent pricing.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "76 The Brent",
      addressLocality: "Dartford",
      addressRegion: "Dartford",
      postalCode: "DA1 1YW",
      addressCountry: "GB",
    },
    email: "",
    telephone: "+44-7974-369-854",
    openingHours: "Mo-Fr 09:00-18:00",
    // priceRange: "££",
    // todo
    sameAs: [
      "https://twitter.com/cargoland",
      "https://linkedin.com/company/cargoland",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+234-817-908-1262",
      email: "info@cargoland.africa",
      contactType: "Customer Service",
      //   areaServed: "NG",
      availableLanguage: ["en"],
    },
  };

  return (
    <Script
      id="organnozation-jsonld"
      type="application/ld+json"
      //   strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
