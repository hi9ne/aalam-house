"use client";

import Image from "next/image";
import { Eyebrow, SectionTitle } from "@/components/SectionHeading";
import {
  formatPrice,
  listings,
  propertyTypes,
  type Listing,
  type PropertyType,
} from "@/data/listings";
import { useCatalogFilter } from "@/lib/catalog-filter";
import { toggleFavorite, useFavoriteIds } from "@/lib/favorites";

// В чипах только те типы, по которым на витрине есть объекты.
const chips: { id: PropertyType | null; label: string }[] = [
  { id: null, label: "Все" },
  ...propertyTypes
    .filter((type) => listings.some((listing) => listing.type === type.id))
    .map((type) => ({ id: type.id, label: type.many })),
];

const chipClass =
  "flex items-center gap-1.5 rounded-full border border-line px-[18px] py-2.5 text-[14px] font-medium";

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="size-[17px]"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function ListingCard({
  listing,
  favorite,
}: {
  listing: Listing;
  favorite: boolean;
}) {
  const where = [listing.district, listing.address].filter(Boolean).join(", ");

  return (
    <article className="flex flex-col gap-3.5 rounded-card bg-white p-2.5">
      <div className="relative h-[210px] overflow-hidden rounded-[20px] bg-placeholder">
        <Image
          src={listing.image}
          alt={`${listing.title}, ${listing.district}`}
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <span className="absolute top-3 left-3 rounded-full bg-ink px-3 py-1.5 text-[12px] font-semibold text-white">
          {listing.tag}
        </span>
        <button
          type="button"
          aria-pressed={favorite}
          aria-label={`${favorite ? "Убрать из избранного" : "Добавить в избранное"}: ${listing.title}`}
          onClick={() => toggleFavorite(listing.id)}
          className={`absolute top-3 right-3 grid size-[34px] place-items-center rounded-full bg-white/90 after:absolute after:-inset-1.5 ${
            favorite ? "text-accent" : "text-ink"
          }`}
        >
          <HeartIcon filled={favorite} />
        </button>
      </div>
      <div className="flex flex-col gap-2 px-3 pb-3">
        <div className="flex items-baseline justify-between gap-2 text-[19px] font-bold">
          <h3>{listing.title}</h3>
          <span className="whitespace-nowrap">
            {formatPrice(listing.price, listing.deal)}
          </span>
        </div>
        <p className="text-[14px] text-subtle">{where}</p>
        <p className="border-t border-page pt-2.5 text-[14px] text-ink-soft">
          {listing.specs.join(" · ")}
        </p>
      </div>
    </article>
  );
}

export function Catalog() {
  const { filter, setType, showFavorites, reset } = useCatalogFilter();
  const favoriteIds = useFavoriteIds();

  const favorites = listings.filter((listing) =>
    favoriteIds.includes(listing.id),
  );
  const visible = filter.favoritesOnly
    ? favorites
    : listings.filter(
        (listing) =>
          listing.deal === filter.deal &&
          (filter.type === null || listing.type === filter.type) &&
          (filter.district === null || listing.district === filter.district) &&
          (filter.budget === null || listing.price <= filter.budget),
      );

  const searchSummary = filter.favoritesOnly
    ? ""
    : [
        filter.district,
        filter.budget !== null &&
          `до ${formatPrice(filter.budget, filter.deal)}`,
      ]
        .filter(Boolean)
        .join(" · ");

  return (
    <section
      id="catalog"
      className="flex scroll-mt-5 flex-col gap-7 rounded-panel bg-surface px-5 py-12 sm:px-9"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Каталог</Eyebrow>
          <SectionTitle className="mt-1.5">Актуальные объекты</SectionTitle>
        </div>
        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => {
            const active = !filter.favoritesOnly && filter.type === chip.id;
            return (
              <button
                key={chip.label}
                type="button"
                aria-pressed={active}
                onClick={() => setType(chip.id)}
                className={`${chipClass} ${
                  active ? "bg-ink text-white" : "text-ink"
                }`}
              >
                {chip.label}
              </button>
            );
          })}
          <button
            type="button"
            aria-pressed={filter.favoritesOnly}
            onClick={showFavorites}
            className={`${chipClass} ${
              filter.favoritesOnly ? "bg-ink text-white" : "text-ink"
            }`}
          >
            <HeartIcon filled={filter.favoritesOnly} />
            Избранное
            {favorites.length > 0 && ` · ${favorites.length}`}
          </button>
        </div>
      </div>

      {searchSummary && (
        <p className="-mt-3 text-[14px] text-subtle">
          Фильтр: {searchSummary}.{" "}
          <button
            type="button"
            onClick={reset}
            className="font-semibold text-ink underline underline-offset-2"
          >
            Сбросить
          </button>
        </p>
      )}

      {visible.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(280px,100%),1fr))] gap-5">
          {visible.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              favorite={favoriteIds.includes(listing.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-card bg-white px-6 py-12 text-center">
          <p className="text-[19px] font-bold">
            {filter.favoritesOnly
              ? "В избранном пока пусто"
              : "На витрине таких объектов сейчас нет"}
          </p>
          <p className="max-w-[460px] leading-normal text-subtle">
            {filter.favoritesOnly
              ? "Нажмите на сердечко на карточке, и объект появится здесь."
              : "В полной базе вариантов больше. Оставьте заявку, и мы подберём объекты под ваш запрос."}
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-1 font-semibold underline underline-offset-2"
          >
            {filter.favoritesOnly ? "Показать все объекты" : "Сбросить фильтр"}
          </button>
        </div>
      )}

      <div className="text-center">
        <a
          href="#contact"
          className="inline-block rounded-full border-[1.5px] border-ink px-[30px] py-3.5 font-semibold hover:text-accent"
        >
          Получить полную базу объектов
        </a>
      </div>
    </section>
  );
}
