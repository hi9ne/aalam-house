"use server";

import { leadIntents, site } from "@/data/site";

export type LeadFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: { name?: string; phone?: string };
  /** Введённые значения возвращаются в форму, чтобы при ошибке их не набирать заново. */
  values?: { name: string; phone: string; intent: string };
};

const sendFailedMessage =
  "Не удалось отправить заявку. Позвоните нам или напишите в WhatsApp.";

export async function submitLead(
  _prevState: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  // Поле-ловушка: человек его не видит, а боты заполняют.
  if (formData.get("website")) return { status: "success" };

  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const intentInput = String(formData.get("intent") ?? "");
  const intent = leadIntents.includes(intentInput)
    ? intentInput
    : leadIntents[0];
  const values = { name, phone, intent };

  const fieldErrors: LeadFormState["fieldErrors"] = {};
  if (name.length < 2 || name.length > 80) {
    fieldErrors.name = "Укажите имя";
  }
  const phoneDigits = phone.replace(/\D/g, "");
  if (phone.length > 30 || phoneDigits.length < 9 || phoneDigits.length > 15) {
    fieldErrors.phone = "Укажите телефон с кодом, например +996 700 123 456";
  }
  if (fieldErrors.name || fieldErrors.phone) {
    return { status: "error", fieldErrors, values };
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error(
      "Заявка не отправлена: не заданы TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID",
    );
    return { status: "error", message: sendFailedMessage, values };
  }

  const text = [
    `Новая заявка с сайта ${site.name}`,
    "",
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    `Запрос: ${intent}`,
  ].join("\n");

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!response.ok) {
      throw new Error(
        `Telegram ответил ${response.status}: ${await response.text()}`,
      );
    }
  } catch (error) {
    console.error("Заявка не отправлена в Telegram", error);
    return { status: "error", message: sendFailedMessage, values };
  }

  return { status: "success" };
}
