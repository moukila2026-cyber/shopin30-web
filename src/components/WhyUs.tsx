import { Clock3, Handshake, MessageCircle, SlidersHorizontal } from "lucide-react";

const REASONS = [
  {
    icon: Clock3,
    index: "01",
    title: "Livraison rapide",
    text: "Votre projet prêt en quelques jours, avec un calendrier confirmé selon le périmètre.",
  },
  {
    icon: SlidersHorizontal,
    index: "02",
    title: "Budget clair",
    text: "Des prix adaptés à votre budget, sans mauvaise surprise : le tarif et le périmètre sont définis avant le démarrage.",
  },
  {
    icon: MessageCircle,
    index: "03",
    title: "Proches, partout en Afrique",
    text: "Un accompagnement de proximité, disponible sur WhatsApp pour les entreprises, PME et particuliers à travers l'Afrique.",
  },
  {
    icon: Handshake,
    index: "04",
    title: "Vraiment sur mesure",
    text: "Une solution adaptée à votre activité et à vos usages, jamais un modèle générique.",
  },
];

export default function WhyUs() {
  return (
    <section className="section why-section">
      <div className="container">
        <div className="section-heading" data-reveal>
          <p className="eyebrow"><span className="eyebrow-dash" /> POURQUOI SHOPIN30</p>
          <h2>Un partenaire proche.<br /><span>Un résultat concret.</span></h2>
        </div>
        <div className="reasons-grid">
          {REASONS.map(({ icon: Icon, index, title, text }) => (
            <article className="reason-card" key={title} data-reveal>
              <div className="reason-card-top"><span className="reason-icon"><Icon size={19} strokeWidth={1.8} aria-hidden="true" /></span><span>{index}</span></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
