import { ArrowRight, Check, Clapperboard, Globe2, LayoutDashboard, MessageCircle, MessageSquareText } from "lucide-react";
import { formatFCFA, SERVICES, type Service, type ServiceId, waLink } from "../lib/constants";

const ICONS: Record<ServiceId, typeof Globe2> = {
  site: Globe2,
  app: LayoutDashboard,
  crm: MessageSquareText,
  video: Clapperboard,
};

interface Props {
  onSelect: (service: ServiceId) => void;
}

function ServiceCard({ service, index, onSelect }: { service: Service; index: number; onSelect: Props["onSelect"] }) {
  const Icon = ICONS[service.id];

  return (
    <article className={`service-card${service.id === "crm" ? " service-card-featured" : ""}${service.isNew ? " service-card-new" : ""}`} data-reveal>
      {service.isNew && <span className="service-new-badge">Nouveau</span>}
      <div className="service-card-top">
        <span className="service-icon"><Icon size={21} strokeWidth={1.7} aria-hidden="true" /></span>
        <span className="service-number">0{index + 1} / 0{SERVICES.length}</span>
      </div>
      <h3>{service.name}</h3>
      <p className="service-description">{service.tagline}</p>

      {service.contactOnly ? (
        <>
          <div className="service-price-block">
            <span className="price-caption">Tarif</span>
            <p className="service-price service-price-contact">Sur devis, selon votre projet</p>
          </div>
          <div className="service-maintenance-note service-contact-note">
            <span>ÉCHANGE DIRECT</span>
            <strong>On en discute ensemble sur WhatsApp</strong>
          </div>
        </>
      ) : (
        <>
          <div className="service-price-block">
            <span className="price-caption">Fourchette de prix</span>
            <p className="service-price">
              <span>{formatFCFA(service.minPrice ?? 0)}</span>
              <span className="price-dash">—</span>
              <span>{formatFCFA(service.maxPrice ?? 0)}</span>
            </p>
          </div>
          <div className="service-maintenance-note">
            <span>MAINTENANCE</span>
            <strong>Non incluse dans le forfait</strong>
          </div>
        </>
      )}

      <ul className="service-features">
        {service.features.map((feature) => (
          <li key={feature}><Check size={15} aria-hidden="true" /><span>{feature}</span></li>
        ))}
      </ul>
      {service.contactOnly ? (
        <a
          className="service-link service-link-whatsapp"
          href={waLink(service.contactMessage ?? "Bonjour SHOPIN30, j'aimerais parler de mon projet.")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="service-link-whatsapp-text"><MessageCircle size={15} aria-hidden="true" /> Discuter sur WhatsApp</span>
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      ) : (
        <button type="button" className="service-link" onClick={() => onSelect(service.id)}>
          Choisir ce service <ArrowRight size={16} aria-hidden="true" />
        </button>
      )}
    </article>
  );
}

export default function Services({ onSelect }: Props) {
  const contactLink = waLink("Bonjour SHOPIN30, j'aimerais être conseillé sur le service le plus adapté à mon besoin et les options de maintenance.");

  return (
    <section className="section services-section" id="services">
      <div className="section-photo-bg" aria-hidden="true">
        <img
          src={`${import.meta.env.BASE_URL}images/services-backdrop.jpg`}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="container">
        <div className="section-heading section-heading-row" data-reveal>
          <div>
            <p className="eyebrow"><span className="eyebrow-dash" /> NOS SERVICES</p>
            <h2>Le bon outil pour<br /><span>faire avancer votre activité.</span></h2>
          </div>
          <p className="section-lead">
            Du site professionnel à la vidéo publicitaire conçue par IA, chaque solution est cadrée selon votre objectif, votre budget et les besoins réels de votre activité.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} onSelect={onSelect} />
          ))}
        </div>
        <p className="pricing-note" data-reveal>
          <span className="pricing-note-icon">i</span>
          Le tarif final dépend du nombre de pages et des fonctionnalités demandées. Pour la vidéo IA &amp; Motion Design, le tarif est défini ensemble sur WhatsApp.
        </p>
        <div className="service-contact-callout" data-reveal>
          <p><strong>Pour une meilleure prise en charge, contactez-nous directement sur WhatsApp.</strong><br />Nous vous conseillerons sur le service, le périmètre et les options de maintenance.</p>
          <a href={contactLink} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} aria-hidden="true" /> Nous contacter sur WhatsApp <ArrowRight size={15} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
