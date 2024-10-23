import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quiz App - For LUMHS Students",
  description:
 "A quiz app for LUMHS students to practice for their papers and test their knowledge in preparation for exams."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-WP6GLPWHWT"
        ></Script>
        <Script id="google-analytics">
          {`
   window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-WP6GLPWHWT');
  `}
        </Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
