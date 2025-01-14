import FirstScreen from "@/components/layout/FTA/FirstScreen";
import Footer from "@/components/layout/MainPage/Footer";
import HowToUse from "@/components/layout/UsdtFiat/HowToUse";
import Offices from "@/components/layout/MainPage/Offices";
import Payments from "@/components/layout/FTA/Payments";

export const metadata = {
  title: "Skynet Group | Конвертация USDT в фиат",
  description:
    "Быстрая и безопасная конвертация USDT в фиатные валюты (RUB, USD). Выгодный курс обмена, мгновенные транзакции, поддержка 24/7.",
  keywords:
    "конвертация USDT, обмен USDT на рубли, USDT в USD, криптовалюта обмен, купить USDT, продать USDT, обменник криптовалют",
  openGraph: {
    title: "Конвертация USDT/FIAT | Skynet Group",
    description:
      "Моментальный обмен USDT на фиатные валюты с выгодным курсом. Безопасные сделки, круглосуточная поддержка.",
    type: "website",
    locale: "ru_RU",
    url: "https://skynetgroup.ru/ru/usdt-fiat",
    siteName: "Skynet Group",
    images: [
      {
        url: "/images/usdt-fiat-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Конвертация USDT в фиатные валюты",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  canonical: "https://skynetgroup.ru/ru/usdt-fiat",
  alternates: {
    canonical: "https://skynetgroup.ru/ru/usdt-fiat",
    languages: {
      "ru-RU": "https://skynetgroup.ru/ru/usdt-fiat",
      // "en-US": "https://skynetgroup.ru/en/usdt-fiat",
    },
  },
  other: {
    "format-detection": "telephone=no",
    "theme-color": "#ffffff",
    "twitter:card": "summary_large_image",
    "twitter:title": "Конвертация USDT в фиат | Skynet Group",
    "twitter:description": "Быстрый и безопасный обмен USDT на фиатные валюты",
  },
};

export default function UsdtFiatPage() {
  return (
    <>
      <main>
        <FirstScreen tNamespace="UsdtFiat" />
        <HowToUse />
        <Offices />
      </main>
      <Footer page="usdt-fiat" />
    </>
  );
}
