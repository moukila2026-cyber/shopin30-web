import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, LoaderCircle, MessageCircle, Send } from "lucide-react";
import { CommandeError, submitCommande } from "../lib/commandes";
import { SERVICE_LABELS, SERVICES, waLink, WHATSAPP_DISPLAY, type ServiceId } from "../lib/constants";

type Status = "idle" | "sending" | "sent" | "error";

interface Props {
  service: ServiceId;
  onServiceChange: (service: ServiceId) => void;
}

const INPUT_CLASS = "form-input";

export default function OrderForm({ service, onServiceChange }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
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

    setStatus("sending");
    setErrorMessage("");

    try {
      await submitCommande({ nom, prenom, entreprise, telephone, service });
      setStatus("sent");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof CommandeError ? error.message : "Une erreur est survenue. Réessayez ou contactez-nous sur WhatsApp.");
    }
  }

  const whatsappFallback = waLink(`Bonjour SHOPIN30, je souhaite commander : ${SERVICE_LABELS[service]}.`);

  return (
    <section className="section order-section" id="commander">
      <div className="container order-container">
        <div className="order-copy" data-reveal>
          <p className="eyebrow"><span className="eyebrow-dash" /> PARLONS DE VOTRE PROJET</p>
          <h2>Votre prochaine<br /><span>étape commence ici.</span></h2>
          <p className="order-lead">Dites-nous ce dont vous avez besoin. Nous vous recontactons pour comprendre votre projet et préparer une proposition claire.</p>
          <div className="order-promise-list">
            <div><span><CheckCircle2 size={16} /></span><p>Un échange direct, sans jargon.</p></div>
            <div><span><CheckCircle2 size={16} /></span><p>Un devis adapté à votre périmètre.</p></div>
            <div><span><CheckCircle2 size={16} /></span><p>Vos informations restent confidentielles.</p></div>
          </div>
          <a className="order-whatsapp-link" href={waLink("Bonjour SHOPIN30, je souhaite discuter de mon projet.")} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={17} /> Préférer WhatsApp ? <span>{WHATSAPP_DISPLAY}</span>
          </a>
        </div>

        <div className="order-card" data-reveal>
          <div className="order-card-top"><div><span>DEMANDE DE PROJET</span><h3>Quelques informations</h3></div><span className="order-step">01 <i>/</i> 01</span></div>
          {status === "sent" ? (
            <div className="form-success" role="status">
              <span className="success-check"><CheckCircle2 size={30} /></span>
              <h3>Votre demande est bien reçue.</h3>
              <p>Merci. L'équipe SHOPIN30 vous recontactera pour préciser votre besoin et les prochaines étapes.</p>
              <div className="success-actions">
                <a className="button button-primary" href={waLink(`Bonjour SHOPIN30, je viens d'envoyer une demande pour ${SERVICE_LABELS[service]}.`)} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} /> Continuer sur WhatsApp</a>
                <button type="button" className="text-button" onClick={() => setStatus("idle")}>Envoyer une autre demande</button>
              </div>
            </div>
          ) : (
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
                <input className={INPUT_CLASS} id="order-telephone" name="telephone" type="tel" autoComplete="tel" inputMode="tel" maxLength={40} required placeholder="+225 07 00 00 00 00" />
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
                  <div><strong>Votre demande n'a pas été envoyée.</strong><p>{errorMessage}</p><a href={whatsappFallback} target="_blank" rel="noopener noreferrer">Écrire à SHOPIN30 sur WhatsApp ({WHATSAPP_DISPLAY})</a></div>
                </div>
              )}

              <button type="submit" className="button button-primary submit-button" disabled={status === "sending"}>
                {status === "sending" ? <><LoaderCircle className="spin" size={18} /> Envoi en cours…</> : <>Envoyer ma demande <Send size={17} aria-hidden="true" /></>}
              </button>
              <p className="form-privacy">En envoyant ce formulaire, vous autorisez SHOPIN30 à vous contacter au sujet de cette demande. Vos informations sont transmises de manière sécurisée.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
