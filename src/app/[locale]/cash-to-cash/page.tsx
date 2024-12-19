import FirstScreen from "@/components/layout/Cash2Cash/FirstScreen";
import HowToUse from "@/components/layout/Cash2Cash/HowToUse";
import Locations from "@/components/layout/Cash2Cash/Locations";
import Offices from "@/components/layout/MainPage/Offices";
import Verification from "@/components/layout/MainPage/Verification";

export default function CashToCashPage() {
  return (
    <main>
      <FirstScreen />
      <Locations />
      <HowToUse />
      <Verification />
      <Offices />
    </main>
  );
}
