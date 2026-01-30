import "./global.css";
import type { Metadata } from "next";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { baseUrl } from "./sitemap";
import { fonts, fontVariables } from "./fonts";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Jasper Kense | Software Engineer & Designer",
    template: "%s | Jasper Kense",
  },
  description:
    "Software engineer and designer passionate about creating impactful products. Founder of Leapfrog, combining technical expertise with design thinking.",
  openGraph: {
    title: "Jasper Kense | Software Engineer & Designer",
    description:
      "Software engineer and designer passionate about creating impactful products. Founder of Leapfrog, combining technical expertise with design thinking.",
    url: baseUrl,
    siteName: "Jasper Kense",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`bg-cream text-black dark:text-white dark:bg-black ${fontVariables}`}
    >
      <body
        className={`antialiased flex flex-col min-h-screen overflow-x-hidden ${fonts.sans.className}`}
      >
        <Navbar />
        <main className="flex-auto max-w-4xl mx-auto w-full px-6 lg:px-0">
          {children}
        </main>
        <Footer />
      </body>
      <Analytics />
      <SpeedInsights />
    </html>
  );
}
