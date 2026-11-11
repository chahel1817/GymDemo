import { siteConfig } from "@/data/site";
import { faqData } from "@/data/faq";
import { EnquiryProvider } from "@/components/providers/EnquiryProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { About } from "@/components/sections/About";
import { Programs } from "@/components/sections/Programs";
import { Trainers } from "@/components/sections/Trainers";
import { Gallery } from "@/components/sections/Gallery";
import { Memberships } from "@/components/sections/Memberships";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

function StructuredData() {
  const sportsClubSchema = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: siteConfig.brand.name,
    description: siteConfig.seo.description,
    url: siteConfig.seo.siteUrl,
    image: `${siteConfig.seo.siteUrl}${siteConfig.seo.ogImage}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.line1,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.state,
      addressCountry: "IN",
    },
    priceRange: "₹1,499 - ₹3,999 (Illustrative Demo Pricing)",
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsClubSchema) }}
      />
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
            <TrustStrip />
            <About />
            <Programs />
            <Trainers />
            <Gallery />
            <Memberships />
            <Testimonials />
            <FAQ />
            <Contact />
          </main>
          <Footer />
        </div>
      </EnquiryProvider>
    </>
  );
}
