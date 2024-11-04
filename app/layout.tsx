import type { Metadata } from "next";
import "./globals.css";
import { Baloo_Bhaijaan_2 } from "next/font/google";

export const metadata: Metadata = {
  title: "Quick Quiz App",
  description: "by tamim al-sahali dev",
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
      <body
        className={`${font.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
