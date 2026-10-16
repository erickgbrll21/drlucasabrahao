import Image from "next/image";
import Link from "next/link";

export function Logo({ tone = "paper" }: { tone?: "paper" | "ink" }) {
  return (
    <Link href="/" className="inline-flex shrink-0 items-center" aria-label="Instituto Dr. Lucas Abrahão, página inicial">
      <Image
        src={tone === "ink" ? "/images/logo.png" : "/images/logo-mark.png"}
        alt=""
        width={280}
        height={148}
        priority
        className={tone === "ink" ? "h-14 w-auto" : "h-12 w-auto"}
      />
    </Link>
  );
}
