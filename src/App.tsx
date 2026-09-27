import { useCallback, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Promo from "./components/Promo";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import Realisations from "./components/Realisations";
import Process from "./components/Process";
import Calculator from "./components/Calculator";
import Faq from "./components/Faq";
import OrderForm from "./components/OrderForm";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import type { ServiceId } from "./lib/constants";

export default function App() {
  // Service présélectionné dans le formulaire (boutons « -30 % » / calculateur)
  const [selectedService, setSelectedService] = useState<ServiceId>("site");

  const selectServiceAndScroll = useCallback((service: ServiceId) => {
    setSelectedService(service);
    document.getElementById("commander")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-ink font-body text-white">
      <Header />
      <main>
        <Hero />
        <Promo />
        <Services onSelect={selectServiceAndScroll} />
        <WhyUs />
        <Realisations />
        <Process />
        <Calculator onSelect={selectServiceAndScroll} />
        <Faq />
        <OrderForm service={selectedService} onServiceChange={setSelectedService} />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
