const STEPS = [
  {
    num: "01",
    title: "Vous commandez en 2 minutes",
    text: "Via le formulaire ou directement sur WhatsApp. Dites-nous ce que vous voulez, on s'occupe du reste.",
  },
  {
    num: "02",
    title: "On vous rappelle sous 24 h",
    text: "Un vrai échange pour comprendre votre activité, vos clients et vos objectifs. Devis ferme, sans surprise.",
  },
  {
    num: "03",
    title: "Design & développement",
    text: "Vous suivez l'avancement en direct sur WhatsApp : aperçus, retours, ajustements jusqu'à validation.",
  },
  {
    num: "04",
    title: "Livraison & formation",
    text: "Votre projet est en ligne. Vous recevez une vidéo de prise en main et 30 jours de support offerts.",
  },
];

export default function Process() {
  return (
    <section id="processus" className="scroll-mt-20 border-y border-white/5 bg-panel/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="font-code text-xs font-bold uppercase tracking-[0.2em] text-brand">
            Comment ça marche
          </p>
          <h2 className="mt-3 font-display text-4xl uppercase text-white sm:text-5xl">
            De l'idée au site en ligne
          </h2>
        </div>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li
              key={step.num}
              className="relative rounded-2xl border border-white/10 bg-ink p-6"
            >
              <span className="font-display text-4xl text-brand/90">{step.num}</span>
              <h3 className="mt-3 font-head text-lg font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{step.text}</p>
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden
                  className="absolute top-1/2 -right-3 hidden h-px w-6 bg-brand/40 lg:block"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
