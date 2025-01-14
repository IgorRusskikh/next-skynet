import FirstScreen from "@/components/layout/Quotes/FirstScreen";
import Footer from "@/components/layout/MainPage/Footer";
import RatesTable from "@/components/layout/Quotes/RatesTable";

export const metadata = {
  title: "Skynet Group | Котировки валют",
  description:
    "Актуальные котировки валют в реальном времени. Следите за курсами USDT, USD, RUB. Профессиональный анализ и мониторинг валютного рынка.",
  keywords:
    "котировки валют, курс USDT, курс доллара, курс евро, обменный курс, мониторинг котировок, валютный рынок, курсы валют онлайн",
  openGraph: {
    title: "Котировки валют в реальном времени | Skynet Group",
    description:
      "Актуальные курсы валют USDT, USD, RUB. Профессиональный мониторинг котировок и аналитика валютного рынка.",
    type: "website",
    locale: "ru_RU",
    url: "https://skynetgroup.ru/ru/quotes",
    siteName: "Skynet Group",
    images: [
      {
        url: "/images/quotes-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Котировки валют в реальном времени",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  canonical: "https://skynetgroup.ru/ru/quotes",
  alternates: {
    canonical: "https://skynetgroup.ru/ru/quotes",
    languages: {
      "ru-RU": "https://skynetgroup.ru/ru/quotes",
      // "en-US": "https://skynetgroup.ru/en/quotes",
    },
  },
  other: {
    "format-detection": "telephone=no",
    "theme-color": "#ffffff",
    "twitter:card": "summary_large_image",
    "twitter:title": "Котировки валют | Skynet Group",
    "twitter:description": "Актуальные курсы валют в реальном времени",
    refresh: "300", // Обновление каждые 5 минут
    "currency:update-frequency": "real-time",
    "data-source": "Skynet Group Exchange",
  },
};

export default function QuotesPage() {
  return (
    <>
      <main>
        <FirstScreen />
      </main>
      <Footer page="quotes" />
    </>
  );
}
