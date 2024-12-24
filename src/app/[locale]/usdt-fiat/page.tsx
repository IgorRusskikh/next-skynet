import FirstScreen from "@/components/layout/FTA/FirstScreen";
import Footer from "@/components/layout/MainPage/Footer";
import HowToUse from "@/components/layout/UsdtFiat/HowToUse";
import Offices from "@/components/layout/MainPage/Offices";
import Payments from "@/components/layout/FTA/Payments";

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
