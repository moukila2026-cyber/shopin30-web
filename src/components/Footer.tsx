import { ArrowUpRight, MessageCircle } from "lucide-react";
import { waLink, WHATSAPP_DISPLAY } from "../lib/constants";
import { Logo } from "./Header";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand-block">
            <Logo />
            <p>Sites web, applications sur mesure et CRM connecté à WhatsApp pour les entreprises, PME et particuliers.</p>
            <span className="footer-tagline">Solutions digitales pour l'Afrique.</span>
          </div>
          <div className="footer-navigation">
            <h2>Explorer</h2>
            <a href="#services">Nos services</a>
            <a href="#realisations">Réalisations</a>
            <a href="#estimation">Estimateur de prix</a>
            <a href="#faq">Questions fréquentes</a>
          </div>
          <div className="footer-contact">
            <h2>Parlons de votre projet</h2>
            <p>Notre équipe est disponible sur WhatsApp.</p>
            <a className="footer-contact-link" href={waLink("Bonjour SHOPIN30, je souhaite discuter d'un projet digital.")} target="_blank" rel="noopener noreferrer">
              <span><MessageCircle size={17} /></span>{WHATSAPP_DISPLAY}<ArrowUpRight size={15} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} SHOPIN30. Tous droits réservés.</span>
          <a href="#accueil">Retour en haut <span>↑</span></a>
          <span>Conçu pour l'Afrique <i>✳</i></span>
        </div>
      </div>
    </footer>
  );
}
