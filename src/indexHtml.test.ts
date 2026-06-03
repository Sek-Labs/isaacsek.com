import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { describe, expect, it } from "vitest";

const here = dirname(fileURLToPath(import.meta.url));
const indexHtmlPath = resolve(here, "..", "index.html");

function readIndexHtml(): string {
  return readFileSync(indexHtmlPath, "utf8");
}

describe("index.html social/SEO metadata", () => {
  it("includes an og:image meta tag with non-empty content", () => {
    const html = readIndexHtml();

    const match = html.match(
      /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i
    );
    expect(match).not.toBeNull();
    expect((match?.[1] ?? "").trim().length).toBeGreaterThan(0);
  });

  it("includes a twitter:card meta tag with a large-image value", () => {
    const html = readIndexHtml();

    const match = html.match(
      /<meta\s+name=["']twitter:card["']\s+content=["']([^"']+)["']/i
    );
    expect(match).not.toBeNull();
    expect(match?.[1]).toMatch(/summary_large_image|summary/i);
  });

  it("includes a twitter:title meta tag with non-empty content", () => {
    const html = readIndexHtml();

    const match = html.match(
      /<meta\s+name=["']twitter:title["']\s+content=["']([^"']+)["']/i
    );
    expect(match).not.toBeNull();
    expect((match?.[1] ?? "").trim().length).toBeGreaterThan(0);
  });

  it("includes a twitter:description meta tag with non-empty content", () => {
    const html = readIndexHtml();

    const match = html.match(
      /<meta\s+name=["']twitter:description["']\s+content=["']([^"']+)["']/i
    );
    expect(match).not.toBeNull();
    expect((match?.[1] ?? "").trim().length).toBeGreaterThan(0);
  });

  it("includes a canonical link pointing at https://isaacsek.com", () => {
    const html = readIndexHtml();

    const match = html.match(
      /<link\s+rel=["']canonical["']\s+href=["'](https:\/\/isaacsek\.com\/?)["']/i
    );
    expect(match).not.toBeNull();
  });

  it("keeps the existing Open Graph title/description/url/type tags", () => {
    const html = readIndexHtml();

    expect(html).toMatch(/<meta\s+property=["']og:title["']/i);
    expect(html).toMatch(/<meta\s+property=["']og:description["']/i);
    expect(html).toMatch(/<meta\s+property=["']og:url["']/i);
    expect(html).toMatch(/<meta\s+property=["']og:type["']/i);
  });
});
