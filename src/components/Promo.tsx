import { useCountdown } from "../hooks/useCountdown";
import { PROMO } from "../lib/constants";

function Cell({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-ink font-code text-lg font-bold text-brand sm:h-14 sm:w-14 sm:text-2xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 font-code text-[10px] uppercase tracking-wider text-ink/70">
        {label}
      </span>
    </div>
  );
}

export default function Promo() {
  const { days, hours, minutes, seconds, over } = useCountdown();

  return (
    <section id="promo" className="bg-brand py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-4 sm:px-6 lg:flex-row">
        <div className="text-center lg:text-left">
          <p className="font-code text-xs font-bold uppercase tracking-[0.2em] text-ink/70">
            Offre de lancement
          </p>
          <h2 className="mt-1 font-display text-3xl uppercase text-ink sm:text-4xl">
            -{PROMO.percent} % sur tout, pendant 1 mois
          </h2>
          <p className="mt-2 text-sm font-semibold text-ink/80">
            Mentionnez le code{" "}
            <span className="rounded bg-ink px-2 py-0.5 font-code text-brand">
              {PROMO.code}
            </span>{" "}
            lors de votre commande{over ? "." : " — l'offre expire bientôt :"}
          </p>
        </div>

        <div className="flex flex-col items-center gap-5">
          {!over && (
            <div className="flex items-start gap-2 sm:gap-3">
              <Cell value={days} label="jours" />
              <span className="pt-3 font-display text-2xl text-ink/50">:</span>
              <Cell value={hours} label="heures" />
              <span className="pt-3 font-display text-2xl text-ink/50">:</span>
              <Cell value={minutes} label="min" />
              <span className="pt-3 font-display text-2xl text-ink/50">:</span>
              <Cell value={seconds} label="sec" />
            </div>
          )}
          <a
            href="#commander"
            className="rounded-full bg-ink px-6 py-3 text-sm font-bold text-brand transition-transform hover:scale-[1.03]"
          >
            J'en profite maintenant
          </a>
        </div>
      </div>
    </section>
  );
}
