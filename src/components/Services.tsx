import { Eyebrow, SectionTitle } from "@/components/SectionHeading";
import { services } from "@/data/content";

export function Services() {
  return (
    <section
      id="services"
      className="flex scroll-mt-5 flex-col gap-7 px-4 py-12"
    >
      <div>
        <Eyebrow>Услуги</Eyebrow>
        <SectionTitle className="mt-1.5 max-w-[700px]">
          Всё для сделки в одном месте
        </SectionTitle>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-4">
        {services.map((service, index) => (
          <div
            key={service.title}
            className="flex min-h-[220px] flex-col gap-3 rounded-card bg-surface p-7"
          >
            <div
              aria-hidden
              className="grid size-11 place-items-center rounded-full bg-ink font-semibold text-white"
            >
              {index + 1}
            </div>
            <h3 className="mt-auto text-[21px] font-bold">{service.title}</h3>
            <p className="leading-normal text-pretty text-muted">
              {service.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
