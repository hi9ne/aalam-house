"use client";

import { createContext, use, useState, type ReactNode } from "react";
import type { Deal, PropertyType } from "@/data/listings";

export type CatalogFilter = {
  deal: Deal;
  type: PropertyType | null;
  district: string | null;
  budget: number | null;
  /** Витрина показывает только избранное, остальные условия не применяются. */
  favoritesOnly: boolean;
};

type CatalogFilterContextValue = {
  filter: CatalogFilter;
  setDeal: (deal: Deal) => void;
  setType: (type: PropertyType | null) => void;
  setDistrict: (district: string | null) => void;
  setBudget: (budget: number | null) => void;
  showFavorites: () => void;
  reset: () => void;
};

const CatalogFilterContext = createContext<CatalogFilterContextValue | null>(
  null,
);

const initialFilter: CatalogFilter = {
  deal: "buy",
  type: null,
  district: null,
  budget: null,
  favoritesOnly: false,
};

/** Общее состояние поиска в hero и витрины каталога. */
export function CatalogFilterProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState(initialFilter);

  // Любое изменение поиска возвращает витрину из режима «Избранное».
  const search = (patch: Partial<CatalogFilter>) =>
    setFilter((f) => ({ ...f, ...patch, favoritesOnly: false }));

  const value: CatalogFilterContextValue = {
    filter,
    // Шкала бюджета у покупки и аренды разная, поэтому бюджет сбрасывается.
    setDeal: (deal) => search({ deal, budget: null }),
    setType: (type) => search({ type }),
    setDistrict: (district) => search({ district }),
    setBudget: (budget) => search({ budget }),
    showFavorites: () => setFilter((f) => ({ ...f, favoritesOnly: true })),
    reset: () => setFilter((f) => ({ ...initialFilter, deal: f.deal })),
  };

  return <CatalogFilterContext value={value}>{children}</CatalogFilterContext>;
}

export function useCatalogFilter() {
  const value = use(CatalogFilterContext);
  if (!value) {
    throw new Error("useCatalogFilter вызван вне CatalogFilterProvider");
  }
  return value;
}
