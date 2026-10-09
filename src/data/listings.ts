import { formatUsd } from "@/lib/format";

export type Deal = "buy" | "rent";
export type PropertyType = "apartment" | "house" | "commercial" | "land";

export type Listing = {
  id: string;
  deal: Deal;
  type: PropertyType;
  tag: string;
  title: string;
  /** Доллары США; для аренды — в месяц. */
  price: number;
  district: string;
  address?: string;
  specs: string[];
  image: string;
};

export const deals: { id: Deal; label: string }[] = [
  { id: "buy", label: "Купить" },
  { id: "rent", label: "Аренда" },
];

export const propertyTypes: { id: PropertyType; one: string; many: string }[] = [
  { id: "apartment", one: "Квартира", many: "Квартиры" },
  { id: "house", one: "Дом", many: "Дома" },
  { id: "commercial", one: "Коммерция", many: "Коммерция" },
  { id: "land", one: "Участок", many: "Участки" },
];

export const budgetOptions: Record<Deal, number[]> = {
  buy: [100_000, 200_000, 300_000],
  rent: [500, 1_000, 2_000],
};

export const listings: Listing[] = [
  {
    id: "buy-1",
    deal: "buy",
    type: "apartment",
    tag: "Новостройка",
    title: "3-комн. квартира",
    price: 145_000,
    district: "Юг-2",
    address: "ул. Ахунбаева",
    specs: ["92 м²", "3 комн.", "7/12 эт."],
    image: "/img/apt0.png",
  },
  {
    id: "buy-2",
    deal: "buy",
    type: "house",
    tag: "Эксклюзив",
    title: "Дом с участком",
    price: 320_000,
    district: "Ала-Арча",
    address: "Бишкек",
    specs: ["240 м²", "5 комн.", "6 сот."],
    image: "/img/house1.png",
  },
  {
    id: "buy-3",
    deal: "buy",
    type: "apartment",
    tag: "Элитный дом",
    title: "2-комн. квартира",
    price: 98_000,
    district: "Джал",
    address: "ул. Раззакова",
    specs: ["64 м²", "2 комн.", "5/9 эт."],
    image: "/img/apt2.png",
  },
  {
    id: "buy-4",
    deal: "buy",
    type: "commercial",
    tag: "Под бизнес",
    title: "Помещение 1 этаж",
    price: 210_000,
    district: "Центр",
    address: "пр. Чуй",
    specs: ["120 м²", "витрины", "отд. вход"],
    image: "/img/commercial3.png",
  },
  {
    id: "buy-5",
    deal: "buy",
    type: "house",
    tag: "Новый",
    title: "Таунхаус",
    price: 185_000,
    district: "Асанбай",
    specs: ["150 м²", "4 комн.", "гараж"],
    image: "/img/house4.png",
  },
  {
    id: "buy-6",
    deal: "buy",
    type: "apartment",
    tag: "Сдан",
    title: "1-комн. квартира",
    price: 62_000,
    district: "7 мкр",
    specs: ["42 м²", "1 комн.", "3/9 эт."],
    image: "/img/apt5.png",
  },
  {
    id: "rent-1",
    deal: "rent",
    type: "apartment",
    tag: "Аренда",
    title: "2-комн. квартира",
    price: 650,
    district: "Магистраль",
    specs: ["58 м²", "с мебелью"],
    image: "/img/apt0.png",
  },
  {
    id: "rent-2",
    deal: "rent",
    type: "house",
    tag: "Аренда",
    title: "Дом в Ала-Арча",
    price: 1_800,
    district: "Ала-Арча",
    specs: ["200 м²", "сад", "камин"],
    image: "/img/house1.png",
  },
  {
    id: "rent-3",
    deal: "rent",
    type: "commercial",
    tag: "Аренда",
    title: "Офис 85 м²",
    price: 1_200,
    district: "Центр",
    specs: ["85 м²", "open space"],
    image: "/img/commercial2.png",
  },
  {
    id: "rent-4",
    deal: "rent",
    type: "apartment",
    tag: "Аренда",
    title: "1-комн. квартира",
    price: 420,
    district: "Джал",
    specs: ["40 м²", "евроремонт"],
    image: "/img/apt3.png",
  },
  {
    id: "rent-5",
    deal: "rent",
    type: "apartment",
    tag: "Аренда",
    title: "3-комн. квартира",
    price: 900,
    district: "Юг-2",
    specs: ["85 м²", "новый дом"],
    image: "/img/apt4.png",
  },
  {
    id: "rent-6",
    deal: "rent",
    type: "commercial",
    tag: "Аренда",
    title: "Магазин",
    price: 1_500,
    district: "Асанбай",
    specs: ["70 м²", "первая линия"],
    image: "/img/commercial5.png",
  },
];

/** Районы для фильтра берутся из самих объектов, чтобы список не расходился с витриной. */
export const listingDistricts = [...new Set(listings.map((l) => l.district))];

export function formatPrice(price: number, deal: Deal) {
  return deal === "rent" ? `${formatUsd(price)} / мес` : formatUsd(price);
}
