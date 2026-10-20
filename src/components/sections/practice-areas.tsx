import { FlaskConical, HeartPulse, Leaf, PersonStanding, Scale, Syringe, type LucideIcon } from "lucide-react";
import BorderGlow from "@/components/BorderGlow";
import { areasWithoutPage, programs } from "@/data/site";

const cards: { title: string; icon: LucideIcon }[] = [
  { title: areasWithoutPage[0], icon: HeartPulse },
  { title: programs[0].area, icon: Scale },
  { title: programs[3].area, icon: FlaskConical },
  { title: programs[1].area, icon: PersonStanding },
  { title: programs[2].area, icon: Leaf },
  { title: areasWithoutPage[1], icon: Syringe },
];

const goldMesh = ["#e0c48a", "#c4a36a", "#8a6630"];

const cardClass = "flex min-h-20 w-full items-center gap-4 px-5 py-4";

export function PracticeAreas() {
  return (
    <section id="atuacao" className="relative border-t border-line" aria-labelledby="atuacao-title">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 aspect-[1774/887] w-[min(68rem,130%)] -translate-x-1/2 -translate-y-1/2"
          style={{
            backgroundColor: "#c4a36a",
            opacity: 0.14,
            maskImage: "url('/images/Monograma%20LA%20em%20c%C3%ADrculo%20creme.png')",
            WebkitMaskImage: "url('/images/Monograma%20LA%20em%20c%C3%ADrculo%20creme.png')",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            maskSize: "contain",
            WebkitMaskSize: "contain",
          }}
        />
      </div>
      <div className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
        <h2
          id="atuacao-title"
          className="text-center font-display text-[clamp(2.1rem,4vw,3.6rem)] leading-[1.02] tracking-[-0.03em] after:mx-auto"
        >
          Áreas de atuação
        </h2>
        <p className="mx-auto mt-6 max-w-[42ch] text-center text-lg leading-relaxed text-ink-soft">
          Estratégias avançadas de otimização da saúde e tratamento estruturado.
        </p>
        <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {cards.map((card) => {
            const Icon = card.icon;
            const body = (
              <>
                <Icon aria-hidden="true" strokeWidth={1.5} className="size-7 shrink-0 text-gold" />
                <span className="font-display text-lg leading-snug tracking-[-0.02em]">{card.title}</span>
              </>
            );

            const content = <div className={cardClass}>{body}</div>;

            return (
              <li key={card.title} className="h-full">
                <BorderGlow
                  className="h-full"
                  backgroundColor="#faf7f2"
                  borderRadius={16}
                  glowColor="38 52 58"
                  colors={goldMesh}
                  glowRadius={28}
                  glowIntensity={0.85}
                  fillOpacity={0.42}
                  edgeSensitivity={18}
                  coneSpread={28}
                >
                  {content}
                </BorderGlow>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
