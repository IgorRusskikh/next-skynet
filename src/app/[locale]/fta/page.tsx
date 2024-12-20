import FirstScreen from "@/components/layout/FTA/FirstScreen";
import Footer from "@/components/layout/MainPage/Footer";
import HowToUse from "@/components/layout/Cash2Cash/HowToUse";
import Offices from "@/components/layout/MainPage/Offices";
import Payments from "@/components/layout/FTA/Payments";
import Services from "@/components/layout/FTA/Services";
import WhatCanPay from "@/components/layout/FTA/WhatCanPay";

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
