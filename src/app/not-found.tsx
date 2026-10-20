import Link from "next/link";

export default function NotFound() {
  return (
    <main id="conteudo" className="mx-auto max-w-6xl px-5 py-24">
      <h1 className="font-display text-5xl tracking-[-0.03em]">Página não encontrada</h1>
      <p className="mt-4 max-w-[46ch] text-lg text-ink-soft">
        Este endereço não faz parte do site. Volte ao início ou fale com a equipe pelo WhatsApp.
      </p>
      <Link href="/" className="mt-8 inline-flex min-h-12 items-center bg-ink px-5 text-paper">
        Ir para o início
      </Link>
    </main>
  );
}
