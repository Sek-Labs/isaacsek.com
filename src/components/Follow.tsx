function Follow() {
  return (
    <section id="follow" className="section follow">
      <p className="eyebrow">Follow</p>
      <h2>Building in public, out in the open.</h2>
      <p>
        I share progress, lessons, and the occasional misstep as I ship.
        Follow along and say hello.
      </p>
      <div className="follow-links">
        <a
          className="button secondary"
          href="https://x.com/isaacsek"
          target="_blank"
          rel="noopener noreferrer"
        >
          X / Twitter
        </a>
        <a
          className="button secondary"
          href="https://github.com/isaacsek"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </section>
  );
}

export { Follow };
