import About from "@/components/layout/MainPage/About";
import FirstScreen from "@/components/layout/MainPage/FirstScreen";
import Footer from "@/components/layout/MainPage/Footer";
import HowToUse from "@/components/layout/MainPage/HowToUse";
import Offices from "@/components/layout/MainPage/Offices";
import Services from "@/components/layout/MainPage/Services";
import Verification from "@/components/layout/MainPage/Verification";

export const metadata = {
  title: "Skynet - Финансовые услуги и инвестиции",
  description:
    "Skynet Group предлагает профессиональные финансовые услуги, включая котировки валют, инвестиционные решения и финансовый консалтинг.",
  keywords:
    "Skynet Group, финансовые услуги, котировки валют, инвестиции, USDT, USD, RUB, курсы валют",
  openGraph: {
    title: "Skynet Group - Финансовые услуги и инвестиции",
    description:
      "Профессиональные финансовые услуги, котировки валют и инвестиционные решения",
    type: "website",
    locale: "ru_RU",
    url: "https://skynetgroup.ru",
    siteName: "Skynet Group",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Skynet Group",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  canonical: "https://skynetgroup.ru",
  alternates: {
    canonical: "https://skynetgroup.ru",
    languages: {
      "ru-RU": "https://skynetgroup.ru",
      // "en-US": "https://skynetgroup.ru/en",
    },
  },
};

export default function Home() {
  return (
    <>
      <main>
        <FirstScreen />
        <About />
        <Services />
        <HowToUse />
        <Verification />
        <Offices />
        {/* <Blog /> */}
      </main>
      <Footer page="main" />
    </>
  );
}
