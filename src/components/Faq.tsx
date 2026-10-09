"use client";

import { useState } from "react";
import { SectionTitle } from "@/components/SectionHeading";
import { faq } from "@/data/content";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="grid scroll-mt-5 grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-10 px-4 py-12"
    >
      <SectionTitle>Частые вопросы</SectionTitle>
      <div className="flex flex-col">
        {faq.map((item, index) => {
          const open = openIndex === index;
          return (
            <div key={item.question} className="border-b border-line py-5">
              <h3>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full justify-between gap-4 text-left text-[18px] font-semibold"
                >
                  <span>{item.question}</span>
                  <span aria-hidden className="text-[24px] leading-none">
                    {open ? "−" : "+"}
                  </span>
                </button>
              </h3>
              <p
                id={`faq-answer-${index}`}
                hidden={!open}
                className="mt-3 max-w-[560px] leading-[1.6] text-muted"
              >
                {item.answer}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
