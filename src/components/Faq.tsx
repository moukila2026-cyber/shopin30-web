import { useState } from "react";
import { ChevronDown } from "lucide-react";

const QUESTIONS = [
  {
    question: "Combien de temps ça prend ?",
    answer: "Le délai dépend du service choisi et du périmètre. Un projet simple peut être prêt en quelques jours ; pour une application ou des fonctionnalités plus avancées, nous confirmons un calendrier réaliste dans le devis avant de commencer.",
  },
  {
    question: "Comment se passe le paiement ?",
    answer: "Les modalités et l'échéancier sont précisés dans votre devis avant toute validation. Le projet démarre uniquement après accord sur le périmètre, le budget et les conditions de paiement.",
  },
  {
    question: "Que se passe-t-il après la commande ?",
    answer: "Nous reprenons contact par téléphone ou sur WhatsApp pour comprendre votre activité et préciser les pages ou fonctionnalités souhaitées. Vous recevez ensuite un devis détaillé et un délai prévisionnel à valider.",
  },
  {
    question: "Comment fonctionnent le nom de domaine et l’hébergement ?",
    answer: "Le nom de domaine est votre adresse sur Internet (par exemple : votreentreprise.com). L’hébergement permet de rendre votre site web ou votre mini-application accessible en ligne. Nous vous accompagnons pour choisir un domaine ou réutiliser une adresse existante, puis définir un hébergement adapté. Une mini-application peut aussi utiliser un sous-domaine (par exemple : app.votreentreprise.com). Le devis précise les frais de mise en ligne, les éventuels abonnements et les renouvellements du domaine et de l’hébergement. Ces éléments sont distincts de la maintenance, qui n’est pas incluse dans le forfait.",
  },
  {
    question: "Peut-on demander des modifications ?",
    answer: "Oui. Les étapes de retours et de validation sont prévues pendant la conception. Si une demande modifie le périmètre convenu, nous vous expliquons clairement l'impact éventuel sur le prix et le délai avant de la réaliser.",
  },
  {
    question: "Pouvez-vous intégrer de l'IA ou automatiser certaines tâches ?",
    answer: "Oui, lorsque cela répond à un besoin précis : assistant virtuel, traitement de demandes récurrentes ou automatisation de processus. Nous étudions la faisabilité, les outils nécessaires et le coût avec vous avant de l'ajouter au projet.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section faq-section" id="faq">
      <div className="container faq-container">
        <div className="faq-intro" data-reveal>
          <p className="eyebrow"><span className="eyebrow-dash" /> FAQ</p>
          <h2>Des réponses<br /><span>avant de vous lancer.</span></h2>
          <p>Vous ne trouvez pas votre réponse ? Écrivez-nous directement sur WhatsApp, nous vous orienterons.</p>
          <a href="#commander" className="faq-anchor">Parler de mon projet <span aria-hidden="true">↗</span></a>
        </div>
        <div className="faq-list" data-reveal>
          {QUESTIONS.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-answer-${index}`;
            return (
              <article className={`faq-item${isOpen ? " is-open" : ""}`} key={item.question}>
                <button className="faq-question" type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpenIndex(isOpen ? null : index)}>
                  <span className="faq-number">0{index + 1}</span>
                  <span className="faq-question-text">{item.question}</span>
                  <span className="faq-chevron"><ChevronDown size={17} aria-hidden="true" /></span>
                </button>
                <div className="faq-answer-wrap" id={panelId} hidden={!isOpen}>
                  <p className="faq-answer">{item.answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
