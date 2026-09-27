import { MapPin, MessageCircle } from "lucide-react";
import { waLink, WHATSAPP_DISPLAY } from "../lib/constants";
import { Logo } from "./Header";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-panel/60">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
              Sites web, applications web et CRM connectés à WhatsApp — sur mesure,
              pour entreprises, PME et particuliers partout en Afrique.
            </p>
          </div>

          <nav aria-label="Liens de pied de page">
            <p className="font-head text-sm font-bold uppercase tracking-wider text-white">
              Navigation
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-zinc-400">
              <li><a href="#services" className="transition-colors hover:text-brand">Services</a></li>
              <li><a href="#realisations" className="transition-colors hover:text-brand">Réalisations</a></li>
              <li><a href="#processus" className="transition-colors hover:text-brand">Processus</a></li>
              <li><a href="#tarifs" className="transition-colors hover:text-brand">Tarifs</a></li>
              <li><a href="#commander" className="transition-colors hover:text-brand">Commander</a></li>
            </ul>
          </nav>

          <div>
            <p className="font-head text-sm font-bold uppercase tracking-wider text-white">
              Contact
            </p>
            <a
              href={waLink("Bonjour SHOPIN30 👋")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-wa px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.03]"
            >
              <MessageCircle className="h-4 w-4" />
              {WHATSAPP_DISPLAY}
            </a>
            <p className="mt-4 flex items-center gap-2 text-sm text-zinc-400">
              <MapPin className="h-4 w-4 text-brand" />
              Abidjan, Côte d'Ivoire — clients dans toute l'Afrique
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-6 text-center text-xs leading-relaxed text-zinc-500">
          <p>
            © {new Date().getFullYear()} SHOPIN30. Tous droits réservés. Prix affichés
            « à partir de » — devis personnalisé selon vos besoins.
          </p>
          <p className="mt-1">
            Fait avec passion en Afrique · Paiements Wave, Orange Money, Moov acceptés
          </p>
        </div>
      </div>
    </footer>
  );
}
