import { footerNote } from "@/data/content";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="flex flex-wrap justify-between gap-4 px-4 pt-3 pb-8 text-[14px] text-subtle">
      <span>
        © {site.copyrightYear} {site.name}. Бишкек
      </span>
      <span>{footerNote}</span>
    </footer>
  );
}
