import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PROMO, WHATSAPP_DISPLAY } from "../lib/constants";
import { cn } from "../lib/utils";

const QA = [
  {
    q: "Combien de temps pour recevoir mon site ?",
    a: "Un site web est livré en 7 à 14 jours, un CRM WhatsApp en 1 à 2 semaines, et une application web en 2 à 4 semaines selon la complexité. Le calendrier exact est confirmé au moment du devis — et il est tenu.",
  },
  {
    q: "Comment se passent les paiements ?",
    a: `Par Wave, Orange Money, Moov Money ou virement bancaire. Vous payez 50 % au lancement du projet et le solde uniquement à la livraison. Aucun paiement caché, tout est écrit noir sur blanc.`,
  },
  {
    q: "Je n'ai ni logo, ni textes, ni photos… c'est grave ?",
    a: "Pas du tout. On vous accompagne : rédaction des textes, conseils pour les photos, création d'une identité visuelle simple si besoin. Vous venez avec votre idée, on s'occupe du reste.",
  },
  {
    q: "Le -30 % est valable jusqu'à quand ?",
    a: `L'offre de lancement dure 1 mois. Il suffit de mentionner le code ${PROMO.code} dans le formulaire ou sur WhatsApp avant la fin du compte à rebours. La remise s'applique à tous les services, sans condition.`,
  },
  {
    q: "Un CRM connecté à WhatsApp, c'est quoi exactement ?",
    a: "C'est un outil qui centralise tous vos clients et conversations WhatsApp au même endroit : suivi des ventes, historique de chaque client, messages automatiques de bienvenue et relances. Vous ne perdez plus aucun client entre deux discussions.",
  },
  {
    q: "Puis-je modifier mon site moi-même après la livraison ?",
    a: "Oui. Vous recevez une vidéo de formation claire et 30 jours de support offerts. Et si vous préférez, une offre de maintenance mensuelle existe pour qu'on gère tout à votre place.",
  },
  {
    q: "Vous travaillez avec quels pays ?",
    a: "Partout en Afrique : Côte d'Ivoire, Sénégal, Bénin, Togo, Burkina Faso, Mali, Cameroun et au-delà. Tout se fait à distance, essentiellement sur WhatsApp — simple et efficace.",
  },
  {
    q: "Comment vous contacter directement ?",
    a: `Le plus rapide : WhatsApp au ${WHATSAPP_DISPLAY}. Réponse garantie 7 j/7, généralement dans l'heure.`,
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 border-t border-white/5 bg-panel/40 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="text-center font-code text-xs font-bold uppercase tracking-[0.2em] text-brand">
          Questions fréquentes
        </p>
        <h2 className="mt-3 text-center font-display text-4xl uppercase text-white sm:text-5xl">
          On vous dit tout
        </h2>

        <div className="mt-12 space-y-3">
          {QA.map((item, i) => {
            const open = openIndex === i;
            return (
              <div
                key={item.q}
                className={cn(
                  "overflow-hidden rounded-xl border transition-colors",
                  open ? "border-brand/40 bg-ink" : "border-white/10 bg-ink/60",
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={open}
                >
                  <span className="font-head text-sm font-bold text-white sm:text-base">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-brand transition-transform",
                      open && "rotate-180",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-zinc-400">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
