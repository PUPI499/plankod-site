import "./design/editorial.css";
import type { Metadata } from "next";
import "./globals.css";
import "./products/store.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://plancod.ru"),
  verification: {
    yandex: "054b7e6184e46585",
    google: "unc-g3f3DDC7SPzOABLBE0PGNM4EcopoxhE1zEXYXXg",
  },
  title: "ПЛАНКОД — автоматизация зданий и проектирование ОВиК",
  description: "Автоматизация инженерных систем организаций. Обследование, проектирование, поставка, монтаж и наладка. Проектирование ОВиК.",
  openGraph: {
    title: "ПЛАНКОД — автоматизация зданий и проектирование ОВиК",
    description: "Автоматизация инженерных систем организаций. Обследование, проектирование, поставка, монтаж и наладка. Проектирование ОВиК.",
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "ПЛАНКОД — инженерные системы по проекту" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ПЛАНКОД — автоматизация зданий и проектирование ОВиК",
    description: "Автоматизация инженерных систем организаций. Обследование, проектирование, поставка, монтаж и наладка. Проектирование ОВиК.",
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <script defer src="/enquiry.js" /><script defer src="/store.js" /><script defer src="/metrika.js" /><script defer src="/smart-systems.js" />
        <noscript><div>
          {/* eslint-disable-next-line @next/next/no-img-element -- analytics fallback pixel */}
          <img src="https://mc.yandex.ru/watch/113254722" style={{ position: "absolute", left: "-9999px" }} alt="" />
        </div></noscript>
        {children}
      </body>
    </html>
  );
}
