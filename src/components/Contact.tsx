import { LeadForm } from "@/components/LeadForm";
import { SectionTitle } from "@/components/SectionHeading";
import { contact } from "@/data/content";
import { site } from "@/data/site";

const outlineLinkClass =
  "rounded-full border border-subtle px-[22px] py-3 font-semibold text-white";

export function Contact() {
  return (
    <section
      id="contact"
      className="grid scroll-mt-5 grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-10 rounded-panel bg-ink px-5 py-12 text-white sm:px-9"
    >
      <div className="flex flex-col gap-[18px]">
        <SectionTitle>{contact.title}</SectionTitle>
        <p className="leading-[1.6] text-on-dark">{contact.text}</p>
        <a href={site.phone.href} className="text-[30px] font-semibold">
          {site.phone.display}
        </a>
        <p className="text-on-dark">
          {site.address}
          <br />
          {site.hours}
        </p>
        <div className="flex flex-wrap gap-2.5">
          <a
            href={site.whatsapp}
            className="rounded-full bg-accent px-[22px] py-3 font-semibold text-ink"
          >
            WhatsApp
          </a>
          {site.telegram && (
            <a href={site.telegram} className={outlineLinkClass}>
              Telegram
            </a>
          )}
          {site.instagram && (
            <a href={site.instagram} className={outlineLinkClass}>
              Instagram
            </a>
          )}
        </div>
      </div>
      <LeadForm />
    </section>
  );
}
