import { useState, type FormEvent } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Send,
} from "lucide-react";
import { CommandeError, submitCommande } from "../lib/airtable";
import {
  PROMO,
  SERVICE_LABELS,
  SERVICES,
  waLink,
  WHATSAPP_DISPLAY,
  type ServiceId,
} from "../lib/constants";
import { cn } from "../lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

interface Props {
  service: ServiceId;
  onServiceChange: (service: ServiceId) => void;
}

const INPUT_CLASS =
  "w-full rounded-xl border border-white/10 bg-ink px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors focus:border-brand/60 focus:ring-2 focus:ring-brand/20";

const SUCCESS_MESSAGE =
  "Votre commande a bien été reçue, nous vous contactons rapidement.";

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

    // Validation côté client
    if (!nom || !prenom || !telephone) {
      setStatus("error");
      setErrorMessage("Merci de remplir au moins Nom, Prénom et Téléphone.");
      return;
    }
    if (telephone.replace(/\D/g, "").length < 8) {
      setStatus("error");
      setErrorMessage("Le numéro de téléphone semble incomplet (8 chiffres minimum).");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      await submitCommande({ nom, prenom, entreprise, telephone, service });
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof CommandeError
          ? err.message
          : "Une erreur est survenue. Réessayez ou passez par WhatsApp.",
      );
    }
  }

  return (
    <section id="commander" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-brand/30 bg-gradient-to-b from-brand/10 via-panel to-panel">
          <div className="p-7 sm:p-10">
            <div className="text-center">
              <p className="font-code text-xs font-bold uppercase tracking-[0.2em] text-brand">
                Commande en 2 minutes
              </p>
              <h2 className="mt-3 font-display text-4xl uppercase text-white sm:text-5xl">
                Lancez votre projet
              </h2>
              <p className="mt-4 text-sm text-zinc-400">
                Remise de -{PROMO.percent} % appliquée automatiquement — code{" "}
                <span className="rounded bg-white/10 px-2 py-0.5 font-code font-bold text-brand">
                  {PROMO.code}
                </span>
              </p>
            </div>

            {status === "sent" ? (
              /* ---------- Succès ---------- */
              <div className="mt-10 flex flex-col items-center rounded-2xl border border-brand/40 bg-brand/10 p-8 text-center">
                <CheckCircle2 className="h-12 w-12 text-brand" />
                <p className="mt-4 font-head text-xl font-bold text-white">{SUCCESS_MESSAGE}</p>
                <p className="mt-2 max-w-md text-sm text-zinc-400">
                  Un membre de l'équipe SHOPIN30 vous rappelle sous 24 h — souvent bien
                  plus vite. Vous pouvez aussi nous écrire directement sur WhatsApp.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={waLink(`Bonjour SHOPIN30 👋 Je viens d'envoyer une commande (${SERVICE_LABELS[service]}).`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-wa px-5 py-2.5 text-sm font-bold text-white"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Suivre sur WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white hover:border-brand/50"
                  >
                    Faire une autre commande
                  </button>
                </div>
              </div>
            ) : (
              /* ---------- Formulaire ---------- */
              <form onSubmit={handleSubmit} className="mt-10 space-y-5" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="nom" className="mb-1.5 block text-sm font-semibold text-white">
                      Nom <span className="text-brand">*</span>
                    </label>
                    <input id="nom" name="nom" type="text" autoComplete="family-name" required placeholder="Koné" className={INPUT_CLASS} />
                  </div>
                  <div>
                    <label htmlFor="prenom" className="mb-1.5 block text-sm font-semibold text-white">
                      Prénom <span className="text-brand">*</span>
                    </label>
                    <input id="prenom" name="prenom" type="text" autoComplete="given-name" required placeholder="Aminata" className={INPUT_CLASS} />
                  </div>
                </div>

                <div>
                  <label htmlFor="entreprise" className="mb-1.5 block text-sm font-semibold text-white">
                    Entreprise <span className="font-normal text-zinc-500">(optionnel)</span>
                  </label>
                  <input id="entreprise" name="entreprise" type="text" autoComplete="organization" placeholder="Boutique Aminata" className={INPUT_CLASS} />
                </div>

                <div>
                  <label htmlFor="telephone" className="mb-1.5 block text-sm font-semibold text-white">
                    Téléphone <span className="text-brand">*</span>
                  </label>
                  <input
                    id="telephone"
                    name="telephone"
                    type="tel"
                    autoComplete="tel"
                    required
                    placeholder="+225 07 07 07 07 07"
                    className={INPUT_CLASS}
                  />
                  <p className="mt-1.5 text-xs text-zinc-500">
                    Un numéro WhatsApp de préférence — c'est le plus rapide pour vous répondre.
                  </p>
                </div>

                <fieldset>
                  <legend className="mb-1.5 text-sm font-semibold text-white">
                    Service souhaité <span className="text-brand">*</span>
                  </legend>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {SERVICES.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => onServiceChange(s.id)}
                        aria-pressed={service === s.id}
                        className={cn(
                          "rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors",
                          service === s.id
                            ? "border-brand bg-brand/10 text-brand"
                            : "border-white/10 bg-ink text-zinc-300 hover:border-white/25",
                        )}
                      >
                        {SERVICE_LABELS[s.id]}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {status === "error" && (
                  <div role="alert" className="flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-500/10 p-4">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                    <div className="text-sm">
                      <p className="font-semibold text-red-300">La commande n'a pas abouti</p>
                      <p className="mt-1 text-red-200/80">{errorMessage}</p>
                      <a
                        href={waLink("Bonjour SHOPIN30 👋 J'ai essayé de commander sur le site mais je préfère passer par WhatsApp.")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1.5 font-semibold text-brand hover:underline"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Commander directement sur WhatsApp ({WHATSAPP_DISPLAY})
                      </a>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-sm font-bold text-ink transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Envoi en cours…
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Envoyer ma commande (-{PROMO.percent} % appliqué)
                    </>
                  )}
                </button>

                <p className="text-center text-xs leading-relaxed text-zinc-500">
                  En envoyant ce formulaire, vous acceptez d'être contacté par SHOPIN30
                  au sujet de votre commande. Vos données ne sont jamais partagées.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
