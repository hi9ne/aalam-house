import { SectionTitle } from "@/components/SectionHeading";
import { steps } from "@/data/content";

export function Process() {
  return (
    <section className="flex flex-col gap-7 px-4 py-12">
      <SectionTitle>Как мы работаем</SectionTitle>
      <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-4">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="flex flex-col gap-2 border-t-2 border-ink pt-[18px]"
          >
            <span
              aria-hidden
              className="font-mono text-[14px] font-medium text-accent"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-[21px] font-bold">{step.title}</h3>
            <p className="leading-normal text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
