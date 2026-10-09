import Image from "next/image";
import { SectionTitle } from "@/components/SectionHeading";
import { team } from "@/data/content";

export function Team() {
  return (
    <section className="flex flex-col gap-7 rounded-panel bg-surface px-5 py-12 sm:px-9">
      <SectionTitle>Наши специалисты</SectionTitle>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-4">
        {team.map((member) => (
          <div key={member.role} className="flex flex-col gap-3">
            <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-placeholder">
              <Image
                src={member.image}
                alt={`${member.name}, ${member.role}`}
                fill
                sizes="(min-width: 1024px) 290px, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <b className="text-[18px]">{member.name}</b>
              <br />
              <span className="text-subtle">{member.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
