import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Atkinson_Hyperlegible, Bricolage_Grotesque } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { doctor, siteName, siteUrl, whatsappGreeting } from "@/data/site";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
  display: "swap",
});

const description =
  "Atendimento individualizado em metabolismo, obesidade, reposição hormonal, performance e envelhecimento. Consultas em Catalão, Goiânia e online. CRM GO 19862.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Medicina integrativa e emagrecimento`,
    template: `%s · ${siteName}`,
  },
  description,
  applicationName: siteName,
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName,
    title: `${siteName} | Medicina integrativa e emagrecimento`,
    description:
      "Cuidado integral a partir do metabolismo, com acompanhamento contínuo. Consultas em Catalão, Goiânia e online.",
    url: siteUrl,
    images: [{ url: "/images/doutor.jpg", alt: "Dr. Lucas Abrahão Ferreira no consultório." }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Medicina integrativa e emagrecimento`,
    description: "Cuidado integral a partir do metabolismo, com acompanhamento contínuo.",
    images: ["/images/doutor.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f3eee6",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: siteName,
  url: siteUrl,
  image: `${siteUrl}/images/doutor.jpg`,
  telephone: doctor.phoneTel,
  address: {
    "@type": "PostalAddress",
    streetAddress: doctor.address.street,
    addressLocality: doctor.address.city,
    addressRegion: doctor.address.state,
    postalCode: doctor.address.postalCode,
    addressCountry: "BR",
  },
  areaServed: ["Catalão", "Goiânia", "Brasil"],
  employee: {
    "@type": "Physician",
    name: doctor.name,
    identifier: doctor.crm,
  },
  sameAs: [doctor.instagram],
  description: "Cuidado integral a partir da análise do metabolismo, com acompanhamento contínuo.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full bg-paper text-ink">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SiteHeader />
        {children}
        <SiteFooter />
        <a
          href={whatsappGreeting}
          className="fixed right-4 bottom-4 z-30 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition-colors duration-200 hover:bg-[#1ebe5d]"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Agendar pelo WhatsApp"
        >
          <svg viewBox="0 0 24 24" className="size-7" fill="currentColor" aria-hidden="true">
            <path d="M20.5 3.5A11 11 0 0 0 2.1 16.8L1 23l6.4-1.1A11 11 0 0 0 12 22a11 11 0 0 0 8.5-18.5zM12 20.2a9.1 9.1 0 0 1-4.6-1.2l-.3-.2-3.8.6.6-3.7-.2-.3A9.2 9.2 0 1 1 12 20.2zm5-6.8c-.3-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.6.1a7.5 7.5 0 0 1-2.2-1.4 8.3 8.3 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.4.2-.4a.5.5 0 0 0 0-.5c-.1-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 12 12 0 0 0 4.6 4.1 5.3 5.3 0 0 0 2.6.7 2.8 2.8 0 0 0 1.8-1.2 2.3 2.3 0 0 0 .2-1.3c-.1-.2-.3-.2-.6-.3z" />
          </svg>
        </a>
      </body>
    </html>
  );
}
