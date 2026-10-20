"use client";

import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState, type RefObject } from "react";
import { doctor, mapsLink, nav, siteName, whatsappGreeting } from "@/data/site";
import { Logo } from "@/components/ui/logo";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

const CLIPS = {
  bottom: {
    closedInitial: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    open: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    closedFinal: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
  },
} as const;

const overlayBg = "#1a1612";
const linkColor = "#f3eee6";

function isVisible(element?: HTMLElement | null) {
  if (!element || element.hidden) return false;
  const style = window.getComputedStyle(element);
  if (style.visibility === "hidden" || style.visibility === "collapse") return false;
  return element.getClientRects().length > 0;
}

function getFocusableElements(container?: HTMLElement | null) {
  if (!container) return [];
  return (Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)) as HTMLElement[]).filter(isVisible);
}

function useFocusTrap({
  active,
  containerRef,
  initialFocusRef,
  onEscape,
}: {
  active: boolean;
  containerRef: RefObject<HTMLElement | null>;
  initialFocusRef?: RefObject<HTMLElement | null>;
  onEscape?: () => void;
}) {
  const onEscapeRef = useRef(onEscape);
  onEscapeRef.current = onEscape;

  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusFrame = requestAnimationFrame(() => {
      const target = initialFocusRef?.current ?? getFocusableElements(container)[0] ?? container;
      if (target === container && !container.hasAttribute("tabindex")) container.setAttribute("tabindex", "-1");
      target.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onEscapeRef.current?.();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = getFocusableElements(container);
      if (!focusable.length) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement;
      if (event.shiftKey) {
        if (activeElement === first || !container.contains(activeElement)) {
          event.preventDefault();
          last.focus();
        }
        return;
      }
      if (activeElement === last || !container.contains(activeElement)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
      if (previouslyFocused && document.contains(previouslyFocused)) previouslyFocused.focus();
    };
  }, [active, containerRef, initialFocusRef]);
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true;
}

const menuLinks = [
  { label: "Início", href: "/" },
  ...nav.map((item) => ({ label: item.label, href: item.href })),
  { label: "Agendar", href: whatsappGreeting, external: true },
];

function NavLinkHover({
  label,
  href,
  external,
  reduced,
  onClick,
}: {
  label: string;
  href: string;
  external?: boolean;
  reduced: boolean;
  onClick?: () => void;
}) {
  const className = "group/link-hover inline-block no-underline";
  const content = reduced ? (
    label
  ) : (
    <>
      <span className="sr-only">{label}</span>
      <span aria-hidden="true" className="relative inline-block overflow-hidden align-middle leading-[1.08]">
        {[...label].map((char, index) => (
          <span
            key={`${char}-${index}`}
            className="relative inline-block whitespace-pre transition-transform duration-500 ease-[cubic-bezier(0.625,0.05,0,1)] group-hover/link-hover:-translate-y-[1.2em] group-focus-visible/link-hover:-translate-y-[1.2em]"
            style={{ textShadow: "0 1.2em currentColor", transitionDelay: `${index * 0.015}s` }}
          >
            {char === " " ? " " : char}
          </span>
        ))}
      </span>
    </>
  );

  const follow = (event: { preventDefault: () => void }) => {
    const id = href.startsWith("/#") ? href.slice(2) : "";
    const target = id ? document.getElementById(id) : null;
    if (target) {
      event.preventDefault();
      onClick?.();
      window.setTimeout(() => {
        document.body.style.overflow = "";
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 350);
      return;
    }
    onClick?.();
  };

  if (external) {
    return (
      <a href={href} onClick={follow} className={className} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} onClick={follow} className={className}>
      {content}
    </Link>
  );
}

function MenuPanel({ isOpen, onNavigate }: { isOpen: boolean; onNavigate: () => void }) {
  const linksRef = useRef<(HTMLDivElement | null)[]>([]);
  const socialRef = useRef<HTMLAnchorElement | null>(null);
  const titleRef = useRef<HTMLParagraphElement | null>(null);
  const taglineRef = useRef<HTMLParagraphElement | null>(null);
  const locationRef = useRef<HTMLAnchorElement | null>(null);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    const nodes: HTMLElement[] = [];
    for (const node of [titleRef.current, taglineRef.current, ...linksRef.current, socialRef.current, locationRef.current]) {
      if (node) nodes.push(node);
    }
    gsap.killTweensOf(nodes);
    if (!isOpen) return;

    if (prefersReducedMotion()) {
      gsap.set(nodes, { y: 0, scale: 1, opacity: 1 });
      return;
    }

    gsap.set(linksRef.current, { y: 30, opacity: 0 });
    gsap.set(socialRef.current, { y: 14, opacity: 0 });
    gsap.set([titleRef.current, taglineRef.current], { y: -12, opacity: 0 });
    gsap.set(locationRef.current, { y: 10, opacity: 0 });

    const delay = 1;
    gsap.to(titleRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay });
    gsap.to(taglineRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: delay + 0.08 });
    gsap.to(linksRef.current, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.07, delay });
    gsap.to(socialRef.current, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: delay + 0.2 });
    gsap.to(locationRef.current, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: delay + 0.25 });
  }, [isOpen]);

  return (
    <div className="flex min-h-screen w-full flex-col justify-between gap-10 px-8 py-10 pt-28 text-paper sm:px-16 lg:px-24" style={{ backgroundColor: overlayBg }}>
      <div>
        <p ref={titleRef} className="text-sm font-medium tracking-[0.18em] uppercase" style={{ opacity: 0 }}>
          {siteName}
        </p>
        <p ref={taglineRef} className="mt-1 text-sm text-paper/70" style={{ opacity: 0 }}>
          Cuidado integral a partir do metabolismo.
        </p>
      </div>

      <div className="flex flex-col">
          {menuLinks.map((link, index) => (
            <div
              key={link.href}
              ref={(element) => {
                linksRef.current[index] = element;
              }}
              className="font-display text-[clamp(2.15rem,4vw,3.4rem)] leading-[1.15] tracking-[-0.03em] text-paper transition-colors hover:text-[#e0c48a]"
              style={{ opacity: 0 }}
            >
              <NavLinkHover
                label={link.label}
                href={link.href}
                external={"external" in link ? link.external : false}
                reduced={reduced}
                onClick={onNavigate}
              />
            </div>
          ))}
      </div>

      <div className="flex items-end justify-between gap-6 pb-6">
        <a
          ref={socialRef}
          href={doctor.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex size-12 items-center justify-center"
          style={{ opacity: 0, color: linkColor }}
          onClick={onNavigate}
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
          </svg>
          <span className="sr-only">Instagram</span>
        </a>
        <a ref={locationRef} href={mapsLink} target="_blank" rel="noopener noreferrer" className="text-sm text-paper/70" style={{ opacity: 0 }} onClick={onNavigate}>
          Catalão · Goiânia · Online
        </a>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLElement | null>(null);
  const linksWrapperRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);
  const isAnimatingRef = useRef(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const { closedInitial, open: openClipPath, closedFinal } = CLIPS.bottom;

  const onOpenMenu = () => {
    setIsOpen(true);
    timelineRef.current?.kill();
    gsap.set(overlayRef.current, { clipPath: closedInitial });
    gsap.set(linksWrapperRef.current, { opacity: 1, scale: 1 });

    if (prefersReducedMotion()) {
      gsap.set(overlayRef.current, { clipPath: openClipPath, autoAlpha: 0 });
      timelineRef.current = gsap.to(overlayRef.current, {
        autoAlpha: 1,
        duration: 0.2,
        ease: "power2.out",
        onStart: () => {
          isAnimatingRef.current = true;
        },
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });
      return;
    }

    timelineRef.current = gsap.timeline({
      onStart: () => {
        isAnimatingRef.current = true;
      },
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });
    timelineRef.current.to(overlayRef.current, {
      clipPath: openClipPath,
      duration: 1.2,
      delay: 0.2,
      ease: "power4.inOut",
    });
  };

  const onCloseMenu = () => {
    setIsOpen(false);
    timelineRef.current?.kill();

    if (prefersReducedMotion()) {
      timelineRef.current = gsap.to(overlayRef.current, {
        autoAlpha: 0,
        duration: 0.2,
        ease: "power2.out",
        onStart: () => {
          isAnimatingRef.current = true;
        },
        onComplete: () => {
          isAnimatingRef.current = false;
          gsap.set(overlayRef.current, { clipPath: closedFinal, autoAlpha: 1 });
        },
      });
      return;
    }

    timelineRef.current = gsap
      .timeline({
        onStart: () => {
          isAnimatingRef.current = true;
        },
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      })
      .to(linksWrapperRef.current, { scale: 0.9, opacity: 0.5, duration: 0.7, ease: "power2.in" })
      .to(overlayRef.current, { clipPath: closedFinal, duration: 1.2, ease: "power4.inOut" }, "<");
  };

  const onToggleMenu = () => {
    if (isAnimatingRef.current) return;
    if (isOpen) onCloseMenu();
    else onOpenMenu();
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useFocusTrap({ active: isOpen, containerRef: rootRef, initialFocusRef: toggleButtonRef, onEscape: onCloseMenu });

  const bar = isOpen ? "text-paper" : "bg-paper text-ink border-b border-gold";

  return (
    <div ref={rootRef}>
      <div className="h-[4.75rem] sm:h-24" aria-hidden="true" />
      <header className={`fixed top-0 right-0 left-0 z-[70] flex h-[4.75rem] items-center justify-between px-5 transition-colors duration-300 sm:h-24 sm:px-8 ${bar}`}>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[80] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Pular para o conteúdo
        </a>
        <Logo large />
        <button
          ref={toggleButtonRef}
          type="button"
          onClick={onToggleMenu}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
          aria-controls="menu-principal"
          className="inline-flex size-12 cursor-pointer flex-col items-center justify-center gap-1.5"
        >
          <span className={`block h-0.5 w-7 transition-transform duration-700 ease-in-out ${isOpen ? "translate-y-2 rotate-45 bg-paper" : "bg-gold"}`} />
          <span className={`block h-0.5 w-7 transition-opacity duration-500 ${isOpen ? "bg-paper opacity-0" : "bg-gold"}`} />
          <span className={`block h-0.5 w-7 transition-transform duration-700 ease-in-out ${isOpen ? "-translate-y-2 -rotate-45 bg-paper" : "bg-gold"}`} />
        </button>
      </header>

      <nav
        id="menu-principal"
        ref={overlayRef}
        style={{ clipPath: closedInitial, backgroundColor: overlayBg }}
        className={`fixed inset-0 z-[60] overflow-y-auto ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!isOpen}
        inert={!isOpen}
        aria-label="Principal"
      >
        <div ref={linksWrapperRef} className="min-h-screen w-screen">
          <MenuPanel isOpen={isOpen} onNavigate={onCloseMenu} />
        </div>
      </nav>
    </div>
  );
}
