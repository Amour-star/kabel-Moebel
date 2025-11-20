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
  verification: {
    // ❗ Only the token, no "google-site-verification="
    google: "uIlBaOBRkIZ_4RnbEHZhrLUXqPA3alvQHx1d6i-Be8o",
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
