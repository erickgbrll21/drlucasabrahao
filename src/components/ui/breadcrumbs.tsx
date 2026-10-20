import Link from "next/link";

export type Crumb = {
  href?: string;
  label: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Trilha">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-soft">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? (
                <span aria-hidden="true" className="text-gold-bright">
                  /
                </span>
              ) : null}
              {last || !item.href ? (
                <span aria-current={last ? "page" : undefined} className={last ? "text-gold" : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="underline-offset-4 hover:text-gold hover:underline">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
