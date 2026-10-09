type SiteConfig = {
  name: string;
  phone: { display: string; href: string };
  whatsapp: string;
  /** Пустая строка скрывает кнопку в блоке контактов. */
  telegram: string;
  instagram: string;
  address: string;
  hours: string;
  copyrightYear: number;
};

export const site: SiteConfig = {
  name: "ААЛАМ House",
  phone: { display: "+996 770 172 008", href: "tel:+996770172008" },
  whatsapp: "https://wa.me/996770172008",
  // Заглушки: ссылки и адрес выдуманы, заменить на настоящие перед запуском.
  telegram: "https://t.me/aalamhouse",
  instagram: "https://instagram.com/aalamhouse",
  address: "г. Бишкек, ул. Киевская, 77, офис 5",
  hours: "Ежедневно, 09:00–19:00",
  copyrightYear: 2026,
};

export const navigation = [
  { href: "#catalog", label: "Объекты" },
  { href: "#services", label: "Услуги" },
  { href: "#districts", label: "Районы" },
  { href: "#calc", label: "Ипотека" },
  { href: "#about", label: "О компании" },
  { href: "#faq", label: "Вопросы" },
];

export const leadIntents = [
  "Хочу купить",
  "Хочу снять",
  "Хочу продать",
  "Сдать в аренду",
];
