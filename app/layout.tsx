import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ПЛАНКОД — проектирование, инженерные системы и умный дом",
  description:
    "Проектирование отопления, вентиляции и кондиционирования, монтаж, интеграция в умный дом и поставка оборудования.",
  openGraph: {
    title: "ПЛАНКОД — инженерия дома, объединённая умным управлением",
    description:
      "Проектируем, поставляем, монтируем и объединяем инженерные системы в умный дом.",
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "ПЛАНКОД — умный дом без магии, по проекту" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ПЛАНКОД — проектирование и умный дом",
    description: "Инженерные системы, монтаж, автоматизация и оборудование.",
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
