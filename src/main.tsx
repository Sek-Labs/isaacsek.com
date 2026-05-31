import "./styles.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Products } from "./components/Products";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import type { Product } from "./components/Products";

const work: readonly Product[] = [
  {
    name: "BrickReports",
    status: "Founder project",
    description:
      "Rental due-diligence reports that help New York City renters understand building quality, complaint history, and risk signals before signing a lease.",
    href: "https://brickreports.com",
    linkLabel: "Visit BrickReports",
  },
  {
    name: "Tally",
    status: "Personal finance",
    description:
      "A personal finance product focused on helping people understand cash flow, habits, and everyday financial decisions with less friction.",
    href: "https://tallyfinances.com/",
    linkLabel: "Visit Tally",
  },
];

function App() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Products products={work} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export { App };
