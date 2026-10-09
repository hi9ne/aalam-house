"use client";

import { createContext, use, useState, type ReactNode } from "react";
import type { Deal, PropertyType } from "@/data/listings";

export type CatalogFilter = {
  deal: Deal;
  type: PropertyType | null;
  district: string | null;
  budget: number | null;
};

type CatalogFilterContextValue = {
  filter: CatalogFilter;
  setDeal: (deal: Deal) => void;
  setType: (type: PropertyType | null) => void;
  setDistrict: (district: string | null) => void;
  setBudget: (budget: number | null) => void;
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
};

/** Общее состояние поиска в hero и витрины каталога. */
export function CatalogFilterProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState(initialFilter);

  const value: CatalogFilterContextValue = {
    filter,
    // Шкала бюджета у покупки и аренды разная, поэтому бюджет сбрасывается.
    setDeal: (deal) => setFilter((f) => ({ ...f, deal, budget: null })),
    setType: (type) => setFilter((f) => ({ ...f, type })),
    setDistrict: (district) => setFilter((f) => ({ ...f, district })),
    setBudget: (budget) => setFilter((f) => ({ ...f, budget })),
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
