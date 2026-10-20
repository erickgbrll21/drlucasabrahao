"use client";

import { useState, type FormEvent } from "react";
import { locations, whatsappHref } from "@/data/site";

type Field = "name" | "phone" | "place" | "message";

const initial = {
  name: "",
  phone: "",
  place: locations[0].name,
  message: "",
};

export function ContactForm({ tone = "paper" }: { tone?: "paper" | "ink" }) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [blocked, setBlocked] = useState(false);
  const [pendingUrl, setPendingUrl] = useState("");

  function update(field: Field, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validate() {
    const next: Partial<Record<Field, string>> = {};
    if (values.name.trim().length < 2) next.name = "Informe seu nome.";
    if (values.phone.replace(/\D/g, "").length < 10) next.phone = "Informe um telefone com DDD.";
    if (values.message.trim().length < 8) next.message = "Escreva uma mensagem curta para a equipe.";
    return next;
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    setBlocked(false);
    if (Object.keys(next).length > 0) return;

    const url = whatsappHref(
      `Olá! Meu nome é ${values.name.trim()}. Telefone: ${values.phone.trim()}. Prefiro atendimento em ${values.place}. ${values.message.trim()}`,
    );
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) {
      setPendingUrl(url);
      setBlocked(true);
    }
  }

  const invalid = Object.keys(errors).length > 0;
  const muted = tone === "ink" ? "text-paper/70" : "text-ink-soft";
  const button =
    tone === "ink"
      ? "bg-paper text-ink hover:bg-brass-bright"
      : "bg-ink text-paper hover:bg-brass";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-describedby="form-note">
      {invalid ? (
        <div role="alert" className="border border-danger/40 bg-paper-deep px-4 py-3 text-sm text-danger">
          Revise os campos indicados antes de continuar.
        </div>
      ) : null}
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Nome
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="mt-2 min-h-12 w-full border border-line bg-paper px-3 text-base text-ink"
        />
        {errors.name ? (
          <p id="name-error" className="mt-2 text-sm text-danger">
            {errors.name}
          </p>
        ) : null}
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium">
          Telefone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          value={values.phone}
          onChange={(event) => update("phone", event.target.value)}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          className="mt-2 min-h-12 w-full border border-line bg-paper px-3 text-base text-ink"
        />
        {errors.phone ? (
          <p id="phone-error" className="mt-2 text-sm text-danger">
            {errors.phone}
          </p>
        ) : null}
      </div>
      <div>
        <label htmlFor="place" className="block text-sm font-medium">
          Onde prefere o atendimento
        </label>
        <select
          id="place"
          name="place"
          value={values.place}
          onChange={(event) => update("place", event.target.value)}
          className="mt-2 min-h-12 w-full border border-line bg-paper px-3 text-base text-ink"
        >
          {locations.map((location) => (
            <option key={location.name} value={location.name}>
              {location.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-help message-error" : "message-help"}
          className="mt-2 w-full border border-line bg-paper px-3 py-3 text-base text-ink"
        />
        <p id="message-help" className={`mt-2 text-sm ${muted}`}>
          Não envie sintomas, exames ou outras informações de saúde por este formulário.
        </p>
        {errors.message ? (
          <p id="message-error" className="mt-2 text-sm text-danger">
            {errors.message}
          </p>
        ) : null}
      </div>
      <button
        type="submit"
        className={`inline-flex min-h-12 cursor-pointer items-center justify-center px-5 transition-colors duration-200 ${button}`}
      >
        Continuar no WhatsApp
      </button>
      <p id="form-note" className={`text-sm ${muted}`}>
        O envio abre uma conversa no WhatsApp. Este site não armazena os dados.
      </p>
      {blocked ? (
        <p role="alert" className="text-sm">
          O navegador bloqueou a nova aba.{" "}
          <a className="underline" href={pendingUrl} target="_blank" rel="noopener noreferrer">
            Abrir o WhatsApp por este link
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
