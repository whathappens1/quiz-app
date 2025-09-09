import type { Metadata } from "next";
import "./globals.css";
import { Baloo_Bhaijaan_2 } from "next/font/google";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/layouts/scroll-to-top";
import { Analytics } from "@vercel/analytics/react"
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Navbar from "./components/layouts/navbar";
import Footer from "./components/layouts/footer";

export const metadata: Metadata = {
  title: {
    template: '%s | منصة نواة', 
    default: 'للاختبارات المحاكية | منصة نواة', 
  },
  description: 'من تميم السهلي',
};

const font = Baloo_Bhaijaan_2({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${font.className} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <NextTopLoader
            color={"#3671f3"}
            initialPosition={0.08}
            height={3}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            zIndex={1600}
          />
          <Toaster position="bottom-right" />
          <Navbar />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
          <Analytics/>
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
