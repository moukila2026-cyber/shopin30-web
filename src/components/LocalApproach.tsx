import { Check, MessageCircle, Smartphone } from "lucide-react";
import { waLink } from "../lib/constants";

const PHOTOS = [
  {
    className: "local-photo-commerce",
    src: `${import.meta.env.BASE_URL}images/usecase-commerce-abidjan.jpg`,
    alt: "Entrepreneuse ivoirienne dans sa boutique, confirmant une commande sur son téléphone.",
    label: "COMMERCE · VENTE EN LIGNE",
    title: "Vos produits, accessibles sur mobile.",
  },
  {
    className: "local-photo-services",
    src: `${import.meta.env.BASE_URL}images/usecase-services-abidjan.jpg`,
    alt: "Une entrepreneuse et un consultant ivoiriens échangent autour d'un ordinateur dans un bureau à Abidjan.",
    label: "SERVICES · SUIVI CLIENT",
    title: "Un échange simple, un suivi clair.",
  },
];

export default function LocalApproach() {
  const contactLink = waLink(
    "Bonjour SHOPIN30, je souhaite parler d'une solution digitale adaptée à mon activité. Pouvez-vous me conseiller ?",
  );

  return (
    <section className="section local-approach-section" id="approche-locale">
      <div className="container local-approach-container">
        <div className="local-approach-copy" data-reveal>
          <p className="eyebrow"><span className="eyebrow-dash" /> PENSÉ POUR L'AFRIQUE DE L'OUEST</p>
          <h2>Votre réalité mérite<br /><span>un outil à sa mesure.</span></h2>
          <p className="local-approach-intro">
            Que vos clients vous écrivent sur WhatsApp, commandent depuis leur téléphone ou que vous suiviez encore votre activité sur papier, on part de vos habitudes pour créer une solution vraiment utile.
          </p>

          <ul className="local-benefits">
            <li><span><Smartphone size={16} aria-hidden="true" /></span><span>Une expérience pensée d'abord pour le mobile</span></li>
            <li><span><MessageCircle size={16} aria-hidden="true" /></span><span>WhatsApp intégré quand c'est pertinent pour vous</span></li>
            <li><span><Check size={16} aria-hidden="true" /></span><span>Budget et périmètre expliqués en FCFA avant de commencer</span></li>
          </ul>

          <a className="button button-primary local-approach-cta" href={contactLink} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={17} aria-hidden="true" />
            Parlons de votre activité
          </a>
          <p className="local-approach-note">Premier échange sans engagement · devis cadré avant le démarrage</p>
        </div>

        <div className="local-approach-visuals">
          <div className="local-photo-grid">
            {PHOTOS.map((photo) => (
              <figure className={`local-photo ${photo.className}`} key={photo.className} data-reveal>
                <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
                <figcaption>
                  <span>{photo.label}</span>
                  <strong>{photo.title}</strong>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="local-visual-note">Exemples de contextes métiers · visuels illustratifs</p>
        </div>
      </div>
    </section>
  );
}
