import About from "@/components/layout/MainPage/About";
import ComingSoonModal from "@/components/ComingSoonModal";
import FirstScreen from "@/components/layout/MainPage/FirstScreen";
import Footer from "@/components/layout/MainPage/Footer";
import HowToUse from "@/components/layout/MainPage/HowToUse";
import { ModalProvider } from "@/providers/ModalProvider";
import Offices from "@/components/layout/MainPage/Offices";
import Services from "@/components/layout/MainPage/Services";
import Verification from "@/components/layout/MainPage/Verification";

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
