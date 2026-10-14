import type { Metadata, Viewport } from "next";
import { Fraunces, Geist } from "next/font/google";
import { site } from "@/config/site";
import { meta } from "@/content/landing";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand} · ${meta.title}`,
    template: `%s · ${site.brand}`,
  },
  description: meta.description,
  openGraph: {
    title: `${site.brand} · ${meta.title}`,
    description: meta.description,
    locale: "es_UY",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8f5ef",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-UY"
      className={`${geistSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
