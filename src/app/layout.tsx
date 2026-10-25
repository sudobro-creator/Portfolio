import type {
  Metadata,
} from "next";

import "./globals.css";

import Header from "@/components/Header";

import PageTranslator from "@/components/PageTranslator";

import {
  LanguageProvider,
} from "@/i18n/LanguageProvider";


export const metadata:
  Metadata = {
    title:
      "Gizkidesigns",

    description:
      "Product Designer and Framer Developer",
  };


export default function RootLayout({
  children,
}: Readonly<{
  children:
    React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >

      <body>

        <LanguageProvider>

          <Header />


          {children}


          <PageTranslator />

        </LanguageProvider>

      </body>

    </html>
  );
}