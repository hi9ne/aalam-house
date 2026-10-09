import Image from "next/image";
import { SectionTitle } from "@/components/SectionHeading";
import { reviews } from "@/data/content";

export function Reviews() {
  return (
    <section className="flex flex-col gap-7 px-4 py-12">
      <SectionTitle>Отзывы клиентов</SectionTitle>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-4">
        {reviews.map((review) => (
          <figure
            key={review.name}
            className="flex flex-col gap-[18px] rounded-card bg-surface p-7"
          >
            <div
              role="img"
              aria-label="Оценка 5 из 5"
              className="tracking-[3px] text-accent"
            >
              ★★★★★
            </div>
            <blockquote className="leading-[1.6] text-pretty">
              {review.quote}
            </blockquote>
            <figcaption className="mt-auto flex items-center gap-3">
              <Image
                src={review.image}
                alt=""
                width={44}
                height={44}
                className="size-11 rounded-full bg-line object-cover"
              />
              <span>
                <b>{review.name}</b>
                <br />
                <span className="text-[14px] text-subtle">{review.deal}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
