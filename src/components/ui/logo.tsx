import Image from "next/image";
import Link from "next/link";

export function Logo({ tone = "paper", large = false }: { tone?: "paper" | "ink"; large?: boolean }) {
  const height = large ? "h-16 w-auto sm:h-20" : tone === "ink" ? "h-14 w-auto sm:h-16" : "h-11 w-auto sm:h-12";

  return (
    <Link href="/" className="inline-flex shrink-0 items-center" aria-label="Instituto Dr. Lucas Abrahão, página inicial">
      <Image
        src="/images/logo (1).png"
        alt=""
        width={400}
        height={200}
        priority={tone === "paper"}
        className={height}
      />
    </Link>
  );
}
