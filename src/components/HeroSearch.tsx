"use client";

import type { ReactNode } from "react";
import {
  budgetOptions,
  deals,
  formatPrice,
  listingDistricts,
  propertyTypes,
  type PropertyType,
} from "@/data/listings";
import { useCatalogFilter } from "@/lib/catalog-filter";

function Field({
  label,
  divided = false,
  children,
}: {
  label: string;
  divided?: boolean;
  children: ReactNode;
}) {
  return (
    <label
      className={`flex flex-col px-5 py-2 text-[12px] text-subtle lg:min-w-[140px] lg:flex-1 lg:py-1 ${
        divided ? "border-t border-line-soft lg:border-t-0 lg:border-l" : ""
      }`}
    >
      {label}
      {children}
    </label>
  );
}

const selectClass =
  "border-0 bg-transparent text-[15px] font-semibold text-ink outline-none";

export function HeroSearch() {
  const { filter, setDeal, setType, setDistrict, setBudget } =
    useCatalogFilter();

  return (
    <div className="relative mt-auto flex flex-col items-center gap-3 lg:flex-row lg:items-stretch lg:justify-center">
      <div
        role="group"
        aria-label="Тип сделки"
        className="flex gap-1.5 rounded-full bg-white/85 p-1.5"
      >
        {deals.map((deal) => {
          const active = filter.deal === deal.id;
          return (
            <button
              key={deal.id}
              type="button"
              aria-pressed={active}
              onClick={() => setDeal(deal.id)}
              className={`rounded-full px-[26px] py-3.5 text-[15px] font-semibold ${
                active ? "bg-ink text-white" : "text-ink"
              }`}
            >
              {deal.label}
            </button>
          );
        })}
      </div>

      <div className="flex w-full max-w-[560px] flex-col rounded-card bg-white/85 p-3 lg:max-w-[760px] lg:flex-1 lg:flex-row lg:items-center lg:rounded-full lg:px-2.5 lg:py-2">
        <Field label="Район">
          <select
            value={filter.district ?? ""}
            onChange={(e) => setDistrict(e.target.value || null)}
            className={selectClass}
          >
            <option value="">Любой</option>
            {listingDistricts.map((district) => (
              <option key={district}>{district}</option>
            ))}
          </select>
        </Field>
        <Field label="Тип" divided>
          <select
            value={filter.type ?? ""}
            onChange={(e) =>
              setType((e.target.value as PropertyType) || null)
            }
            className={selectClass}
          >
            <option value="">Любой</option>
            {propertyTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.one}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Бюджет до" divided>
          <select
            value={filter.budget ?? ""}
            onChange={(e) =>
              setBudget(e.target.value ? Number(e.target.value) : null)
            }
            className={selectClass}
          >
            {budgetOptions[filter.deal].map((budget) => (
              <option key={budget} value={budget}>
                {formatPrice(budget, filter.deal)}
              </option>
            ))}
            <option value="">Без ограничений</option>
          </select>
        </Field>
        <a
          href="#catalog"
          className="mt-2 rounded-full bg-accent px-7 py-3.5 text-center text-[15px] font-bold text-ink lg:mt-0"
        >
          Найти
        </a>
      </div>
    </div>
  );
}
