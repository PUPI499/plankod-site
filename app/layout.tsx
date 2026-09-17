import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  verification: {
    yandex: "054b7e6184e46585",
    google: "unc-g3f3DDC7SPzOABLBE0PGNM4EcopoxhE1zEXYXXg",
  },
  title: "ПЛАНКОД — инженерное проектирование, вентиляция, климат и умный дом",
  description:
    "Проектируем вентиляцию, отопление, кондиционирование и электроснабжение. Координация инженерных систем и проектирование умного дома.",
  openGraph: {
    title: "ПЛАНКОД — инженерия здания как единая система",
    description:
      "Проектирование и координация инженерных систем для частных домов, коммерческих, общественных и производственных объектов.",
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "ПЛАНКОД — инженерные системы по проекту" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ПЛАНКОД — инженерное проектирование и умный дом",
    description: "Вентиляция, отопление, кондиционирование, электроснабжение и проектирование умного дома.",
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
