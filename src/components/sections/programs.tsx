import Image from "next/image";
import type { ReactNode } from "react";
import BorderGlow from "@/components/BorderGlow";
import { programs } from "@/data/site";

const goldMesh = ["#e0c48a", "#c4a36a", "#8a6630"];

const programImages = {
  obesidade: {
    src: "/images/Cuidado Integrado para a Saúde Metabólica.png",
    alt: "Acompanhamento da saúde metabólica, com alimentação e resultado sustentável.",
  },
  performance: {
    src: "/images/Performance atlética e recuperação muscular.png",
    alt: "Atleta em largada, com foco em rendimento e recuperação muscular.",
  },
  envelhecimento: {
    src: "/images/Envelhecimento Saudável e Ativo.png",
    alt: "Casal correndo, com foco em vigor e envelhecimento ativo.",
  },
  "reposicao-hormonal": {
    src: "/images/Consulta sobre Equilíbrio Hormonal e Vitalidade.png",
    alt: "Consulta sobre equilíbrio hormonal e vitalidade.",
  },
} as const;

function ProgramGlow({ children, featured = false }: { children: ReactNode; featured?: boolean }) {
  return (
    <BorderGlow
      className="h-full"
      backgroundColor="#faf7f2"
      borderRadius={featured ? 22 : 16}
      glowColor="38 52 58"
      colors={goldMesh}
      glowRadius={featured ? 36 : 28}
      glowIntensity={featured ? 1 : 0.85}
      fillOpacity={0.42}
      edgeSensitivity={18}
      coneSpread={featured ? 32 : 28}
    >
      {children}
    </BorderGlow>
  );
}

export function ProgramsSection() {
  const [lead, ...rest] = programs;
  const leadImage = programImages[lead.slug];

  return (
    <section id="programas" className="bg-ink text-paper" aria-labelledby="programas-title">
      <div className="mx-auto max-w-6xl px-5 py-24 md:py-32">
        <h2
          id="programas-title"
          className="text-center font-display text-[clamp(2.1rem,4vw,3.6rem)] leading-[1.02] tracking-[-0.03em] after:mx-auto"
        >
          Programas de acompanhamento
        </h2>
        <p className="mx-auto mt-6 max-w-[46ch] text-center text-lg leading-relaxed text-paper/80">
          Estrutura completa e equipe multiprofissional. Os programas são organizados em blocos estratégicos para resultados consistentes.
        </p>
        <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          <li className="md:col-span-2 lg:col-span-3">
            <ProgramGlow featured>
              <div className="grid overflow-hidden rounded-[22px] text-ink md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
                <div className="relative min-h-64 md:min-h-[26rem]">
                  <Image src={leadImage.src} alt={leadImage.alt} fill sizes="(min-width: 768px) 52vw, 100vw" className="object-cover" />
                </div>
                <div className="flex flex-col justify-center px-7 py-8 md:px-10 md:py-12">
                  <p className="font-display text-sm tracking-[0.18em] text-gold">01</p>
                  <h3 className="mt-3 max-w-[16ch] font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.05] tracking-[-0.03em]">
                    {lead.name}
                  </h3>
                  <p className="mt-4 max-w-[42ch] text-lg leading-relaxed text-ink-soft">{lead.summary}</p>
                </div>
              </div>
            </ProgramGlow>
          </li>
          {rest.map((program, index) => {
            const image = programImages[program.slug];
            return (
              <li key={program.slug} className="h-full last:md:col-span-2 last:lg:col-span-1">
                <ProgramGlow>
                  <div className="flex h-full flex-col overflow-hidden rounded-2xl text-ink">
                    <div className="relative aspect-[16/10]">
                      <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col px-6 py-7">
                      <p className="font-display text-sm tracking-[0.18em] text-gold">0{index + 2}</p>
                      <h3 className="mt-3 font-display text-2xl leading-tight tracking-[-0.02em]">{program.name}</h3>
                      <p className="mt-3 text-base leading-relaxed text-ink-soft">{program.summary}</p>
                    </div>
                  </div>
                </ProgramGlow>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
