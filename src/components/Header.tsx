"use client";

import { useState } from "react";
import { navigation, site } from "@/data/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-20">
      <div className="flex items-center justify-between gap-4 rounded-full bg-white/70 py-2.5 pr-3 pl-6 backdrop-blur-[14px]">
        <a
          href="#top"
          className="flex items-center gap-2.5 text-[20px] font-bold hover:text-accent"
        >
          <span className="grid size-[34px] place-items-center rounded-full bg-ink text-[15px] text-white">
            A
          </span>
          {site.name}
        </a>

        <nav
          aria-label="Основная навигация"
          className="hidden flex-1 flex-wrap justify-center gap-[18px] text-[14px] font-medium lg:flex"
        >
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-accent">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phone.href}
            className="hidden rounded-full bg-ink px-5 py-3 text-[15px] font-semibold whitespace-nowrap text-white sm:block"
          >
            {site.phone.display}
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((value) => !value)}
            className="grid size-[46px] place-items-center rounded-full bg-ink text-white lg:hidden"
          >
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Основная навигация"
          className="absolute inset-x-0 top-full mt-2 flex flex-col rounded-card bg-white/95 p-3 text-[16px] font-medium backdrop-blur-[14px] lg:hidden"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-full px-4 py-3 hover:text-accent"
            >
              {item.label}
            </a>
          ))}
          <a
            href={site.phone.href}
            className="mt-2 rounded-full bg-ink px-5 py-3 text-center font-semibold text-white sm:hidden"
          >
            {site.phone.display}
          </a>
        </nav>
      )}
    </header>
  );
}
