import { useMemo, useState } from "react";
import { ArrowRight, Info } from "lucide-react";
import {
  formatFCFA,
  promoPrice,
  PROMO,
  SERVICES,
  type ServiceId,
} from "../lib/constants";
import { cn } from "../lib/utils";

interface Option {
  id: string;
  label: string;
  price: number;
}

const OPTIONS: Record<ServiceId, Option[]> = {
  site: [
    { id: "shop", label: "Boutique en ligne (paiement mobile)", price: 100000 },
    { id: "blog", label: "Blog / actualités", price: 40000 },
    { id: "lang", label: "Version bilingue (FR + EN)", price: 50000 },
  ],
  app: [
    { id: "mobile-money", label: "Paiement Wave / OM / Moov intégré", price: 150000 },
    { id: "notif", label: "Notifications WhatsApp automatiques", price: 100000 },
    { id: "exports", label: "Exports PDF & Excel", price: 60000 },
  ],
  crm: [
    { id: "relance", label: "Relances paniers abandonnés", price: 60000 },
    { id: "equipe", label: "Multi-agents (jusqu'à 5)", price: 80000 },
    { id: "catalogue", label: "Catalogue produits intégré", price: 70000 },
  ],
};

interface Props {
  onSelect: (service: ServiceId) => void;
}

export default function Calculator({ onSelect }: Props) {
  const [serviceId, setServiceId] = useState<ServiceId>("site");
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const service = SERVICES.find((s) => s.id === serviceId)!;

  const { base, total, totalPromo } = useMemo(() => {
    const extras = OPTIONS[serviceId]
      .filter((o) => checked[`${serviceId}:${o.id}`])
      .reduce((sum, o) => sum + o.price, 0);
    const t = service.price + extras;
    return { base: service.price, total: t, totalPromo: promoPrice(t) };
  }, [serviceId, checked, service.price]);

  const toggle = (optionId: string) => {
    const key = `${serviceId}:${optionId}`;
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section id="tarifs" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:grid lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="font-code text-xs font-bold uppercase tracking-[0.2em] text-brand">
            Estimateur
          </p>
          <h2 className="mt-3 font-display text-4xl uppercase text-white sm:text-5xl">
            Estimez votre projet
          </h2>
          <p className="mt-4 text-zinc-400">
            Choisissez un service, ajoutez des options, et voyez immédiatement
            le prix avec la remise de lancement appliquée.
          </p>

          {/* Choix du service */}
          <div className="mt-8 flex flex-wrap gap-3">
            {SERVICES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setServiceId(s.id)}
                className={cn(
                  "rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors",
                  s.id === serviceId
                    ? "border-brand bg-brand text-ink"
                    : "border-white/15 text-zinc-300 hover:border-brand/50 hover:text-white",
                )}
              >
                {s.name}
              </button>
            ))}
          </div>

          {/* Options */}
          <div className="mt-8 space-y-3">
            <p className="font-head text-sm font-bold uppercase tracking-wider text-zinc-500">
              Options pour « {service.name} »
            </p>
            {OPTIONS[serviceId].map((option) => {
              const active = !!checked[`${serviceId}:${option.id}`];
              return (
                <label
                  key={option.id}
                  className={cn(
                    "flex cursor-pointer items-center justify-between gap-4 rounded-xl border p-4 transition-colors",
                    active
                      ? "border-brand/60 bg-brand/10"
                      : "border-white/10 bg-panel hover:border-white/25",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() => toggle(option.id)}
                      className="h-4 w-4 accent-[#d4f926]"
                    />
                    <span className="text-sm text-white">{option.label}</span>
                  </span>
                  <span className="shrink-0 font-code text-xs text-brand">
                    +{formatFCFA(option.price)}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Résultat */}
        <div className="mt-12 lg:mt-0">
          <div className="sticky top-24 rounded-2xl border border-brand/30 bg-gradient-to-b from-brand/10 to-panel p-7">
            <p className="font-code text-xs font-bold uppercase tracking-wider text-zinc-400">
              Votre estimation
            </p>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-zinc-400">Base — {service.name}</dt>
                <dd className="font-code text-white">{formatFCFA(base)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-zinc-400">Sous-total</dt>
                <dd className="font-code text-zinc-500 line-through">{formatFCFA(total)}</dd>
              </div>
              <div className="flex justify-between text-brand">
                <dt>Remise lancement -{PROMO.percent} %</dt>
                <dd className="font-code">-{formatFCFA(total - totalPromo)}</dd>
              </div>
            </dl>
            <div className="mt-5 border-t border-white/10 pt-5">
              <p className="text-sm text-zinc-400">Total estimé à partir de</p>
              <p className="mt-1 font-display text-5xl text-brand">{formatFCFA(totalPromo)}</p>
            </div>

            <button
              type="button"
              onClick={() => onSelect(serviceId)}
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3.5 text-sm font-bold text-ink transition-transform hover:scale-[1.02]"
            >
              Commander « {service.name} »
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-zinc-500">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Estimation indicative « à partir de ». Le devis final, ferme et sans
              surprise, est confirmé ensemble après votre commande.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
