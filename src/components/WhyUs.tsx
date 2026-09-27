import { MessageCircle, ShieldCheck, Smartphone, Zap } from "lucide-react";

const REASONS = [
  {
    icon: Zap,
    title: "Rapide comme l'éclair",
    text: "Site livré en 7 à 14 jours, pas en 3 mois. On avance vite, vous vendez vite.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp d'abord",
    text: "Tout se passe sur WhatsApp : suivi, aperçus, support. Pas de mail perdu, pas de jargon.",
  },
  {
    icon: ShieldCheck,
    title: "Paiement serein",
    text: "Wave, Orange Money, Moov ou virement. 50 % au lancement, le solde à la livraison.",
  },
  {
    icon: Smartphone,
    title: "Pensé pour l'Afrique",
    text: "Sites légers et rapides, même en 3G sur téléphone d'entrée de gamme. Vos clients, eux, voient tout.",
  },
];

export default function WhyUs() {
  return (
    <section className="border-y border-white/5 bg-panel/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="font-code text-xs font-bold uppercase tracking-[0.2em] text-brand">
            Pourquoi SHOPIN30
          </p>
          <h2 className="mt-3 font-display text-4xl uppercase text-white sm:text-5xl">
            Simple. Rapide. Fiable.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-ink p-6 transition-colors hover:border-brand/40"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-head text-lg font-bold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
