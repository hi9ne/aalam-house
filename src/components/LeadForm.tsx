"use client";

import { useActionState } from "react";
import { submitLead, type LeadFormState } from "@/app/actions";
import { leadIntents } from "@/data/site";

const initialState: LeadFormState = { status: "idle" };

const fieldClass =
  "rounded-full border-0 bg-white px-5 py-4 text-[16px] text-ink placeholder:text-subtle";

export function LeadForm() {
  const [state, formAction, pending] = useActionState(submitLead, initialState);
  const sent = state.status === "success";

  return (
    <form
      action={formAction}
      className="flex flex-col gap-3 rounded-[32px] bg-white/8 p-5 sm:p-7"
    >
      <label className="sr-only" htmlFor="lead-name">
        Ваше имя
      </label>
      <input
        id="lead-name"
        name="name"
        placeholder="Ваше имя"
        autoComplete="name"
        required
        maxLength={80}
        defaultValue={state.values?.name}
        aria-invalid={Boolean(state.fieldErrors?.name)}
        aria-describedby={state.fieldErrors?.name ? "lead-name-error" : undefined}
        className={fieldClass}
      />
      {state.fieldErrors?.name && (
        <p id="lead-name-error" className="px-5 text-[13px] text-accent-soft">
          {state.fieldErrors.name}
        </p>
      )}

      <label className="sr-only" htmlFor="lead-phone">
        Телефон
      </label>
      <input
        id="lead-phone"
        name="phone"
        type="tel"
        placeholder="Телефон"
        autoComplete="tel"
        required
        maxLength={30}
        defaultValue={state.values?.phone}
        aria-invalid={Boolean(state.fieldErrors?.phone)}
        aria-describedby={
          state.fieldErrors?.phone ? "lead-phone-error" : undefined
        }
        className={fieldClass}
      />
      {state.fieldErrors?.phone && (
        <p id="lead-phone-error" className="px-5 text-[13px] text-accent-soft">
          {state.fieldErrors.phone}
        </p>
      )}

      <label className="sr-only" htmlFor="lead-intent">
        Что вас интересует
      </label>
      <select
        id="lead-intent"
        name="intent"
        key={state.values?.intent}
        defaultValue={state.values?.intent}
        className={fieldClass}
      >
        {leadIntents.map((intent) => (
          <option key={intent}>{intent}</option>
        ))}
      </select>

      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-accent p-4 text-[16px] font-bold text-ink disabled:opacity-70"
      >
        {pending
          ? "Отправляем…"
          : sent
            ? "Заявка отправлена ✓"
            : "Отправить заявку"}
      </button>

      <p
        role="status"
        className={`text-[14px] empty:hidden ${sent ? "text-white" : "text-accent-soft"}`}
      >
        {sent ? "Спасибо! Заявка принята, мы скоро перезвоним." : state.message}
      </p>

      <span className="text-[12px] text-faint">
        Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
      </span>
    </form>
  );
}
