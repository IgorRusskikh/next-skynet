import FirstScreen from "@/components/layout/Cash2Cash/FirstScreen";
import Footer from "@/components/layout/MainPage/Footer";
import HowToUse from "@/components/layout/Cash2Cash/HowToUse";
import Locations from "@/components/layout/Cash2Cash/Locations";
import Offices from "@/components/layout/MainPage/Offices";
import Verification from "@/components/layout/MainPage/Verification";

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
