import Image from "next/image";
import { Eyebrow, SectionTitle } from "@/components/SectionHeading";
import { about } from "@/data/content";
import { site } from "@/data/site";

export function About() {
  return (
    <section
      id="about"
      className="grid scroll-mt-5 grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-5"
    >
      <div className="relative min-h-[280px] overflow-hidden rounded-panel bg-[#d6d9ef] sm:min-h-[440px]">
        <Image
          src={about.image}
          alt={`Офис ${site.name}`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-center gap-5 rounded-panel bg-surface p-7 sm:p-11">
        <Eyebrow>О компании</Eyebrow>
        <SectionTitle size="md">{about.title}</SectionTitle>
        <p className="text-[17px] leading-[1.6] text-pretty text-body">
          {about.text}
        </p>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-3.5">
          {about.perks.map((perk) => (
            <li key={perk} className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="grid size-[22px] flex-none place-items-center rounded-full bg-accent text-[12px] font-bold"
              >
                ✓
              </span>
              <span className="font-medium">{perk}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
