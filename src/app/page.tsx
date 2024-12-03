import About from "@/components/layout/About";
import FirstScreen from "@/components/layout/FirstScreen";
import HowToUse from "@/components/layout/HowToUse";
import Services from "@/components/layout/Services";
import Verification from "@/components/layout/Verification";

export default function Home() {
  return (
    <main>
      <FirstScreen />
      <About />
      <Services />
      <HowToUse />
      <Verification />
    </main>
  );
}
