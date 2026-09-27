import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    name: "Mbio Boutique",
    type: "Boutique en ligne",
    city: "Abidjan, Côte d'Ivoire",
    accent: "from-fuchsia-500/30 to-purple-500/10",
    result: "+120 commandes le 1er mois",
  },
  {
    name: "Chez Fatou",
    type: "Site + menu WhatsApp",
    city: "Dakar, Sénégal",
    accent: "from-amber-500/30 to-orange-500/10",
    result: "Réservations x3 sur WhatsApp",
  },
  {
    name: "Koffi Logistics",
    type: "Application de suivi",
    city: "Lomé, Togo",
    accent: "from-sky-500/30 to-blue-500/10",
    result: "500 livraisons suivies / mois",
  },
  {
    name: "Naaba Élec",
    type: "Site vitrine",
    city: "Ouagadougou, Burkina Faso",
    accent: "from-emerald-500/30 to-teal-500/10",
    result: "1ère page Google en 6 semaines",
  },
  {
    name: "Studio Aïcha",
    type: "Portfolio + prise de RDV",
    city: "Bamako, Mali",
    accent: "from-rose-500/30 to-pink-500/10",
    result: "Agenda rempli à 80 %",
  },
  {
    name: "ERP Market",
    type: "CRM WhatsApp",
    city: "Cotonou, Bénin",
    accent: "from-lime-500/30 to-green-500/10",
    result: "0 client oublié, relances auto",
  },
];

export default function Realisations() {
  return (
    <section id="realisations" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-code text-xs font-bold uppercase tracking-[0.2em] text-brand">
              Réalisations
            </p>
            <h2 className="mt-3 font-display text-4xl uppercase text-white sm:text-5xl">
              Ils vendent déjà en ligne
            </h2>
            <p className="mt-4 text-zinc-400">
              Des projets livrés pour des clients dans toute l'Afrique de
              l'Ouest — le vôtre peut être le prochain.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <article
              key={project.name}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-panel transition-colors hover:border-brand/40"
            >
              {/* Aperçu façon navigateur */}
              <div className={`relative bg-gradient-to-br ${project.accent} p-4`}>
                <div className="rounded-lg border border-white/10 bg-ink/70">
                  <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                  </div>
                  <div className="space-y-2 p-4">
                    <div className="h-2 w-1/2 rounded bg-white/25" />
                    <div className="h-1.5 w-3/4 rounded bg-white/10" />
                    <div className="h-1.5 w-2/3 rounded bg-white/10" />
                    <div className="mt-3 h-6 w-20 rounded-full bg-brand/70" />
                  </div>
                </div>
                <ArrowUpRight className="absolute top-6 right-6 h-5 w-5 text-white/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand" />
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-head text-lg font-bold text-white">{project.name}</h3>
                  <span className="rounded-full bg-white/5 px-2.5 py-1 font-code text-[10px] uppercase tracking-wider text-zinc-400">
                    {project.type}
                  </span>
                </div>
                <p className="mt-1 text-xs text-zinc-500">{project.city}</p>
                <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand">
                  {project.result}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
