import FirstScreen from "@/components/layout/FTA/FirstScreen";
import Footer from "@/components/layout/MainPage/Footer";
import HowToUse from "@/components/layout/Cash2Cash/HowToUse";
import Offices from "@/components/layout/MainPage/Offices";
import Payments from "@/components/layout/FTA/Payments";
import Services from "@/components/layout/FTA/Services";
import WhatCanPay from "@/components/layout/FTA/WhatCanPay";

export const metadata = {
  title: "Skynet Group | Международные платежи ВЭД",
  description:
    "Профессиональное сопровождение ВЭД платежей. Быстрые международные переводы, работа с китайскими, турецкими и другими иностранными контрагентами. Гарантия безопасности транзакций.",
  keywords:
    "ВЭД платежи, внешнеэкономическая деятельность, международные переводы, платежи в Китай, платежи в Турцию, валютный контроль, B2B платежи, международная торговля",
  openGraph: {
    title: "Skynet Group | Международные платежи ВЭД",
    description:
      "Надежные решения для международных B2B платежей. Работаем с компаниями по всему миру, обеспечиваем быстрые и безопасные транзакции.",
    type: "website",
    locale: "ru_RU",
    url: "https://skynetgroup.ru/ru/fta",
    siteName: "Skynet Group",
    images: [
      {
        url: "/images/fta-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Международные B2B платежи и ВЭД",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  canonical: "https://skynetgroup.ru/ru/fta",
  alternates: {
    canonical: "https://skynetgroup.ru/ru/fta",
    languages: {
      "ru-RU": "https://skynetgroup.ru/ru/fta",
      // "en-US": "https://skynetgroup.ru/ru/en/fta",
    },
  },
  other: {
    "format-detection": "telephone=no",
    "theme-color": "#ffffff",
    "twitter:card": "summary_large_image",
    "twitter:title": "Международные платежи ВЭД | Skynet Group",
    "twitter:description":
      "Профессиональные решения для международных B2B платежей",
  },
};

export default function FTAPage() {
  return (
    <>
      <main>
        <FirstScreen />
        <Services />
        <Payments />
        <HowToUse tNamespace="VED" />
        <WhatCanPay />
        <Offices />
      </main>
      <Footer page="ved" />
    </>
  );
}
