import { ArrowUpRight, MessageCircle } from "lucide-react";
import { waLink } from "../lib/constants";

export default function WhatsAppFloat() {
  return (
    <a
      href={waLink("Bonjour SHOPIN30, j'aimerais parler de mon projet.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter SHOPIN30 sur WhatsApp"
      className="whatsapp-float"
    >
      <span className="whatsapp-float-label">Un projet en tête ?</span>
      <span className="whatsapp-float-icon"><MessageCircle size={22} aria-hidden="true" /><ArrowUpRight className="whatsapp-arrow" size={12} aria-hidden="true" /></span>
    </a>
  );
}
