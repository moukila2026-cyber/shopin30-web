import { Bot, Globe2, Layers3 } from "lucide-react";

const PILLARS = [
  {
    icon: Globe2,
    label: "ACQUISITION ORGANIQUE",
    title: "Être trouvé, puis choisi.",
    text: "Une base rapide et bien structurée pour le référencement naturel, avec des contenus pensés pour circuler sur les réseaux sociaux et attirer des clients sans dépendre uniquement de la publicité.",
  },
  {
    icon: Bot,
    label: "AUTOMATISATION & IA",
    title: "Répéter moins. Avancer plus.",
    text: "Des automatisations et assistants virtuels peuvent prendre en charge les tâches répétitives et améliorer le support client.",
  },
  {
    icon: Layers3,
    label: "NOUVEAUX REVENUS",
    title: "Une solution qui évolue.",
    text: "Sites transactionnels, micro-services, SaaS IA, abonnements ou partenariats : construisez la suite à votre rythme.",
  },
];

export default function Growth() {
  return (
    <section className="section growth-section">
      <div className="container growth-container">
        <div className="growth-intro" data-reveal>
          <p className="eyebrow"><span className="eyebrow-dash" /> CONÇU POUR LA SUITE</p>
          <h2>Le digital qui vous aide<br /><span>à grandir en 2026.</span></h2>
          <p className="growth-intro-copy">
            Les bons outils attirent les clients, simplifient les opérations et ouvrent de nouvelles façons de vendre.
          </p>
        </div>
        <div className="growth-grid">
          {PILLARS.map(({ icon: Icon, label, title, text }, index) => (
            <article className="growth-card" key={label} data-reveal>
              <div className="growth-card-top"><Icon size={20} strokeWidth={1.8} aria-hidden="true" /><span>0{index + 1}</span></div>
              <p className="growth-label">{label}</p>
              <h3>{title}</h3>
              <p className="growth-text">{text}</p>
            </article>
          ))}
        </div>
        <p className="growth-footnote" data-reveal>Chaque intégration — notamment les fonctions IA — est étudiée selon votre usage, votre budget et les outils déjà en place.</p>
      </div>
    </section>
  );
}
