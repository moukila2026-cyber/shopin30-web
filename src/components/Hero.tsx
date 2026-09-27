import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { PROMO, waLink } from "../lib/constants";

const HIGHLIGHTS = [
  "Livraison dès 7 jours",
  "Support 7 j/7 sur WhatsApp",
  "Wave · Orange Money · Moov",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      {/* Halo décoratif */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-125 w-200 -translate-x-1/2 rounded-full bg-brand/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 font-code text-xs font-bold uppercase tracking-wider text-brand">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            -{PROMO.percent} % de lancement — code {PROMO.code}
          </p>

          <h1 className="mt-6 font-display text-5xl leading-[0.95] tracking-tight text-white uppercase sm:text-6xl lg:text-7xl">
            Sites web,
            <br />
            apps &amp; <span className="text-brand">CRM WhatsApp</span>
            <br />
            pour l'Afrique.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-400 sm:text-lg">
            SHOPIN30 conçoit des sites web, applications web et CRM connectés à
            WhatsApp, sur mesure, pour entreprises, PME et particuliers — partout
            en Afrique.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#commander"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-bold text-ink transition-transform hover:scale-[1.02]"
            >
              Commander maintenant
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={waLink(
                "Bonjour SHOPIN30 👋 Je veux un site / une app / un CRM WhatsApp. Comment profiter du -30 % ?",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-brand/50 hover:text-brand"
            >
              <MessageCircle className="h-4 w-4" />
              Écrire sur WhatsApp
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 text-brand" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Visuel : maquette de site + bulles */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="animate-float rounded-2xl border border-white/10 bg-panel shadow-2xl shadow-black/60">
            {/* Barre navigateur */}
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
              <span className="ml-3 flex-1 truncate rounded-md bg-white/5 px-3 py-1 font-code text-[10px] text-zinc-500">
                https://votre-business.africa
              </span>
            </div>
            {/* Contenu du site maquette */}
            <div className="space-y-3 p-5">
              <div className="h-3 w-1/3 rounded bg-brand/80" />
              <div className="h-2.5 w-4/5 rounded bg-white/10" />
              <div className="h-2.5 w-3/5 rounded bg-white/10" />
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="h-16 rounded-lg bg-panel-2" />
                <div className="h-16 rounded-lg bg-panel-2" />
                <div className="h-16 rounded-lg bg-panel-2" />
              </div>
              <div className="mt-2 flex items-center gap-3">
                <div className="h-9 w-28 rounded-full bg-brand" />
                <div className="h-9 w-28 rounded-full border border-white/15" />
              </div>
            </div>
          </div>

          {/* Badge -30 % */}
          <div className="absolute -top-5 -right-3 rotate-6 rounded-xl bg-brand px-4 py-2 font-display text-xl text-ink shadow-lg shadow-brand/30 sm:-right-6">
            -{PROMO.percent} %
          </div>

          {/* Bulle WhatsApp */}
          <div className="absolute -bottom-6 -left-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-panel-2 px-4 py-3 shadow-xl shadow-black/50 sm:-left-8">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-wa">
              <MessageCircle className="h-5 w-5 text-white" />
            </span>
            <div>
              <p className="text-xs font-bold text-white">Nouvelle commande !</p>
              <p className="font-code text-[10px] text-zinc-500">via WhatsApp · à l'instant</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
