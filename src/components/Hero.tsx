function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-inner">
        <p className="eyebrow">Software engineer building in public</p>
        <h1>I build small, practical bets and ship them.</h1>
        <p className="hero-copy">
          I'm Isaac Sek, a software engineer in New York building a portfolio of
          focused consumer products around real friction points I couldn't stop
          thinking about.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#work">View work</a>
          <a className="button secondary" href="mailto:isaac@sek-labs.com">Get in touch</a>
        </div>
      </div>
    </section>
  );
}

export { Hero };
