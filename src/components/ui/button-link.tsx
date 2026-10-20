import Link from "next/link";
import type { ReactNode } from "react";

const variants = {
  solid:
    "bg-ink text-paper hover:bg-brass",
  line:
    "border border-gold-bright bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-paper",
  inverse:
    "bg-paper text-ink hover:bg-brass-bright",
  ghost:
    "border border-paper/35 bg-transparent text-paper hover:bg-paper hover:text-ink",
} as const;

type Variant = keyof typeof variants;

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "solid",
  className = "",
  external = false,
}: Props) {
  const classes = `inline-flex min-h-12 cursor-pointer items-center justify-center px-5 text-center text-[0.95rem] font-medium transition-colors duration-200 ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
