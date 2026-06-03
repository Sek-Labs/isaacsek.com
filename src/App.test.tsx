import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, expect, it } from "vitest";
import { App } from "./main";

describe("Isaac Sek personal site", () => {
  it("renders core personal details and all three products", () => {
    render(<App />);

    expect(screen.getAllByText(/Isaac Sek/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/New York/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/BrickReports/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Tally/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Taka/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/isaac@sek-labs.com/i).length).toBeGreaterThan(0);
  });

  it("renders the updated hero eyebrow text", () => {
    render(<App />);

    expect(
      screen.getAllByText(/Software engineer building in public/i).length
    ).toBeGreaterThan(0);
    // The old eyebrow text must NOT appear anywhere
    expect(
      screen.queryByText(/Software engineer and founder/i)
    ).not.toBeInTheDocument();
  });

  it("does not claim Isaac left big tech", () => {
    render(<App />);

    expect(screen.queryByText(/left big tech/i)).not.toBeInTheDocument();
  });

  describe("Sek Labs placement", () => {
    it("does not mention Sek Labs anywhere inside <main>", () => {
      render(<App />);

      const mainEl = screen.getByRole("main");
      expect(mainEl.textContent).not.toMatch(/Sek Labs/i);
    });

    it("still has a Sek Labs link in the footer", () => {
      render(<App />);

      const footer = screen.getByRole("contentinfo");
      const sekLabsLink = within(footer).getByRole("link", {
        name: /Sek Labs/i,
      });
      expect(sekLabsLink).toBeInTheDocument();
    });
  });

  describe("products section (#work)", () => {
    it("renders exactly 3 product cards", () => {
      const { container } = render(<App />);

      const productCards = container.querySelectorAll("#work article");
      expect(productCards.length).toBe(3);
    });

    it("has a Tally product link with correct href", () => {
      const { container } = render(<App />);

      const productsSection = container.querySelector("#work");
      expect(productsSection).not.toBeNull();

      const tallyLink = productsSection!.querySelector(
        'a[href="https://tallyfinances.com/"]'
      );
      expect(tallyLink).not.toBeNull();
      expect(tallyLink!.textContent).toMatch(/Tally/i);
    });

    it("renders Taka card with no outbound link and Coming soon status", () => {
      const { container } = render(<App />);

      const productCards = container.querySelectorAll("#work article");
      let takaCard: Element | null = null;
      productCards.forEach((card) => {
        const heading = card.querySelector("h3");
        if (heading && /Taka/i.test(heading.textContent ?? "")) {
          takaCard = card;
        }
      });

      expect(takaCard).not.toBeNull();
      // Taka should have NO anchor elements (no outbound link)
      const linksInTaka = takaCard!.querySelectorAll("a");
      expect(linksInTaka.length).toBe(0);
      // Taka should display "Coming soon" status
      expect(takaCard!.textContent).toMatch(/Coming soon/i);
    });

    it("uses strategy-specific product positioning copy", () => {
      const { container } = render(<App />);

      const productsSection = container.querySelector("#work");
      expect(productsSection).not.toBeNull();
      expect(productsSection!.textContent).toMatch(/NYC rentals/i);
      expect(productsSection!.textContent).toMatch(
        /Rental due-diligence reports for New York City renters/i
      );
      expect(productsSection!.textContent).toMatch(
        /Personal finance should hurt less/i
      );
    });
  });

  describe("contact section", () => {
    it("has exactly 3 definition list rows: Name, Location, Email", () => {
      const { container } = render(<App />);

      const contactDl = container.querySelector("#contact dl");
      expect(contactDl).not.toBeNull();

      const dtElements = contactDl!.querySelectorAll("dt");
      expect(dtElements.length).toBe(3);

      const dtTexts = Array.from(dtElements).map(
        (dt) => dt.textContent ?? ""
      );
      expect(dtTexts).toContain("Name");
      expect(dtTexts).toContain("Location");
      expect(dtTexts).toContain("Email");
    });

    it("does not contain a Company row or Sek Labs LLC", () => {
      const { container } = render(<App />);

      const contactSection = container.querySelector("#contact");
      expect(contactSection).not.toBeNull();

      const dtElements = contactSection!.querySelectorAll("dt");
      const dtTexts = Array.from(dtElements).map(
        (dt) => dt.textContent ?? ""
      );
      expect(dtTexts).not.toContain("Company");

      expect(contactSection!.textContent).not.toMatch(/Sek Labs LLC/i);
    });

    it("has an Email row with the correct mailto link", () => {
      const { container } = render(<App />);

      const contactDl = container.querySelector("#contact dl");
      expect(contactDl).not.toBeNull();

      const mailtoLink = contactDl!.querySelector(
        'a[href="mailto:isaac@sek-labs.com"]'
      );
      expect(mailtoLink).not.toBeNull();
    });

    it("does not apply card class to the contact section", () => {
      const { container } = render(<App />);

      const contactSection = container.querySelector(".contact");
      expect(contactSection).toBeInTheDocument();
      expect(contactSection).not.toHaveClass("card");
    });
  });

  it("has at least one mailto link for Isaac", () => {
    const { container } = render(<App />);

    const mailtoLinks = container.querySelectorAll(
      'a[href="mailto:isaac@sek-labs.com"]'
    );
    expect(mailtoLinks.length).toBeGreaterThanOrEqual(1);
  });

  describe("landmark structure", () => {
    it("has a banner landmark (header)", () => {
      render(<App />);

      expect(screen.getByRole("banner")).toBeInTheDocument();
    });

    it("has a main landmark", () => {
      render(<App />);

      expect(screen.getByRole("main")).toBeInTheDocument();
    });

    it("has a contentinfo landmark (footer)", () => {
      render(<App />);

      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    it("does not nest header or footer inside main", () => {
      const { container } = render(<App />);

      const mainEl = container.querySelector("main");
      expect(mainEl).not.toBeNull();
      expect(mainEl!.querySelector("header")).toBeNull();
      expect(mainEl!.querySelector("footer")).toBeNull();
    });
  });

  it("keeps policy links compact in the footer", () => {
    render(<App />);

    const footerNav = screen.getByRole("navigation", {
      name: /Company links/i,
    });
    const links = Array.from(footerNav.querySelectorAll("a")).map(
      (link) => link.textContent
    );

    expect(links).toEqual(
      expect.arrayContaining(["Privacy", "Terms", "Cookies", "Email"])
    );
    expect(
      screen.queryByText(
        /This company website does not set non-essential cookies/i
      )
    ).not.toBeInTheDocument();
  });

  // ST-1 — Tighten About copy
  describe("about section copy (#about)", () => {
    it("drops the 'years at large software companies' phrasing", () => {
      const { container } = render(<App />);

      const aboutSection = container.querySelector("#about");
      expect(aboutSection).not.toBeNull();
      expect(aboutSection!.textContent).not.toMatch(
        /years at large software companies/i
      );
    });

    it("drops the 'Big-tech engineering, indie-scale ambition' heading", () => {
      const { container } = render(<App />);

      const aboutSection = container.querySelector("#about");
      expect(aboutSection).not.toBeNull();
      expect(aboutSection!.textContent).not.toMatch(
        /Big-tech engineering, indie-scale ambition/i
      );
    });

    it("frames the about heading around building in public", () => {
      const { container } = render(<App />);

      const aboutHeading = container.querySelector("#about h2");
      expect(aboutHeading).not.toBeNull();
      expect(aboutHeading!.textContent).toMatch(/in public/i);
    });
  });

  // ST-2 — Add founder framing to hero (NOT the eyebrow)
  describe("hero founder framing (#top)", () => {
    it("mentions 'founder' somewhere inside the hero", () => {
      const { container } = render(<App />);

      const heroSection = container.querySelector("#top");
      expect(heroSection).not.toBeNull();
      expect(heroSection!.textContent).toMatch(/founder/i);
    });

    it("does not put 'founder' inside the eyebrow paragraph", () => {
      const { container } = render(<App />);

      const eyebrow = container.querySelector("#top p.eyebrow");
      expect(eyebrow).not.toBeNull();
      expect(eyebrow!.textContent).not.toMatch(/founder/i);
      // The original eyebrow copy must remain intact.
      expect(eyebrow!.textContent).toMatch(
        /Software engineer building in public/i
      );
    });
  });

  // ST-3 — Build-in-public links surface (#follow)
  describe("follow links surface (#follow)", () => {
    it("renders a #follow section inside <main>", () => {
      const { container } = render(<App />);

      const mainEl = container.querySelector("main");
      expect(mainEl).not.toBeNull();

      const followSection = mainEl!.querySelector("#follow");
      expect(followSection).not.toBeNull();
    });

    it("exposes external X/Twitter and GitHub links opening safely", () => {
      const { container } = render(<App />);

      const followSection = container.querySelector("#follow");
      expect(followSection).not.toBeNull();

      const httpsLinks = followSection!.querySelectorAll(
        'a[href^="https://"]'
      );
      expect(httpsLinks.length).toBeGreaterThanOrEqual(2);

      const scoped = within(followSection as HTMLElement);
      const twitterLink = scoped.getByRole("link", { name: /x|twitter/i });
      const githubLink = scoped.getByRole("link", { name: /github/i });

      for (const link of [twitterLink, githubLink]) {
        expect(link).toHaveAttribute("href", expect.stringMatching(/^https:\/\//));
        expect(link).toHaveAttribute("target", "_blank");
        expect(link.getAttribute("rel") ?? "").toMatch(/noopener/);
      }
    });

    it("does not mention Sek Labs in the #follow section", () => {
      const { container } = render(<App />);

      const followSection = container.querySelector("#follow");
      expect(followSection).not.toBeNull();
      expect(followSection!.textContent).not.toMatch(/Sek Labs/i);
    });

    it("does not add the follow links to the #work product grid", () => {
      const { container } = render(<App />);

      const productCards = container.querySelectorAll("#work article");
      expect(productCards.length).toBe(3);
    });
  });

  // ST-4 — Skip-to-content link
  describe("skip-to-content link", () => {
    it("renders a skip link targeting the main content", () => {
      render(<App />);

      const skipLink = screen.getByRole("link", {
        name: /skip to (main )?content/i,
      });
      expect(skipLink).toBeInTheDocument();
      expect(skipLink).toHaveAttribute("href", "#main-content");
    });

    it("keeps id='main-content' on the main element", () => {
      const { container } = render(<App />);

      const mainEl = container.querySelector("main");
      expect(mainEl).not.toBeNull();
      expect(mainEl).toHaveAttribute("id", "main-content");
    });
  });
});
