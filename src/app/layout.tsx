import type { Metadata } from "next";
import { Onest } from "next/font/google";
import { hero } from "@/data/content";
import { site } from "@/data/site";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
});

const title = `${site.name} — недвижимость в Бишкеке`;

export const metadata: Metadata = {
  title: { default: title, template: `%s — ${site.name}` },
  description: hero.lead,
  robots: site.indexable ? undefined : { index: false, follow: false },
  openGraph: {
    title,
    description: hero.lead,
    siteName: site.name,
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" data-scroll-behavior="smooth" className={onest.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
