import Image from "next/image";
import { Eyebrow, SectionTitle } from "@/components/SectionHeading";
import { districtCards } from "@/data/content";

export function Districts() {
  return (
    <section
      id="districts"
      className="flex scroll-mt-5 flex-col gap-7 rounded-panel bg-ink px-5 py-12 text-white sm:px-9"
    >
      <div>
        <Eyebrow className="text-accent-soft">География</Eyebrow>
        <SectionTitle className="mt-1.5">Районы Бишкека</SectionTitle>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-3.5">
        {districtCards.map((district) => (
          <div
            key={district.name}
            className="relative flex h-[200px] flex-col justify-end gap-1 overflow-hidden rounded-3xl p-5"
          >
            <Image
              src={district.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-b from-ink/10 to-ink/85"
            />
            <h3 className="relative text-[22px] font-bold">{district.name}</h3>
            <p className="relative text-[14px] text-on-dark-strong">
              {district.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
