import { About } from "@/components/About";
import { Catalog } from "@/components/Catalog";
import { Contact } from "@/components/Contact";
import { Districts } from "@/components/Districts";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { MortgageCalculator } from "@/components/MortgageCalculator";
import { Process } from "@/components/Process";
import { Reviews } from "@/components/Reviews";
import { Services } from "@/components/Services";
import { Stats } from "@/components/Stats";
import { Team } from "@/components/Team";
import { CatalogFilterProvider } from "@/lib/catalog-filter";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-[1280px] flex-col gap-5 px-5 pt-5">
      <main className="flex flex-col gap-5">
        <CatalogFilterProvider>
          <Hero />
          <Stats />
          <Catalog />
        </CatalogFilterProvider>
        <Services />
        <Districts />
        <About />
        <Process />
        <MortgageCalculator />
        <Reviews />
        <Team />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
