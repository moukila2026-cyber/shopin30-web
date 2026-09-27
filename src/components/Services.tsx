import { BadgePercent, Check, Globe, LayoutDashboard, MessageSquareText } from "lucide-react";
import {
  formatFCFA,
  promoPrice,
  PROMO,
  SERVICES,
  type Service,
  type ServiceId,
} from "../lib/constants";
import { cn } from "../lib/utils";

const ICONS: Record<ServiceId, typeof Globe> = {
  site: Globe,
  app: LayoutDashboard,
  crm: MessageSquareText,
};

interface Props {
  onSelect: (service: ServiceId) => void;
}

function ServiceCard({ service, onSelect }: { service: Service; onSelect: Props["onSelect"] }) {
  const Icon = ICONS[service.id];
  const reduced = promoPrice(service.price);

  return (
    <article
      className={cn(
        "relative flex flex-col rounded-2xl border p-7 transition-transform hover:-translate-y-1",
        service.highlight
          ? "border-brand/50 bg-gradient-to-b from-brand/10 to-panel shadow-xl shadow-brand/5"
          : "border-white/10 bg-panel",
      )}
    >
      {service.highlight && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-1 font-code text-[10px] font-bold uppercase tracking-wider text-ink">
          Le plus demandé
        </span>
      )}

      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="font-head text-xl font-extrabold text-white">{service.name}</h3>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-zinc-400">{service.tagline}</p>

      {/* Prix */}
      <div className="mt-5 flex items-end gap-3">
        <span className="text-sm text-zinc-500 line-through">{formatFCFA(service.price)}</span>
        <span className="font-display text-3xl text-brand">{formatFCFA(reduced)}</span>
      </div>
      <p className="mt-1 font-code text-[11px] uppercase tracking-wider text-zinc-500">
        À partir de · -{PROMO.percent} % appliqué
      </p>

      <ul className="mt-6 flex-1 space-y-2.5">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-zinc-300">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
            {feature}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => onSelect(service.id)}
        className={cn(
          "mt-7 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-colors",
          service.highlight
            ? "bg-brand text-ink hover:bg-brand-dark"
            : "border border-brand/40 text-brand hover:bg-brand/10",
        )}
      >
        <BadgePercent className="h-4 w-4" />
        Commander à -{PROMO.percent} %
      </button>
    </article>
  );
}

export default function Services({ onSelect }: Props) {
  return (
    <section id="services" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="font-code text-xs font-bold uppercase tracking-[0.2em] text-brand">
            Nos services
          </p>
          <h2 className="mt-3 font-display text-4xl uppercase text-white sm:text-5xl">
            Tout pour vendre en ligne
          </h2>
          <p className="mt-4 text-zinc-400">
            Du simple site vitrine à l'application complète avec CRM WhatsApp :
            une équipe, un interlocuteur, un résultat.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} onSelect={onSelect} />
          ))}
        </div>
      </div>
    </section>
  );
}
