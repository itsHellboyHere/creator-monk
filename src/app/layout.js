import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Inter } from "next/font/google";
import Script from "next/script";
import Analytics from "./components/Analytics";
import SmoothScroll from "./components/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  metadataBase: new URL("https://creatormonk.in"), 

  title: {
    default: "CreatorMonk – Creator Growth & Personal Branding Agency",
    template: "%s | CreatorMonk",
  },

  description:
    "CreatorMonk helps creators turn ideas into polished content, strong personal brands, and meaningful audience growth.",

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
<html lang="en">
  <head>
    {/* Google Analytics */}
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      strategy="afterInteractive"
    />

    <Script id="ga-init" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
          page_path: window.location.pathname,
        });
      `}
    </Script>
  </head>

  <body className={`${inter.variable} font-sans antialiased`}>
    <SmoothScroll>
    <Analytics />
    <Navbar />
    {children}
    <Footer />
    </SmoothScroll>
  </body>
</html>
  );
}