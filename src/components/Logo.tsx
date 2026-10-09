import Link from "next/link";
import { site } from "@/data/site";

export function LogoMark({ className = "size-[34px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <circle cx="32" cy="32" r="32" className="fill-ink" />
      <path
        d="M17 45 32 19l15 26"
        fill="none"
        stroke="#fff"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="41" r="4.5" className="fill-accent" />
    </svg>
  );
}

const logoClass =
  "flex items-center gap-2.5 text-[20px] font-bold hover:text-accent";

/** Знак с названием. Якорь прокручивает текущую страницу, путь ведёт на другую. */
export function Logo({ href }: { href: string }) {
  const content = (
    <>
      <LogoMark />
      {site.name}
    </>
  );

  return href.startsWith("#") ? (
    <a href={href} className={logoClass}>
      {content}
    </a>
  ) : (
    <Link href={href} className={logoClass}>
      {content}
    </Link>
  );
}
