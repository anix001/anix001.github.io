import * as cheerio from "cheerio";
import type { Article } from "@/types/news";

export async function fetchGitHubTrending(): Promise<Article[]> {
  try {
    const res = await fetch("https://github.com/trending", {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; tech-news-portfolio/1.0)",
        Accept: "text/html",
      },
      next: { revalidate: 21600 },
    });
    if (!res.ok) return [];

    const html = await res.text();
    const $ = cheerio.load(html);
    const articles: Article[] = [];

    // Primary selector — stable since GitHub's 2020 redesign
    let rows = $("article.Box-row");
    // Fallback if GitHub renames Box-row
    if (rows.length === 0) rows = $("[data-hpc] article");

    rows.slice(0, 5).each((_, el) => {
      const repoPath = $(el)
        .find("h2 a, h1 a")
        .first()
        .attr("href")
        ?.trim();
      if (!repoPath) return;

      const repoName = repoPath.replace(/^\//, "").replace(/\s+/g, "");
      const url = `https://github.com${repoPath}`;

      const rawDescription =
        $(el)
          .find("p.col-9, p[class*='color-fg-muted']")
          .first()
          .text()
          .trim() ||
        $(el).find("p").first().text().trim() ||
        null;

      const description =
        rawDescription && rawDescription !== "No description provided"
          ? rawDescription
          : null;

      const starsText = $(el).text();
      const starsMatch = starsText.match(/([\d,]+)\s*stars today/i);
      const meta = starsMatch ? `⭐ ${starsMatch[1]} stars today` : undefined;

      const lang =
        $(el).find("[itemprop='programmingLanguage']").text().trim() ||
        undefined;

      articles.push({
        id: `gh-${repoName}`,
        title: repoName,
        url,
        summary: description,
        summarySource: description ? "native" : "none",
        source: "GitHub Trending" as const,
        tag: lang,
        meta,
        publishedAt: new Date().toISOString(),
      });
    });

    return articles;
  } catch {
    return [];
  }
}
