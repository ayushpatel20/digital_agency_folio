import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Startup of the Future | Innovation Redefined",
    template: "%s | Startup of the Future",
  },
  description:
    "We are a next-generation digital startup delivering cutting-edge AI, Web, and Mobile solutions that transform businesses worldwide. Award-winning team with 150+ successful projects.",
  keywords: [
    "startup",
    "digital agency",
    "AI development",
    "web development",
    "mobile apps",
    "innovation",
    "next.js",
    "UI/UX design",
  ],
  authors: [{ name: "Startup of the Future" }],
  creator: "Startup of the Future",
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Startup of the Future | Innovation Redefined",
    description:
      "Next-generation digital startup delivering AI, Web & Mobile solutions that transform businesses worldwide.",
    siteName: "Startup of the Future",
  },
  twitter: {
    card: "summary_large_image",
    title: "Startup of the Future | Innovation Redefined",
    description:
      "Next-generation digital startup delivering AI, Web & Mobile solutions.",
    creator: "@startupfuture",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
