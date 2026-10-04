import {
  ArrowDownRight,
  ArrowRight,
  BarChart3,
  CircleCheck,
  FileText,
  LayoutDashboard,
  MessageCircle,
  Plus,
  Search,
  Settings2,
  UsersRound,
} from "lucide-react";
import { waLink } from "../lib/constants";

const BARS = [34, 48, 39, 62, 48, 73, 58, 83, 66, 95, 75, 100];

function InterfacePreview() {
  return (
    <div className="hero-visual" data-reveal aria-label="Aperçu illustratif d'un tableau de bord métier">
      <div className="visual-grid" aria-hidden="true" />
      <div className="visual-orbit visual-orbit-one" aria-hidden="true" />
      <div className="visual-orbit visual-orbit-two" aria-hidden="true" />
      <div className="preview-label"><span className="preview-label-dot" /> APERÇU D'INTERFACE</div>

      <div className="browser-window hero-browser">
        <div className="browser-topbar">
          <div className="browser-dots" aria-hidden="true"><i /><i /><i /></div>
          <div className="browser-address"><span>secure</span> espace-client.africa</div>
          <div className="browser-topbar-icon"><Settings2 size={14} /></div>
        </div>
        <div className="dashboard-preview">
          <aside className="dashboard-sidebar" aria-hidden="true">
            <div className="dashboard-brand">s<span>30</span></div>
            <div className="dashboard-side-item active"><LayoutDashboard size={15} /><span>Vue d'ensemble</span></div>
            <div className="dashboard-side-item"><FileText size={15} /><span>Activité</span></div>
            <div className="dashboard-side-item"><UsersRound size={15} /><span>Clients</span></div>
            <div className="dashboard-side-item"><MessageCircle size={15} /><span>Messages</span></div>
            <div className="dashboard-side-foot"><span className="tiny-avatar">AK</span><span>Awa Koné</span></div>
          </aside>

          <div className="dashboard-main">
            <div className="dashboard-toolbar">
              <div className="preview-search"><Search size={12} /><span>Rechercher</span></div>
              <div className="dashboard-toolbar-right"><span className="toolbar-dot" /><span className="toolbar-avatar">AK</span></div>
            </div>
            <div className="dashboard-welcome">
              <div><span className="dashboard-overline">ESPACE DE GESTION</span><h3>Bonjour, Awa <span>✦</span></h3></div>
              <div className="preview-new-button"><Plus size={12} /> Nouvelle action</div>
            </div>
            <div className="preview-stat-grid">
              <div className="preview-stat"><span>Demandes reçues</span><strong>38</strong><em>Ce mois</em></div>
              <div className="preview-stat"><span>Dossiers actifs</span><strong>12</strong><em>En cours</em></div>
              <div className="preview-stat preview-stat-accent"><span>Suivi des échanges</span><strong>À jour</strong><em><CircleCheck size={11} /> Synchronisé</em></div>
            </div>
            <div className="preview-lower">
              <div className="preview-chart-card">
                <div className="preview-card-head"><div><span>VUE D'ACTIVITÉ</span><strong>Suivi de votre activité</strong></div><span className="mini-select">7 jours⌄</span></div>
                <div className="activity-chart" aria-hidden="true">
                  {BARS.map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}
                </div>
                <div className="chart-days"><span>Lun</span><span>Mar</span><span>Mer</span><span>Jeu</span><span>Ven</span><span>Sam</span><span>Dim</span></div>
              </div>
              <div className="preview-tasks-card">
                <div className="preview-card-head"><div><span>À FAIRE</span><strong>Prochaines actions</strong></div><span className="task-count">03</span></div>
                <div className="preview-task"><span className="task-check"><CircleCheck size={12} /></span><span>Rappeler un prospect</span></div>
                <div className="preview-task"><span className="task-check"><CircleCheck size={12} /></span><span>Valider une demande</span></div>
                <div className="preview-task"><span className="task-check empty" /><span>Envoyer un devis</span></div>
              </div>
            </div>
            <div className="preview-disclaimer">MAQUETTE DE DÉMONSTRATION · DONNÉES ILLUSTRATIVES</div>
          </div>
        </div>
      </div>

      <div className="floating-notification">
        <span className="notification-icon"><MessageCircle size={17} /></span>
        <span><strong>Message centralisé</strong><small>Votre équipe garde le fil.</small></span>
        <span className="notification-check"><CircleCheck size={16} /></span>
      </div>
      <div className="floating-tag"><BarChart3 size={15} /><span>Un outil à votre image</span></div>
      <p className="visual-caption">Exemple d'interface métier conçue selon vos besoins</p>
    </div>
  );
}

export default function Hero() {
  const contactLink = waLink("Bonjour SHOPIN30, j'aimerais parler de mon projet digital.");

  return (
    <section className="hero-section" id="accueil">
      <div className="hero-backdrop" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy" data-reveal>
          <div className="eyebrow hero-eyebrow"><span className="live-indicator" /> SITES WEB · APPLICATIONS · CRM WHATSAPP</div>
          <h1>
            <span className="hero-line">Votre site,</span>
            <span className="hero-line">votre application,</span>
            <span className="hero-line">votre CRM <em>WhatsApp,</em></span>
            <span className="hero-line hero-last-line">prêts en quelques jours.</span>
          </h1>
          <p className="hero-description">
            SHOPIN30 conçoit des solutions digitales sur mesure pour les entreprises, PME et particuliers, partout en Afrique.
          </p>
          <div className="hero-actions">
            <a className="button button-primary button-large" href="#commander">
              Commander mon projet <ArrowRight aria-hidden="true" size={18} />
            </a>
            <a className="button button-outline button-large" href="#realisations">
              Voir nos réalisations <ArrowDownRight aria-hidden="true" size={17} />
            </a>
          </div>
          <div className="hero-footnote">
            <span className="hero-footnote-mark"><CircleCheck size={14} /></span>
            <span>Un premier échange, un périmètre clair et une solution vraiment adaptée.</span>
          </div>
          <a className="hero-direct-link" href={contactLink} target="_blank" rel="noopener noreferrer">
            Une question avant de commencer ? <span>Écrivez-nous sur WhatsApp</span>
          </a>
        </div>

        <InterfacePreview />
      </div>
      <div className="hero-bottom-line container" aria-hidden="true">
        <span>DES OUTILS UTILES, POUR DES ACTIVITÉS QUI AVANCENT</span><span className="hero-bottom-rule" /><span>01 — SHOPIN30</span>
      </div>
    </section>
  );
}
