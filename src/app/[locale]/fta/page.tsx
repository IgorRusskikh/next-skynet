import FirstScreen from "@/components/layout/FTA/FirstScreen";
import HowToUse from "@/components/layout/Cash2Cash/HowToUse";
import Offices from "@/components/layout/MainPage/Offices";
import Payments from "@/components/layout/FTA/Payments";
import Services from "@/components/layout/FTA/Services";

export default function FTAPage() {
  return (
    <>
      <FirstScreen />
      <Services />
      <Payments />
      <HowToUse />
      <Offices />
    </>
  );
}
