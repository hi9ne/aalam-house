"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "aalam-house:favorites";
const CHANGE_EVENT = "aalam-house:favorites-change";
const empty: string[] = [];

// Значение живёт в памяти, localStorage только переносит его между визитами:
// если хранилище недоступно, избранное работает до закрытия вкладки.
let current: string[] = empty;
let lastRaw: string | null | undefined;

function parse(raw: string | null): string[] {
  if (!raw) return empty;
  try {
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value)
      ? value.filter((id): id is string => typeof id === "string")
      : empty;
  } catch {
    return empty;
  }
}

function getSnapshot() {
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return current;
  }
  if (raw !== lastRaw) {
    lastRaw = raw;
    current = parse(raw);
  }
  return current;
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

export function toggleFavorite(id: string) {
  const ids = getSnapshot();
  current = ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id];
  try {
    const raw = JSON.stringify(current);
    window.localStorage.setItem(STORAGE_KEY, raw);
    lastRaw = raw;
  } catch {
    // Хранилище недоступно: остаётся значение в памяти.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** ID избранных объектов; на сервере и до гидрации список пуст. */
export function useFavoriteIds() {
  return useSyncExternalStore(subscribe, getSnapshot, () => empty);
}
