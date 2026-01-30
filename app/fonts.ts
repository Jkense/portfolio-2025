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

export const fontVariables = `${GeistSans.variable} ${GeistMono.variable} ${notoSerif.variable}`;
