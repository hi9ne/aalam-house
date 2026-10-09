"use client";

import { useState } from "react";
import { Eyebrow, SectionTitle } from "@/components/SectionHeading";
import { mortgage } from "@/data/content";
import { formatUsd, pluralize } from "@/lib/format";

function Slider({
  label,
  valueLabel,
  range,
  value,
  onChange,
}: {
  label: string;
  valueLabel: string;
  range: { min: number; max: number; step: number };
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="flex flex-col gap-2 font-medium">
      <span className="flex justify-between gap-4">
        <span>{label}</span>
        <b>{valueLabel}</b>
      </span>
      <input
        type="range"
        min={range.min}
        max={range.max}
        step={range.step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-ink"
      />
    </label>
  );
}

export function MortgageCalculator() {
  const [price, setPrice] = useState(mortgage.price.initial);
  const [down, setDown] = useState(mortgage.down.initial);
  const [years, setYears] = useState(mortgage.years.initial);

  const loan = price * (1 - down / 100);
  const monthlyRate = mortgage.annualRatePercent / 100 / 12;
  const months = years * 12;
  const monthly = (loan * monthlyRate) / (1 - (1 + monthlyRate) ** -months);

  return (
    <section
      id="calc"
      className="grid scroll-mt-5 grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-8 rounded-panel bg-linear-to-b from-[#c9c3e6] to-[#e5ddee] px-5 py-12 sm:px-9"
    >
      <div className="flex flex-col gap-[22px]">
        <div>
          <Eyebrow className="text-ink">Ипотечный калькулятор</Eyebrow>
          <SectionTitle size="md" className="mt-1.5">
            Рассчитайте платёж
          </SectionTitle>
        </div>
        <Slider
          label="Стоимость"
          valueLabel={formatUsd(price)}
          range={mortgage.price}
          value={price}
          onChange={setPrice}
        />
        <Slider
          label="Первый взнос"
          valueLabel={`${down}% · ${formatUsd((price * down) / 100)}`}
          range={mortgage.down}
          value={down}
          onChange={setDown}
        />
        <Slider
          label="Срок"
          valueLabel={`${years} ${pluralize(years, ["год", "года", "лет"])}`}
          range={mortgage.years}
          value={years}
          onChange={setYears}
        />
        <p className="text-[13px] text-body">
          Расчёт ориентировочный: ставка {mortgage.annualRatePercent}% годовых.
          Точные условия зависят от банка.
        </p>
      </div>
      <div className="flex flex-col justify-center gap-2.5 rounded-[32px] bg-white/75 p-7 sm:p-9">
        <span className="text-subtle">Ежемесячный платёж</span>
        <output className="text-[clamp(44px,5vw,68px)] font-bold tracking-[-.03em]">
          {formatUsd(monthly)}
        </output>
        <span className="text-subtle">Сумма кредита: {formatUsd(loan)}</span>
        <a
          href="#contact"
          className="mt-3.5 self-start rounded-full bg-ink px-7 py-3.5 font-semibold text-white"
        >
          Подобрать ипотеку
        </a>
      </div>
    </section>
  );
}
