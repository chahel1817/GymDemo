import { siteConfig } from "@/data/site";
import { faqData } from "@/data/faq";
import { EnquiryProvider } from "@/components/providers/EnquiryProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { BrandTicker } from "@/components/sections/BrandTicker";
import { Philosophy } from "@/components/sections/Philosophy";
import { Programs } from "@/components/sections/Programs";
import { Experience } from "@/components/sections/Experience";
import { Trainers } from "@/components/sections/Trainers";
import { Gallery } from "@/components/sections/Gallery";
import { Memberships } from "@/components/sections/Memberships";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

function StructuredData() {
  const canEmitBusinessSchema =
    siteConfig.isVerifiedBusiness && !siteConfig.isDemo;

  const sportsClubSchema = canEmitBusinessSchema
    ? {
        "@context": "https://schema.org",
        "@type": "SportsActivityLocation",
        name: siteConfig.brand.name,
        description: siteConfig.seo.description,
        url: siteConfig.seo.siteUrl,
        image: `${siteConfig.seo.siteUrl}${siteConfig.seo.ogImage}`,
        telephone: siteConfig.contact.displayPhone,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.contact.address.line1,
          addressLocality: siteConfig.contact.address.city,
          addressRegion: siteConfig.contact.address.state,
          postalCode: siteConfig.contact.address.postalCode,
          addressCountry: "IN",
        },
      }
    : null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      {sportsClubSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsClubSchema) }}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

export default function Home() {
  return (
    <>
      <StructuredData />
      <EnquiryProvider>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main id="main-content" className="flex-1">
            <Hero />
            <BrandTicker />
            <Philosophy />
            <Programs />
            <Experience />
            <Trainers />
            <Gallery />
            <Memberships />
            <ClosingCTA />
            <FAQ />
            <Contact />
          </main>
          <Footer />
        </div>
      </EnquiryProvider>
    </>
  );
}
