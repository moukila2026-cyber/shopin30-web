import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, MessageCircle } from "lucide-react";
import { SERVICE_LABELS, SERVICES, waLink, WHATSAPP_DISPLAY, type ServiceId } from "../lib/constants";

type Status = "idle" | "error";

interface Props {
  service: ServiceId;
  onServiceChange: (service: ServiceId) => void;
}

const INPUT_CLASS = "form-input";

export default function OrderForm({ service, onServiceChange }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nom = String(data.get("nom") ?? "").trim();
    const prenom = String(data.get("prenom") ?? "").trim();
    const entreprise = String(data.get("entreprise") ?? "").trim();
    const telephone = String(data.get("telephone") ?? "").trim();

    if (!nom || !prenom || !telephone) {
      setStatus("error");
      setErrorMessage("Merci de remplir votre nom, votre prénom et votre numéro de téléphone.");
      return;
    }
    const digits = telephone.replace(/\D/g, "");
    if (digits.length < 8 || digits.length > 15) {
      setStatus("error");
      setErrorMessage("Vérifiez le numéro de téléphone (8 à 15 chiffres, indicatif pays compris).");
      return;
    }

    const message = [
      "Bonjour SHOPIN30 👋",
      "Je souhaite commander un projet digital.",
      "",
      `Nom : ${nom}`,
      `Prénom : ${prenom}`,
      `Entreprise / business : ${entreprise || "Non renseigné"}`,
      `Téléphone : ${telephone}`,
      `Service souhaité : ${SERVICE_LABELS[service]}`,
      "",
      "Merci de me contacter pour une meilleure prise en charge de ma demande.",
    ].join("\n");

    window.location.assign(waLink(message));
  }

  const directContact = waLink("Bonjour SHOPIN30, je souhaite être accompagné pour mon projet.");

  return (
    <section className="section order-section" id="commander">
      <div className="container order-container">
        <div className="order-copy" data-reveal>
          <p className="eyebrow"><span className="eyebrow-dash" /> PARLONS DE VOTRE PROJET</p>
          <h2>Votre prochaine<br /><span>étape commence ici.</span></h2>
          <p className="order-lead">Renseignez vos coordonnées et le service souhaité. Votre demande sera préparée dans WhatsApp pour que vous puissiez nous l'envoyer directement.</p>
          <div className="order-promise-list">
            <div><span><CheckCircle2 size={16} /></span><p>Un échange direct, sans jargon.</p></div>
            <div><span><CheckCircle2 size={16} /></span><p>Un conseil adapté à votre besoin.</p></div>
            <div><span><CheckCircle2 size={16} /></span><p>La maintenance n'est pas incluse dans le forfait.</p></div>
          </div>
          <a className="order-whatsapp-link" href={directContact} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={17} /> Nous contacter directement <span>{WHATSAPP_DISPLAY}</span>
          </a>
        </div>

        <div className="order-card" data-reveal>
          <div className="order-card-top"><div><span>DEMANDE DE PROJET</span><h3>Quelques informations</h3></div><span className="order-step">01 <i>/</i> 01</span></div>
          <form className="order-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="order-nom">Nom <span>*</span></label>
                <input className={INPUT_CLASS} id="order-nom" name="nom" autoComplete="family-name" maxLength={100} required placeholder="Ex. Koné" />
              </div>
              <div className="form-field">
                <label htmlFor="order-prenom">Prénom <span>*</span></label>
                <input className={INPUT_CLASS} id="order-prenom" name="prenom" autoComplete="given-name" maxLength={100} required placeholder="Ex. Aminata" />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="order-entreprise">Nom de l'entreprise / business <span className="optional">Optionnel</span></label>
              <input className={INPUT_CLASS} id="order-entreprise" name="entreprise" autoComplete="organization" maxLength={160} placeholder="Ex. Ma boutique" />
            </div>
            <div className="form-field">
              <label htmlFor="order-telephone">Numéro de téléphone <span>*</span></label>
              <input className={INPUT_CLASS} id="order-telephone" name="telephone" type="tel" autoComplete="tel" inputMode="tel" maxLength={40} required placeholder="+225 05 01 30 33 43" />
              <small>Indicatif pays inclus. WhatsApp de préférence pour faciliter le suivi.</small>
            </div>
            <fieldset className="service-choice">
              <legend>Type de service souhaité <span>*</span></legend>
              <div className="service-choice-grid">
                {SERVICES.map((item) => (
                  <button key={item.id} type="button" className={`service-choice-button${service === item.id ? " is-selected" : ""}`} onClick={() => onServiceChange(item.id)} aria-pressed={service === item.id}>
                    <span className="choice-indicator" /><span>{SERVICE_LABELS[item.id]}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            {status === "error" && (
              <div className="form-error" role="alert">
                <AlertCircle size={18} aria-hidden="true" />
                <div><strong>Vérifiez les informations saisies.</strong><p>{errorMessage}</p></div>
              </div>
            )}

            <button type="submit" className="button button-primary submit-button">
              Envoyer ma demande <MessageCircle size={17} aria-hidden="true" />
            </button>
            <p className="form-privacy">WhatsApp s'ouvrira avec votre demande préremplie. Vérifiez le message puis appuyez sur « Envoyer » dans WhatsApp pour nous le transmettre.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
