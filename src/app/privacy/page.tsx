import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { site } from "@/data/site";

const title = "Политика обработки персональных данных";

export const metadata: Metadata = {
  title,
  // Черновик не должен попадать в поиск.
  robots: { index: false },
};

// Макет политики: текст описывает, как сайт работает сейчас, и не согласован с юристом.
const sections = [
  {
    heading: "Кто обрабатывает данные",
    text: `Агентство недвижимости «${site.name}», г. Бишкек. Реквизиты оператора будут добавлены в финальной версии документа.`,
  },
  {
    heading: "Какие данные мы получаем",
    text: "Имя, номер телефона и тип запроса, которые вы указываете в форме заявки. Если вы добавили объекты в избранное, их список прикладывается к заявке.",
  },
  {
    heading: "Зачем они нужны",
    text: "Чтобы связаться с вами по заявке и подобрать объекты под ваш запрос. Для рассылок и рекламы данные не используются.",
  },
  {
    heading: "Как данные передаются и хранятся",
    text: "Заявка передаётся сотрудникам агентства через мессенджер Telegram. Список избранного хранится в вашем браузере и уходит на сервер только вместе с заявкой.",
  },
  {
    heading: "Срок хранения",
    text: "Срок хранения и порядок удаления данных будут указаны в финальной версии документа.",
  },
  {
    heading: "Ваши права",
    text: "Вы можете попросить уточнить или удалить свои данные. Для этого свяжитесь с нами по контактам ниже.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto flex max-w-[1280px] flex-col gap-5 px-5 pt-5">
      <header className="flex items-center justify-between gap-4 rounded-full bg-white/70 py-2.5 pr-6 pl-6">
        <Logo href="/" />
        <Link href="/" className="text-[14px] font-medium hover:text-accent">
          На главную
        </Link>
      </header>

      <main className="rounded-panel bg-surface px-5 py-12 sm:px-9">
        <div className="mx-auto flex max-w-[720px] flex-col gap-7">
          <h1 className="text-[clamp(30px,3.6vw,46px)] font-semibold tracking-[-.02em]">
            {title}
          </h1>
          <p className="rounded-card bg-white p-5 leading-normal">
            <b>Черновик.</b> Это макет политики для этапа разработки сайта, а
            не утверждённый юридический документ. Перед запуском текст нужно
            заменить на согласованный с юристом.
          </p>
          {sections.map((section) => (
            <section key={section.heading} className="flex flex-col gap-2">
              <h2 className="text-[21px] font-bold">{section.heading}</h2>
              <p className="leading-[1.6] text-body">{section.text}</p>
            </section>
          ))}
          <section className="flex flex-col gap-2">
            <h2 className="text-[21px] font-bold">Контакты</h2>
            <p className="leading-[1.6] text-body">
              {site.address}
              <br />
              <a href={site.phone.href} className="font-semibold text-ink">
                {site.phone.display}
              </a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
