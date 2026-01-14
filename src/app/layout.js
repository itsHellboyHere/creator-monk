import "./globals.css";
import Navbar from "./components/Navbar";
import { Inter } from "next/font/google";
import Footer from "./components/Footer";


const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "CreatorMonk",
  description: "We help creators turn ideas into polished content, strong brands, and meaningful growth.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 'antialiased' makes the font look smoother and more premium */}
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}