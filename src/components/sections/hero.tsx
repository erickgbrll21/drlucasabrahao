import Image from "next/image";
import type { SVGProps } from "react";
import { doctor, whatsappGreeting } from "@/data/site";

const forest = "#334623";
const gold = "#98743F";
const line = "#C4A36A";
const buttonInk = "#E7CD96";

function Mark(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props} />;
}

function LeafMark(props: SVGProps<SVGSVGElement>) {
  return (
    <Mark stroke="url(#hero-icon-fade)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 42V20" />
      <path d="M22 26c0-9-7-15-16-16 1 10 7 16 16 16Z" />
      <path d="M22 32c0-6 6-11 14-12-1 8-6 12-14 12Z" />
    </Mark>
  );
}

function ShieldMark(props: SVGProps<SVGSVGElement>) {
  return (
    <Mark stroke="url(#hero-icon-fade)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M24 6.5 38 12.5V24c0 8.2-5.8 14.2-14 18.2C15.8 38.2 10 32.2 10 24V12.5L24 6.5Z" />
      <path d="m17.5 24.5 4.2 4.2 9-9.2" />
    </Mark>
  );
}

function RunnerMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="url(#hero-icon-fade)" aria-hidden="true" {...props}>
      <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9 1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
    </svg>
  );
}

function InfinityMark(props: SVGProps<SVGSVGElement>) {
  return (
    <Mark stroke="url(#hero-icon-fade)" strokeWidth="2.6" strokeLinecap="round" {...props}>
      <path d="M15.5 24c0-3.2 2.4-5.8 5.4-5.8 3.6 0 5.4 2.6 8.6 5.8s5 5.8 8.6 5.8c3 0 5.4-2.6 5.4-5.8s-2.4-5.8-5.4-5.8c-3.6 0-5.4 2.6-8.6 5.8s-5 5.8-8.6 5.8c-3 0-5.4-2.6-5.4-5.8Z" />
    </Mark>
  );
}

function CalendarMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="none" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" stroke={buttonInk} strokeWidth="1.7" />
      <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" stroke={buttonInk} strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

const pillars = [
  { icon: LeafMark, label: "Medicina Integrativa" },
  { icon: ShieldMark, label: "Prevenção e Saúde Metabólica" },
  { icon: RunnerMark, label: "Performance Esportiva" },
  { icon: InfinityMark, label: "Longevidade e Qualidade de Vida" },
] as const;

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f7f4ec] max-sm:min-h-[calc(100svh-4.75rem)] sm:max-lg:min-h-[calc(100svh-6rem)]" aria-labelledby="hero-title">
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          <linearGradient id="hero-icon-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#243D1E" />
            <stop offset="100%" stopColor="#9AAB58" />
          </linearGradient>
        </defs>
      </svg>
      <div className="pointer-events-none absolute inset-x-0 top-[28rem] bottom-0 lg:hidden">
        <Image
          src="/images/mobile.png"
          alt="Dr. Lucas Abrahão Ferreira sentado no sofá do consultório, de terno escuro."
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_18%]"
        />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#f3eee6] to-transparent" />
      </div>
      <div className="absolute inset-0 hidden lg:block">
        <Image
          src="/images/Profissional sorridente em escritório moderno.png"
          alt="Dr. Lucas Abrahão Ferreira sentado no sofá do consultório, de terno escuro."
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_42%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,#f7f4ec_0%,rgba(247,244,236,0.96)_34%,rgba(247,244,236,0.78)_48%,rgba(247,244,236,0.18)_66%,transparent_78%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#f3eee6] via-[#f3eee6]/75 to-transparent"
        />
      </div>
      <div className="relative mx-auto w-full max-w-6xl px-5 pt-6 pb-[78vh] sm:pt-10 sm:pb-[70vh] lg:flex lg:min-h-[calc(100svh-6rem)] lg:items-center lg:px-5 lg:py-20 lg:pb-20">
        <div className="w-full min-w-0 max-w-[38rem]">
          <div className="grid w-fit max-w-full">
            <p className="font-display text-[clamp(2rem,3.4vw,2.85rem)] leading-none tracking-[-0.03em]" style={{ color: forest }}>
              {doctor.shortName}
            </p>
            <div className="mt-3 flex items-center gap-3">
              <span className="h-px min-w-3 flex-1" style={{ backgroundColor: line }} />
              <Image
                src="/images/5403989.png"
                alt=""
                width={512}
                height={512}
                className="h-8 w-8 shrink-0"
              />
              <span className="h-px min-w-3 flex-1" style={{ backgroundColor: line }} />
            </div>
          </div>
          <h1
            id="hero-title"
            className="mt-5 font-display tracking-[-0.03em] text-balance"
            style={{ color: forest }}
          >
            <span className="block text-[clamp(1.7rem,7vw,2.7rem)] leading-[1.08] font-medium">Protocolo de</span>
            <span className="mt-1 block text-[clamp(1.85rem,8.2vw,3.7rem)] leading-[1.02] font-semibold">
              Emagrecimento Individualizado
            </span>
            <span className="mt-3 block text-[clamp(1.7rem,3vw,2.45rem)] leading-tight font-medium" style={{ color: gold }}>
              com Resultados Reais
            </span>
          </h1>
          <p className="mt-5 max-w-[46ch] text-base leading-relaxed sm:text-lg" style={{ color: forest }}>
            Medicina integrativa focada em prevenção, performance esportiva e longevidade. Uma abordagem
            global para transformar sua <strong className="font-bold">saúde metabólica</strong>.
          </p>
          <ul className="mt-8 grid grid-cols-4">
            {pillars.map((pillar, index) => (
              <li
                key={pillar.label}
                className={`flex min-w-0 flex-col items-center px-1.5 text-center sm:px-3 ${index > 0 ? "border-l" : ""}`}
                style={index > 0 ? { borderColor: line } : undefined}
              >
                <pillar.icon className="size-9" />
                <p className="mt-2 text-[0.8rem] leading-snug sm:text-sm" style={{ color: forest }}>
                  {pillar.label}
                </p>
              </li>
            ))}
          </ul>
          <a
            href={whatsappGreeting}
            className="mt-9 inline-flex min-h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-full px-6 text-lg font-medium transition-colors duration-200 hover:bg-[#466033]"
            style={{ backgroundColor: forest, color: buttonInk }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <CalendarMark />
            Agendar Minha Avaliação
            <span className="sr-only"> pelo WhatsApp (abre em uma nova aba)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
