import { useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import { waLink } from "../lib/constants";
import { cn } from "../lib/utils";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#realisations", label: "Réalisations" },
  { href: "#processus", label: "Processus" },
  { href: "#tarifs", label: "Tarifs" },
  { href: "#faq", label: "FAQ" },
];

export function Logo() {
  return (
    <a href="#" className="flex items-center gap-2.5" aria-label="SHOPIN30 — accueil">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-brand/40 bg-panel">
        <span className="-skew-x-6 font-display text-sm italic text-white">S30</span>
        <span className="absolute -bottom-1 left-1 h-1 w-7 -skew-x-12 rounded bg-brand" />
      </span>
      <span className="font-head text-lg font-extrabold tracking-tight text-white">
        SHOPIN<span className="text-brand">30</span>
      </span>
    </a>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        {/* Nav desktop */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={waLink("Bonjour SHOPIN30 👋 J'ai une question sur vos services.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-brand/40 px-4 py-2 text-sm font-semibold text-brand transition-colors hover:bg-brand/10"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <a
            href="#commander"
            className="rounded-full bg-brand px-4 py-2 text-sm font-bold text-ink transition-colors hover:bg-brand-dark"
          >
            Commander à -30 %
          </a>
        </div>

        {/* Burger mobile */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white lg:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Panneau mobile */}
      <div
        className={cn(
          "overflow-hidden border-t border-white/5 bg-ink transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-96" : "max-h-0 border-t-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Navigation mobile">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#commander"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-brand px-4 py-2.5 text-center text-sm font-bold text-ink"
          >
            Commander à -30 %
          </a>
          <a
            href={waLink("Bonjour SHOPIN30 👋 J'ai une question sur vos services.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-2 rounded-full border border-brand/40 px-4 py-2.5 text-sm font-semibold text-brand"
          >
            <MessageCircle className="h-4 w-4" />
            Écrire sur WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
