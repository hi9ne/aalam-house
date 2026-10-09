import { stats } from "@/data/content";

export function Stats() {
  return (
    <section
      aria-label="Цифры о компании"
      className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-4"
    >
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-card bg-surface p-7">
          <div className="text-[48px] font-semibold tracking-[-.03em]">
            {stat.value}
          </div>
          <div className="mt-1 text-subtle">{stat.label}</div>
        </div>
      ))}
    </section>
  );
}
