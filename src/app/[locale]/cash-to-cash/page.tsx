import FirstScreen from "@/components/layout/Cash2Cash/FirstScreen";
import Footer from "@/components/layout/MainPage/Footer";
import HowToUse from "@/components/layout/Cash2Cash/HowToUse";
import Locations from "@/components/layout/Cash2Cash/Locations";
import Offices from "@/components/layout/MainPage/Offices";
import Verification from "@/components/layout/MainPage/Verification";

export const metadata = {
  title: "Skynet Group | Обмен наличной валюты",
  description:
    "Безопасный обмен наличной валюты. Лучшие курсы для USD, EUR, RUB. Официальный обменный пункт, выгодные условия обмена, конфиденциальность операций.",
  keywords:
    "обмен валюты, обменный пункт, купить доллары, купить евро, обмен наличных, курс валют, наличный обмен, обмен валюты Москва",
  openGraph: {
    title: "Skynet Group | Обмен наличной валюты",
    description:
      "Надежный обмен наличной валюты с выгодным курсом. Работаем с USD, EUR, RUB. Безопасные операции в официальном обменном пункте.",
    type: "website",
    locale: "ru_RU",
    url: "https://skynetgroup.ru/ru/cash-to-cash",
    siteName: "Skynet Group",
    images: [
      {
        url: "/images/cash2cash-og-image.jpg", // Убедитесь что изображение существует
        width: 1200,
        height: 630,
        alt: "Обмен наличной валюты в Москве",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  canonical: "https://skynetgroup.ru/ru/cash-to-cash",
  alternates: {
    canonical: "https://skynetgroup.ru/ru/cash-to-cash",
    languages: {
      "ru-RU": "https://skynetgroup.ru/ru/cash-to-cash",
      "en-US": "https://skynetgroup.ru/ru/en/cash-to-cash",
    },
  },
  // Дополнительные метатеги для локального бизнеса
  other: {
    "format-detection": "telephone=no",
    "theme-color": "#ffffff",
    "twitter:card": "summary_large_image",
    "twitter:title": "Обмен наличной валюты | Skynet Group",
    "twitter:description": "Выгодный обмен наличной валюты в Москве",
  },
};

export default function CashToCashPage() {
  return (
    <>
      <main>
        <FirstScreen />
        <Locations />
        <HowToUse tNamespace="CashToCash" />
        <Verification />
        <Offices />
      </main>
      <Footer page="cash2cash" />
    </>
  );
}
