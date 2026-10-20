import { Apple, Dumbbell, HeartPulse, Stethoscope, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { Hero } from "@/components/sections/hero";
import { PhilosophySection } from "@/components/sections/philosophy";
import { PracticeAreas } from "@/components/sections/practice-areas";
import { ProgramsSection } from "@/components/sections/programs";
import { Reveal2 } from "@/components/sections/reveal-2";
import { ContactForm } from "@/components/forms/contact-form";
import { ButtonLink } from "@/components/ui/button-link";
import {
  biography,
  consultationIncludes,
  doctor,
  education,
  legalNotice,
  testimonial,
  whatsappGreeting,
} from "@/data/site";

const educationIcons: Record<(typeof education)[number]["title"], LucideIcon> = {
  Medicina: Stethoscope,
  "Pós-graduação em Cardiologia": HeartPulse,
  "Pós-graduação em Medicina do Esporte": Dumbbell,
  "Formação em Nutrologia": Apple,
};

export default function HomePage() {
  return (
    <main id="conteudo">
      <Hero />

      <PhilosophySection />

      <PracticeAreas />

      <ProgramsSection />

      <section id="sobre" className="mx-auto max-w-6xl px-5 py-24 md:py-32" aria-labelledby="medico-title">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16">
          <figure className="relative">
            <div aria-hidden="true" className="absolute top-3 right-3 bottom-0 left-0 rounded-[1.75rem] bg-line sm:top-4 sm:right-4" />
            <div className="relative mb-3 mr-3 aspect-square overflow-hidden rounded-[1.75rem] sm:mb-4 sm:mr-4">
              <Image
                src="/images/Retrato profissional no sofá verde.png"
                alt="Dr. Lucas Abrahão Ferreira sentado no consultório."
                fill
                sizes="(min-width: 1024px) 36vw, 100vw"
                className="object-cover object-[center_20%]"
              />
            </div>
          </figure>
          <div>
            <h2
              id="medico-title"
              className="font-display text-[clamp(2.1rem,4vw,3.4rem)] leading-[1.02] tracking-[-0.03em] text-balance"
            >
              Conheça o {doctor.name}
            </h2>
            <p className="mt-4 text-gold">{doctor.crm}</p>
            <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-ink-soft">{biography}</p>
            <ul className="mt-10 border-y border-line">
              {education.map((item) => {
                const Icon = educationIcons[item.title];
                return (
                  <li key={item.title} className="grid gap-1 border-b border-line py-5 last:border-b-0 md:grid-cols-2 md:gap-8">
                    <span className="flex items-center gap-3 font-medium">
                      <Icon aria-hidden="true" strokeWidth={1.5} className="size-5 shrink-0 text-gold" />
                      {item.title}
                    </span>
                    <span className="text-ink-soft">{item.place}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-line" aria-labelledby="relato-title">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 md:py-32 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="relato-title" className="font-display text-[clamp(2.1rem,4vw,3.4rem)] leading-[1.02] tracking-[-0.03em]">
              Relato de {testimonial.name}
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-ink-soft">{legalNotice}</p>
            <blockquote className="mt-8 font-display text-3xl leading-snug tracking-[-0.03em] text-balance">
              “{testimonial.quote}”
            </blockquote>
            <p className="mt-4 text-sm text-ink-soft">{testimonial.name}, relato publicado no site do Instituto.</p>
            <dl className="mt-10 grid grid-cols-2 border-t border-line">
              {testimonial.measures.map((measure) => (
                <div key={measure.label} className="border-b border-line py-4 pr-4">
                  <dt className="text-sm text-ink-soft">{measure.label}</dt>
                  <dd className="mt-1 text-lg">{measure.value}</dd>
                </div>
              ))}
            </dl>
            <ul className="mt-8 space-y-3 text-ink-soft">
              {testimonial.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
          <figure>
            <Reveal2
              beforeImage={{
                src: "/images/Renata antes.png",
                alt: "Renata Cassandro antes do acompanhamento.",
              }}
              afterImage={{
                src: "/images/Renata depois.png",
                alt: "Renata Cassandro depois do acompanhamento.",
              }}
              beforeLabel="Antes"
              afterLabel="Depois"
              initialPosition={100}
            />
            <figcaption className="mt-3 text-sm text-ink-soft">
              Arraste o controle para comparar o antes e o depois. As medidas repetem o relato publicado.
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="agendar" className="border-t border-gold-bright/40 bg-ink text-paper" aria-labelledby="agendar-title">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 py-24 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <div>
            <h2
              id="agendar-title"
              className="max-w-[16ch] font-display text-[clamp(2.1rem,4vw,3.6rem)] leading-[1.02] tracking-[-0.03em] text-balance"
            >
              Pronto para transformar seu estilo de vida?
            </h2>
            <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-paper/80">
              A consulta inclui {consultationIncludes[0].toLowerCase()}, {consultationIncludes[1].toLowerCase()} e{" "}
              {consultationIncludes[2].toLowerCase()}.
            </p>
            <div className="mt-8">
              <ButtonLink href={whatsappGreeting} external variant="inverse">
                Falar com a equipe no WhatsApp
              </ButtonLink>
            </div>
          </div>
          <ContactForm tone="ink" />
        </div>
      </section>
    </main>
  );
}
