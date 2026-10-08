import { ArrowRight, ClipboardList, MessagesSquare, Rocket, Sparkles } from "lucide-react";

const STEPS = [
  { num: "01", icon: MessagesSquare, title: "On échange", text: "Vous nous expliquez votre activité, votre idée et ce que vous voulez améliorer." },
  { num: "02", icon: ClipboardList, title: "Vous validez le cadre", text: "Nous précisons les fonctionnalités, le budget et le délai avant de commencer." },
  { num: "03", icon: Sparkles, title: "On conçoit", text: "Nous créons votre solution et partageons les avancées pour recueillir vos retours." },
  { num: "04", icon: Rocket, title: "Vous démarrez", text: "Après validation, nous livrons votre outil et vous accompagnons pour la prise en main." },
];

export default function Process() {
  return (
    <section className="section process-section" id="methode">
      <div className="container">
        <div className="section-heading section-heading-row" data-reveal>
          <div><p className="eyebrow"><span className="eyebrow-dash" /> NOTRE MÉTHODE</p><h2>De l'idée à la mise<br /><span>en service, simplement.</span></h2></div>
          <p className="section-lead">Un parcours lisible, avec un interlocuteur et un cadre clair à chaque étape.</p>
        </div>
        <ol className="steps-grid">
          {STEPS.map(({ num, icon: Icon, title, text }, index) => (
            <li className="step-card" key={num} data-reveal>
              <div className="step-top"><span className="step-number">{num}</span><span className="step-icon"><Icon size={19} aria-hidden="true" /></span></div>
              <h3>{title}</h3>
              <p>{text}</p>
              {index < STEPS.length - 1 && <ArrowRight className="step-arrow" size={17} aria-hidden="true" />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
