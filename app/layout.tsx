import "./global.css";
import type { Metadata } from "next";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { baseUrl } from "./sitemap";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        "text-black  dark:text-white dark:bg-black",
        inter.className,
      )}
    >
      <body className="antialiased flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-auto max-w-4xl mx-6 lg:mx-auto min-w-0 flex flex-col px-2 md:px-0">
          {children}
        </main>
        <Footer />
      </body>
      <Analytics />
      <SpeedInsights />
    </html>
  );
}
