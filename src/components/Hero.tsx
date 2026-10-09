import Image from "next/image";
import { Header } from "@/components/Header";
import { HeroSearch } from "@/components/HeroSearch";
import { hero } from "@/data/content";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[760px] flex-col gap-6 overflow-hidden rounded-panel bg-linear-to-b from-[#9fb4e3] via-[#c9c3e6] via-55% to-[#f0d9d0] px-4 pt-4 pb-5 sm:px-7 sm:pt-5 sm:pb-7"
    >
      <Image
        src="/img/hero.jpg"
        alt=""
        fill
        sizes="(min-width: 1280px) 1240px, 100vw"
        loading="eager"
        fetchPriority="high"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-b from-[rgb(60_60_130/.35)] to-[rgb(30_26_61/.55)]"
      />

      <Header />

      <div className="relative flex flex-col items-center gap-[18px] pt-9 text-center">
        <p className="rounded-full bg-white/60 px-4 py-2 text-[14px] font-medium">
          {hero.badge}
        </p>
        <h1 className="text-[clamp(44px,7.5vw,104px)] leading-[.98] font-semibold tracking-[-.03em] text-white [text-shadow:0_2px_30px_rgb(60_50_120/.25)]">
          {hero.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="max-w-[560px] text-[18px] leading-normal text-pretty text-white">
          {hero.lead}
        </p>
      </div>

      <HeroSearch />
    </section>
  );
}
