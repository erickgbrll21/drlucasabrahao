"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Orbit, ScanFace, ShieldCheck, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { philosophy } from "@/data/site";

const topicIcons: LucideIcon[] = [ScanFace, Orbit, ShieldCheck];

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

export function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const topics = gsap.utils.toArray<HTMLElement>("[data-filosofia-topico]", section);
    const marks = gsap.utils.toArray<HTMLElement>("[data-filosofia-marca]", section);
    const live = section.querySelector<HTMLElement>("[data-filosofia-vivo]");

    if (reduced || topics.length < 2) {
      gsap.set(topics, { autoAlpha: 1, xPercent: 0 });
      topics.forEach((topic) => {
        topic.style.gridArea = "auto";
      });
      return;
    }

    const show = (index: number) => {
      marks.forEach((mark, markIndex) => {
        mark.dataset.active = markIndex === index ? "true" : "false";
      });
      topics.forEach((topic, topicIndex) => {
        topic.setAttribute("aria-hidden", topicIndex === index ? "false" : "true");
      });
      if (live) live.textContent = topics[index]?.querySelector("h3")?.textContent ?? "";
    };

    let current = 0;
    gsap.set(topics, { autoAlpha: 0, xPercent: 0 });
    gsap.set(topics[0], { autoAlpha: 1 });
    show(0);

    const reveal = (index: number) => {
      if (index === current) return;
      const direction = index > current ? 1 : -1;
      const outgoing = topics[current];
      const incoming = topics[index];
      current = index;
      gsap.killTweensOf(topics);
      gsap.set(topics, { autoAlpha: 0, xPercent: 0 });
      gsap.set(outgoing, { autoAlpha: 1, xPercent: 0 });
      gsap.set(incoming, { autoAlpha: 1, xPercent: 110 * direction });
      gsap.to(outgoing, { xPercent: -110 * direction, autoAlpha: 0, duration: 0.5, ease: "power3.inOut", overwrite: true });
      gsap.to(incoming, { xPercent: 0, duration: 0.5, ease: "power3.inOut", overwrite: true });
      show(index);
    };

    const headerOffset = () => document.querySelector("header")?.offsetHeight ?? 0;
    const root = document.documentElement;
    const coarse = window.matchMedia("(max-width: 1023px), (pointer: coarse)").matches;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: () => `top ${headerOffset()}px`,
      end: () => `+=${window.innerHeight * topics.length}`,
      pin: true,
      anticipatePin: coarse ? 0 : 1,
      ...(coarse
        ? {}
        : {
            snap: {
              snapTo: (value: number) => {
                const step = 1 / topics.length;
                const index = Math.min(topics.length - 1, Math.floor(value * topics.length));
                return index * step + step / 2;
              },
              duration: { min: 0.25, max: 0.45 },
              delay: 0.06,
              ease: "power2.inOut",
            },
          }),
      onToggle: (self) => {
        root.style.scrollBehavior = self.isActive ? "auto" : "";
      },
      onUpdate: (self) => {
        const index = Math.min(topics.length - 1, Math.floor(self.progress * topics.length));
        reveal(index);
      },
    });

    return () => {
      root.style.scrollBehavior = "";
      trigger.kill();
    };
  }, []);

  return (
    <section
      id="filosofia"
      ref={sectionRef}
      className="relative h-[calc(100svh-4.75rem)] motion-reduce:h-auto sm:h-[calc(100svh-6rem)]"
      aria-labelledby="filosofia-title"
    >
      <div className="relative mx-auto grid h-full min-h-0 max-w-6xl content-center items-center px-5 pt-6 sm:pt-8 lg:max-w-[90rem] lg:content-stretch lg:grid-cols-[auto_minmax(0,1fr)] lg:items-stretch lg:gap-14 lg:pt-12">
        <div className="min-h-0 text-gold lg:order-2 lg:max-w-xl lg:self-center">
          <h2
            id="filosofia-title"
            className="max-w-[16ch] font-display text-[clamp(2.1rem,4vw,3.6rem)] leading-[1.02] tracking-[-0.03em] text-balance"
          >
            {philosophy.title}
          </h2>
          <p className="mt-3 max-w-[42ch] text-base leading-relaxed sm:mt-4 sm:text-lg lg:mt-6">{philosophy.lede}</p>
          <div data-filosofia-trilha className="mt-6 grid overflow-hidden sm:mt-8 lg:mt-14">
            {philosophy.points.map((point, index) => {
              const Icon = topicIcons[index];
              return (
              <article
                key={point.title}
                data-filosofia-topico
                aria-hidden={index === 0 ? "false" : "true"}
                className="col-start-1 row-start-1 w-full max-w-[42ch] motion-reduce:opacity-100 motion-reduce:visible"
                style={index === 0 ? undefined : { opacity: 0, visibility: "hidden" }}
              >
                <Icon aria-hidden="true" strokeWidth={1.5} className="size-7 lg:size-8" />
                <h3 className="mt-2 font-display text-xl tracking-[-0.02em] sm:mt-3 sm:text-2xl lg:mt-4">{point.title}</h3>
                <p className="mt-2 text-base leading-relaxed sm:mt-3 sm:text-lg">{point.text}</p>
              </article>
              );
            })}
          </div>
          <div className="mt-4 flex gap-2 sm:mt-6 lg:mt-8" aria-hidden="true">
            {philosophy.points.map((point, index) => (
              <span
                key={point.title}
                data-filosofia-marca
                data-active={index === 0 ? "true" : "false"}
                className="h-0.5 w-8 bg-current opacity-30 transition-[width,opacity] duration-300 data-[active=true]:w-14 data-[active=true]:opacity-100"
              />
            ))}
          </div>
          <p className="sr-only" aria-live="polite" data-filosofia-vivo>
            {philosophy.points[0].title}
          </p>
        </div>
        <div className="relative hidden h-full min-h-0 w-full justify-self-center lg:order-1 lg:block lg:w-auto lg:justify-self-start">
          <div className="absolute bottom-0 left-1/2 aspect-[1024/1110] w-[min(100cqw,calc(100cqh*1024/1110))] -translate-x-1/2 lg:relative lg:bottom-auto lg:left-0 lg:h-full lg:w-auto lg:translate-x-0 lg:aspect-auto">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-[22%] left-1/2 z-0 aspect-[1774/887] w-[132%] -translate-x-1/2 -translate-y-1/2 sm:top-[26%] sm:w-[148%] lg:top-[30%] lg:w-[165%]"
              style={{
                backgroundColor: "#c4a36a",
                opacity: 0.28,
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
            <svg viewBox="0 0 1024 1110" aria-hidden="true" className="relative z-10 hidden h-full w-auto lg:block" />
            <div className="absolute inset-0 z-10 overflow-hidden">
              <Image
                src="/images/Retrato%20profissional%20de%20homem%20sorridente%20em%20terno%20azul-marinho.png"
                alt="Dr. Lucas Abrahão Ferreira"
                width={1024}
                height={1536}
                sizes="(min-width: 1024px) 42rem, 80vw"
                className="absolute inset-x-0 top-0 h-[138.4%] w-full max-w-none object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
