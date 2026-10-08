import { useState } from "react";
import { ArrowUpRight, Menu, MessageCircle, X } from "lucide-react";
import { waLink } from "../lib/constants";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#realisations", label: "Réalisations" },
  { href: "#methode", label: "Notre méthode" },
  { href: "#faq", label: "FAQ" },
];

export function Logo() {
  return (
    <a className="brand-logo" href="#accueil" aria-label="SHOPIN30 — accueil">
      <svg viewBox="0 0 168 36" width="168" height="36" aria-hidden="true">
        <rect width="36" height="36" rx="8" fill="#d4f926" />
        <text
          x="18"
          y="18"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#11140a"
          fontFamily="Archivo, Inter, Arial Black, sans-serif"
          fontSize="20"
          fontWeight="800"
        >
          S
        </text>
        <text
          x="46"
          y="18"
          dominantBaseline="central"
          fontFamily="Archivo, Inter, Arial Black, sans-serif"
          fontSize="19"
          fontWeight="800"
          letterSpacing="-1"
        >
          <tspan fill="#f4f6f0">SHOPIN</tspan>
          <tspan fill="#d4f926" dx="1">30</tspan>
        </text>
      </svg>
    </a>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);
  const messageLink = waLink("Bonjour SHOPIN30, je souhaite commander un projet digital. Pouvez-vous me renseigner ?");

  return (
    <header className="site-header">
      <div className="header-inner container">
        <Logo />

        <nav className="desktop-nav" aria-label="Navigation principale">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="header-whatsapp" href={messageLink} target="_blank" rel="noopener noreferrer">
            <MessageCircle aria-hidden="true" size={17} />
            <span>WhatsApp</span>
          </a>
          <a className="button button-small button-primary header-cta" href={messageLink} target="_blank" rel="noopener noreferrer">
            Commander votre projet <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        </div>

        <button
          type="button"
          className="mobile-toggle"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
        </button>
      </div>

      <div id="mobile-navigation" className={`mobile-menu${open ? " is-open" : ""}`}>
        <nav className="mobile-nav container" aria-label="Navigation mobile">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu} className="mobile-nav-link">
              {link.label}
            </a>
          ))}
          <a className="button button-primary mobile-cta" href={messageLink} onClick={closeMenu} target="_blank" rel="noopener noreferrer">
            Commander votre projet <ArrowUpRight aria-hidden="true" size={17} />
          </a>
          <a className="mobile-whatsapp" href={messageLink} target="_blank" rel="noopener noreferrer">
            <MessageCircle aria-hidden="true" size={17} /> Nous écrire sur WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
