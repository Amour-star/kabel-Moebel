import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kabel & Möbel Service Ruhrgebiet",
  description:
    "Kabelmanagement, Möbelmontage, Entsorgung, Küche & Schlafzimmer in NRW – schnell, sauber, zuverlässig.",
  openGraph: {
    title: "Kabel & Möbel Service Ruhrgebiet",
    description:
      "Kabelmanagement, Möbelmontage, Entsorgung, Küche & Schlafzimmer in NRW – schnell, sauber, zuverlässig.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
