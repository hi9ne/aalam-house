import Link from "next/link";
import { footerNote } from "@/data/content";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="flex flex-wrap justify-between gap-x-6 gap-y-2 px-4 pt-3 pb-8 text-[14px] text-subtle">
      <span>
        © {site.copyrightYear} {site.name}. Бишкек
      </span>
      <Link href="/privacy" className="hover:text-accent">
        Политика обработки персональных данных
      </Link>
      <span>{footerNote}</span>
    </footer>
  );
}
