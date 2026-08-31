import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ПЛАНКОД — инженерное проектирование, вентиляция, климат и умный дом",
  description:
    "Проектируем вентиляцию, отопление и кондиционирование для дома, производства и коммерческих объектов. Монтаж, автоматизация и умный дом — в одном проекте.",
  openGraph: {
    title: "ПЛАНКОД — инженерные системы объектов любой сложности",
    description:
      "Проектируем, поставляем и монтируем вентиляцию, отопление и кондиционирование — от квартиры до производственного комплекса. Умный дом — там, где он нужен.",
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "ПЛАНКОД — инженерные системы по проекту" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ПЛАНКОД — инженерное проектирование и умный дом",
    description: "Вентиляция, отопление, кондиционирование, монтаж и автоматизация объектов любой сложности.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
