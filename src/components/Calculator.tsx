import { useMemo, useState, type CSSProperties } from "react";
import { ArrowRight, Info, Layers3, MessageCircle } from "lucide-react";
import { formatFCFA, SERVICES, waLink, type ServiceId } from "../lib/constants";

interface Props {
  onSelect: (service: ServiceId) => void;
}

/** Les services sur devis (contact direct WhatsApp) ne passent pas par l'estimation. */
const ESTIMABLE_SERVICES = SERVICES.filter((item) => !item.contactOnly);
const CONTACT_ONLY_SERVICE = SERVICES.find((item) => item.contactOnly);

function roundToFiveThousand(value: number): number {
  return Math.round(value / 5_000) * 5_000;
}

export default function Calculator({ onSelect }: Props) {
  const [serviceId, setServiceId] = useState<ServiceId>("site");
  const [scope, setScope] = useState(3);
  const service = ESTIMABLE_SERVICES.find((item) => item.id === serviceId)!;
  const scopeProgress = ((scope - 1) / 7) * 100;

  const estimate = useMemo(() => {
    const minPrice = service.minPrice ?? 0;
    const maxPrice = service.maxPrice ?? 0;
    const distance = maxPrice - minPrice;
    const progress = (scope - 1) / 7;
    const low = minPrice + distance * (0.08 + progress * 0.42);
    const high = minPrice + distance * (0.46 + progress * 0.46);
    return {
      low: roundToFiveThousand(low),
      high: roundToFiveThousand(high),
    };
  }, [scope, service]);

  return (
    <section className="section calculator-section" id="estimation">
      <div className="container calculator-container">
        <div className="calculator-copy" data-reveal>
          <p className="eyebrow"><span className="eyebrow-dash" /> ESTIMATION RAPIDE</p>
          <h2>Une première idée<br /><span>de votre budget.</span></h2>
          <p className="calculator-intro">Répondez à deux questions pour obtenir une fourchette indicative. Le devis précis sera défini après échange.</p>
          <div className="calculator-assurance"><span><Layers3 size={17} /></span><p><strong>À votre rythme.</strong><br />Votre estimation ne vous engage pas.</p></div>
        </div>

        <div className="calculator-panel" data-reveal>
          <div className="calculator-step-label"><span>01</span><div><strong>Quel service recherchez-vous ?</strong><small>Choisissez une solution</small></div></div>
          <div className="calculator-options" role="group" aria-label="Type de service souhaité">
            {ESTIMABLE_SERVICES.map((item) => (
              <button key={item.id} type="button" className={`calculator-option${serviceId === item.id ? " is-selected" : ""}`} aria-pressed={serviceId === item.id} onClick={() => setServiceId(item.id)}>
                <span>{item.shortName}</span>
                <i aria-hidden="true" />
              </button>
            ))}
          </div>
          {CONTACT_ONLY_SERVICE && (
            <a
              className="calculator-video-hint"
              href={waLink(CONTACT_ONLY_SERVICE.contactMessage ?? "Bonjour SHOPIN30, j'aimerais parler de mon projet.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={13} aria-hidden="true" />
              <span><strong>{CONTACT_ONLY_SERVICE.shortName} ?</strong> Sur devis — contactez-nous directement sur WhatsApp pour en discuter.</span>
              <ArrowRight size={13} aria-hidden="true" />
            </a>
          )}

          <div className="calculator-divider" />

          <div className="calculator-step-label"><span>02</span><div><strong>{service.scopeQuestion}</strong><small>Faites glisser le curseur selon votre besoin</small></div></div>
          <div className="scope-row"><span>1 {service.scopeUnit === "pages" ? "page" : service.scopeUnit.slice(0, -1)}</span><strong>{scope} {service.scopeUnit}</strong><span>8+</span></div>
          <input
            className="scope-slider"
            type="range"
            min="1"
            max="8"
            step="1"
            value={scope}
            onChange={(event) => setScope(Number(event.target.value))}
            style={{ "--range-progress": `${scopeProgress}%` } as CSSProperties}
            aria-label={service.scopeQuestion}
          />
          <div className="scope-scale"><span>Essentiel</span><span>Plus complet</span></div>

          <div className="estimate-result" aria-live="polite">
            <div className="estimate-result-label"><span>VOTRE ESTIMATION INDICATIVE</span><Info size={15} aria-hidden="true" /></div>
            <p className="estimate-range"><span>{formatFCFA(estimate.low)}</span><i>—</i><span>{formatFCFA(estimate.high)}</span></p>
            <p className="estimate-selected">{service.name} <span>·</span> {scope} {service.scopeUnit}</p>
          </div>
          <button className="button button-primary calculator-submit" type="button" onClick={() => onSelect(serviceId)}>
            Continuer avec cette estimation <ArrowRight size={17} aria-hidden="true" />
          </button>
          <p className="estimate-note"><Info size={14} aria-hidden="true" /> Estimation indicative. Le tarif final dépend du nombre de pages et des fonctionnalités demandées.</p>
        </div>
      </div>
    </section>
  );
}
