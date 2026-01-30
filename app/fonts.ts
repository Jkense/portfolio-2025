import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Noto_Serif } from "next/font/google";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-serif",
});

export const fonts = {
  sans: GeistSans,
  mono: GeistMono,
  serif: notoSerif,
};

// Build font variable string, handling Geist fonts that may not have variable property
const geistSansVar = GeistSans.variable || "--font-geist-sans";
const geistMonoVar = GeistMono.variable || "--font-geist-mono";

export const fontVariables = `${geistSansVar} ${geistMonoVar} ${notoSerif.variable}`;
