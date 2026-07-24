import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { GeistSans } from "geist/font/sans";
import { Space_Grotesk, Instrument_Sans } from "next/font/google";
import Script from "next/script";
import Analytics from "./components/Analytics";
import {
  SITE,
  buildMetadata,
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
  JsonLd,
} from "./lib/seo";
import Chat from "./components/Chat";

const body = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-display",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-display-sans",
});

export const metadata = {
  metadataBase: new URL(SITE.url),

  title: {
    default: `${SITE.name} – ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },

  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,

  formatDetection: { telephone: true, address: true, email: true },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  ...buildMetadata({ path: "/" }),
};

/* themeColor + viewport moved out of metadata (required from Next 14) */
export const viewport = {
  themeColor: "#fdfcff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-IN"
      className={`${GeistSans.variable} ${display.variable} ${body.variable}`}
    >
      <head>
        <JsonLd
          data={[organizationSchema(), websiteSchema(), localBusinessSchema()]}
        />

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

      <body className="font-sans antialiased">
        <Analytics />
        <Navbar />
        {children}
        <Footer />
         <Chat />
      </body>
    </html>
  );
}