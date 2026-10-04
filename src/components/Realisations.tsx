import {
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  Check,
  CircleDollarSign,
  CircleHelp,
  FileText,
  LayoutDashboard,
  Search,
  Settings2,
  ShoppingBag,
  UsersRound,
} from "lucide-react";

const CHART_BARS = [36, 54, 43, 66, 49, 78, 58, 92, 68, 84, 62, 100];
const MENU_ITEMS = ["Vue générale", "Opérations", "Clients", "Rapports"];

function BrowserBar({ label }: { label: string }) {
  return (
    <div className="mock-browser-bar">
      <div className="browser-dots" aria-hidden="true"><i /><i /><i /></div>
      <span className="mock-browser-label">{label}</span>
      <Settings2 size={13} aria-hidden="true" />
    </div>
  );
}

function ComptaPreview() {
  return (
    <div className="project-screen project-screen-compta" role="img" aria-label="Maquette illustrative du tableau de bord comptaCI, avec vue comptable et graphique d'activité">
      <BrowserBar label="comptaci · espace de gestion" />
      <div className="mock-workspace">
        <aside className="mock-sidebar">
          <div className="mock-brand-compta">compta<span>CI</span></div>
          <div className="mock-side-caption">MENU PRINCIPAL</div>
          {MENU_ITEMS.map((item, index) => (
            <div className={`mock-menu-item${index === 0 ? " selected" : ""}`} key={item}>
              {index === 0 ? <LayoutDashboard size={12} /> : index === 1 ? <CircleDollarSign size={12} /> : index === 2 ? <UsersRound size={12} /> : <BarChart3 size={12} />}
              <span>{item}</span>
            </div>
          ))}
          <div className="mock-side-profile"><span>AM</span><div><b>A. Manager</b><small>Compte démo</small></div></div>
        </aside>
        <div className="mock-dashboard">
          <div className="mock-dashboard-top"><div className="mock-breadcrumb">Espace de travail <span>/</span> Vue générale</div><div className="mock-avatar">AM</div></div>
          <div className="mock-title-row"><div><h4>Vue d'ensemble</h4><p>Gardez un œil sur votre activité.</p></div><span className="mock-date"><CalendarDays size={11} /> Ce mois-ci <span>⌄</span></span></div>
          <div className="mock-metrics">
            <div className="mock-metric"><span>Recettes</span><strong>2 480 000 <small>FCFA</small></strong><em>Exemple de donnée</em></div>
            <div className="mock-metric"><span>Opérations</span><strong>124</strong><em>Sur la période</em></div>
            <div className="mock-metric"><span>À traiter</span><strong>08</strong><em>Suivi en cours</em></div>
          </div>
          <div className="mock-lower-grid">
            <div className="mock-chart-panel">
              <div className="mock-panel-head"><div><b>Évolution de l'activité</b><small>Vue de démonstration</small></div><span>12 mois⌄</span></div>
              <div className="mock-chart-area">
                <div className="mock-chart-y"><span>3 M</span><span>2 M</span><span>1 M</span></div>
                <div className="mock-chart-bars" aria-hidden="true">{CHART_BARS.map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div>
              </div>
              <div className="mock-chart-x"><span>Jan</span><span>Mar</span><span>Mai</span><span>Juil</span><span>Sep</span><span>Nov</span></div>
            </div>
            <div className="mock-activity-panel">
              <div className="mock-panel-head"><div><b>Dernières opérations</b><small>Exemples</small></div><FileText size={13} /></div>
              <div className="mock-transaction"><span className="transaction-dot green" /><div><b>Vente enregistrée</b><small>Aujourd'hui · 10:42</small></div><strong>+45 000</strong></div>
              <div className="mock-transaction"><span className="transaction-dot amber" /><div><b>Fournisseur</b><small>Hier · 16:08</small></div><strong>−18 500</strong></div>
              <div className="mock-transaction"><span className="transaction-dot blue" /><div><b>Nouvelle facture</b><small>Hier · 09:31</small></div><strong>+82 000</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KaissePreview() {
  return (
    <div className="project-screen project-screen-kaisse" role="img" aria-label="Maquette illustrative d'une application Kaisse sur ordinateur et téléphone">
      <BrowserBar label="kaisse · application de gestion" />
      <div className="kaisse-stage">
        <div className="kaisse-desktop">
          <div className="kaisse-top"><div className="kaisse-wordmark"><span className="kaisse-symbol">K</span>Kaisse</div><div className="kaisse-top-right"><span className="kaisse-search"><Search size={11} /> Rechercher</span><span className="mock-avatar">AK</span></div></div>
          <div className="kaisse-page-title"><div><small>ESPACE DE GESTION</small><h4>Bonjour Awa <span>✦</span></h4></div><span className="kaisse-new-action">+ Nouvelle opération</span></div>
          <div className="kaisse-summary">
            <div><span>Activité du jour</span><strong>03 <small>éléments</small></strong><i className="summary-line lime" /></div>
            <div><span>À suivre</span><strong>08 <small>dossiers</small></strong><i className="summary-line violet" /></div>
            <div><span>Dernière mise à jour</span><strong>10:42 <small>aujourd'hui</small></strong><i className="summary-line blue" /></div>
          </div>
          <div className="kaisse-list-panel">
            <div className="kaisse-list-head"><b>Activité récente</b><span>Tout afficher <ArrowUpRight size={10} /></span></div>
            <div className="kaisse-row kaisse-row-head"><span>ÉLÉMENT</span><span>STATUT</span><span>DERNIÈRE ACTION</span></div>
            <div className="kaisse-row"><span><span className="row-symbol lime"><ShoppingBag size={11} /></span><b>Opération #1048</b></span><span className="status-pill status-done"><Check size={9} /> Traité</span><span>À l'instant</span></div>
            <div className="kaisse-row"><span><span className="row-symbol violet"><UsersRound size={11} /></span><b>Contact client</b></span><span className="status-pill status-open"><CircleHelp size={9} /> À suivre</span><span>Il y a 12 min</span></div>
          </div>
        </div>
        <div className="kaisse-phone" aria-hidden="true">
          <div className="phone-speaker" />
          <div className="phone-screen">
            <div className="phone-topline"><span>9:41</span><span>● ● ●</span></div>
            <div className="phone-greeting"><small>ESPACE KAISSE</small><strong>Bonjour Awa <span>✦</span></strong><p>Voici votre activité aujourd'hui.</p></div>
            <div className="phone-card"><div className="phone-card-icon"><ShoppingBag size={13} /></div><span>Nouvelle opération</span><ArrowUpRight size={12} /></div>
            <div className="phone-stat"><span>À suivre</span><strong>08</strong><small>Éléments à traiter</small></div>
            <div className="phone-section-title">RÉCENT</div>
            <div className="phone-item"><span className="phone-item-icon"><CircleDollarSign size={12} /></span><div><b>Opération #1048</b><small>Confirmée · 10:42</small></div><Check size={12} /></div>
            <div className="phone-item"><span className="phone-item-icon lilac"><UsersRound size={12} /></span><div><b>Contact client</b><small>À suivre · 10:30</small></div><ArrowUpRight size={12} /></div>
            <div className="phone-nav"><span><LayoutDashboard size={13} /></span><span><Search size={13} /></span><span><UsersRound size={13} /></span><span><Settings2 size={13} /></span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

const PROJECTS = [
  {
    name: "comptaCI",
    type: "Outil de gestion",
    description: "Une interface de pilotage conçue pour rendre les informations de gestion plus claires et accessibles.",
    component: ComptaPreview,
  },
  {
    name: "Kaisse",
    type: "Application métier",
    description: "Un projet applicatif pensé autour des opérations quotidiennes, avec une expérience adaptée aux écrans mobiles.",
    component: KaissePreview,
  },
];

export default function Realisations() {
  return (
    <section className="section projects-section" id="realisations">
      <div className="container">
        <div className="section-heading section-heading-row" data-reveal>
          <div><p className="eyebrow"><span className="eyebrow-dash" /> NOS RÉALISATIONS</p><h2>Des projets concrets.<br /><span>Des interfaces utiles.</span></h2></div>
          <p className="section-lead">comptaCI et Kaisse illustrent notre approche : concevoir des outils numériques fonctionnels, pensés pour les usages de terrain.</p>
        </div>

        <div className="projects-grid">
          {PROJECTS.map(({ name, type, description, component: Preview }, index) => (
            <article className="project-card" key={name} data-reveal>
              <div className="project-card-head"><span className="project-type">{type}</span><span className="project-index">0{index + 1} / PROJET</span></div>
              <Preview />
              <p className="mockup-caption">Aperçu d'interface · contenu visuel de démonstration</p>
              <div className="project-info">
                <div className="project-title-row"><h3>{name}</h3><span className="project-status"><i /> Conçu & fonctionnel</span></div>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="projects-footnote" data-reveal><span className="projects-footnote-line" /> Chaque projet est cadré selon le métier, les usages et le niveau de fonctionnalités souhaité.</div>
      </div>
    </section>
  );
}
