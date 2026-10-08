import { useCallback, useEffect, useState, type MouseEvent } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import LocalApproach from "./components/LocalApproach";
import Growth from "./components/Growth";
import Realisations from "./components/Realisations";
import Process from "./components/Process";
import Faq from "./components/Faq";
import Calculator from "./components/Calculator";
import OrderForm from "./components/OrderForm";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import type { ServiceId } from "./lib/constants";

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceId>("site");

  const handleSectionNavigation = (event: MouseEvent<HTMLDivElement>) => {
    const clickedElement = event.target;
    if (!(clickedElement instanceof Element)) return;

    const link = clickedElement.closest<HTMLAnchorElement>('a[href^="#"]');
    const href = link?.getAttribute("href");
    if (!href || href.length < 2) return;

    const destination = document.getElementById(decodeURIComponent(href.slice(1)));
    if (!destination) return;

    // Keep in-page links in the current document. This also prevents static
    // preview hosts from opening the raw HTML source when a hash link is clicked.
    event.preventDefault();
    try {
      window.history.replaceState(null, "", href);
    } catch {
      // Scrolling still works in hosts that restrict history updates.
    }
    destination.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  };

  const selectServiceAndScroll = useCallback((service: ServiceId) => {
    setSelectedService(service);
    document.getElementById("commander")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" },
    );

    document.documentElement.classList.add("has-reveal");
    items.forEach((item) => observer.observe(item));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("has-reveal");
    };
  }, []);

  return (
    <div className="site-shell" onClickCapture={handleSectionNavigation}>
      <a className="skip-link" href="#contenu">Aller au contenu</a>
      <Header />
      <main id="contenu">
        <Hero />
        <Services onSelect={selectServiceAndScroll} />
        <WhyUs />
        <LocalApproach />
        <Growth />
        <Realisations />
        <Process />
        <Faq />
        <Calculator onSelect={selectServiceAndScroll} />
        <OrderForm service={selectedService} onServiceChange={setSelectedService} />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
