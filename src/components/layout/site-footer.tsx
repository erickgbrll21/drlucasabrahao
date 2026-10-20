import { MapPin, Phone } from "lucide-react";
import { addressLine, doctor, legalNotice, mapsLink } from "@/data/site";
import { Logo } from "@/components/ui/logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white text-ink">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-5 pt-14 pb-24 text-center md:pt-16 md:pb-16">
        <Logo tone="ink" large />
        <address className="mt-10 flex max-w-3xl flex-col items-center gap-4 text-sm not-italic sm:flex-row sm:justify-center sm:gap-10">
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 leading-relaxed hover:text-gold"
          >
            <MapPin aria-hidden="true" strokeWidth={1.75} className="size-4 shrink-0 text-gold" />
            <span>
              <span className="font-semibold">Endereço:</span> {addressLine}
            </span>
          </a>
          <a href={`tel:${doctor.phoneTel}`} className="inline-flex items-center gap-2 leading-relaxed hover:text-gold">
            <Phone aria-hidden="true" strokeWidth={1.75} className="size-4 shrink-0 text-gold" />
            <span>
              <span className="font-semibold">Telefone:</span> {doctor.phoneDisplay}
            </span>
          </a>
        </address>
        <a
          href={doctor.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex size-11 items-center justify-center text-gold hover:text-brass"
        >
          <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
          </svg>
          <span className="sr-only">Instagram (abre em uma nova aba)</span>
        </a>
        <p className="mt-8 text-sm text-ink-soft">© 2026 {doctor.shortName}. Todos os direitos reservados.</p>
        <p className="mt-2 text-sm text-ink-soft">
          Desenvolvido por:{" "}
          <a
            href="https://kidoohub.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-ink underline-offset-4 hover:text-gold hover:underline"
          >
            Kidoo HUB
          </a>
        </p>
        <p className="mt-4 max-w-3xl text-xs leading-relaxed text-ink-soft">
          <span className="font-semibold text-ink">Aviso Legal:</span> {legalNotice}
        </p>
      </div>
    </footer>
  );
}
