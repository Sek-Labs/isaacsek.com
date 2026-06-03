function Header() {
  return (
    <header className="site-header" aria-label="Isaac Sek navigation">
      <a className="brand" href="#top" aria-label="Isaac Sek home">
        <span className="brand-mark" aria-hidden="true">IS</span>
        <span>Isaac Sek</span>
      </a>
      <nav aria-label="Main navigation">
        <a href="#about">About</a>
        <a href="#work">Work</a>
        <a href="#follow">Follow</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}

export { Header };
