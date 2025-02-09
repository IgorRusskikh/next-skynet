import "./globals.css";

import { getLocale, getMessages } from "next-intl/server";

import ComingSoonModal from "@/components/ComingSoonModal";
import Dropdown from "@/components/Dropdown";
import DropdownProvider from "@/providers/DropdownProvider";
import Footer from "@/components/layout/MainPage/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";
import { ModalProvider } from "@/providers/ModalProvider";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ttNorms } from "@/utils/fonts";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(resolvedParams.locale as any)) {
    notFound();
  }

  const currentLocale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={currentLocale}>
      <body className={`${ttNorms.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ModalProvider>
            <DropdownProvider>
              <ComingSoonModal />
              <Dropdown />
              <Header />
              <Header fixed />
            </DropdownProvider>
            {children}
          </ModalProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
