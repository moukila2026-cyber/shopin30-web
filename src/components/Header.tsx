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
    <a className="brand-logo" href="#accueil" aria-label="ShopIn30 — accueil">
      <img src={`${import.meta.env.BASE_URL}shopin30-logo.svg`} width="153" height="37" alt="ShopIn30" />
    </a>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);
  const messageLink = waLink("Bonjour SHOPIN30, je souhaite échanger sur un projet digital.");

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
          <a className="button button-small button-primary header-cta" href="#commander">
            Commander <ArrowUpRight aria-hidden="true" size={16} />
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
          <a className="button button-primary mobile-cta" href="#commander" onClick={closeMenu}>
            Commander mon projet <ArrowUpRight aria-hidden="true" size={17} />
          </a>
          <a className="mobile-whatsapp" href={messageLink} target="_blank" rel="noopener noreferrer">
            <MessageCircle aria-hidden="true" size={17} /> Nous écrire sur WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
