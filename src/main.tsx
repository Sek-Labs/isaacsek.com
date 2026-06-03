import "./styles.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Products } from "./components/Products";
import { Follow } from "./components/Follow";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import type { Product } from "./components/Products";

const work: readonly Product[] = [
  {
    name: "BrickReports",
    status: "NYC rentals",
    description:
      "Rental due-diligence reports for New York City renters evaluating building quality, complaint history, and risk before signing a lease.",
    href: "https://brickreports.com",
    linkLabel: "Visit BrickReports",
  },
  {
    name: "Tally",
    status: "Personal finance",
    description:
      "Personal finance should hurt less. Tally is focused on understanding cash flow, habits, and everyday money decisions with less friction.",
    href: "https://tallyfinances.com/",
    linkLabel: "Visit Tally",
  },
  {
    name: "Taka",
    status: "Coming soon",
    description:
      "A lighter-weight content and personal edge, with details dropping soon.",
  },
];

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Products products={work} />
        <Follow />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export { App };
