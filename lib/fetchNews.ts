import { readFileSync } from "fs";
import { join } from "path";
import type { Article } from "@/types/news";
import { fetchHackerNews } from "@/lib/fetchers/hackernews";
import { fetchDevTo } from "@/lib/fetchers/devto";
import { fetchReddit } from "@/lib/fetchers/reddit";
import { fetchTLDR } from "@/lib/fetchers/tldr";
import { fetchGitHubTrending } from "@/lib/fetchers/github-trending";

function loadCache(): Article[] {
  try {
    const raw = readFileSync(
      join(process.cwd(), "data/news-cache.json"),
      "utf-8",
    );
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function dedupeByUrl(articles: Article[]): Article[] {
  const seen = new Set<string>();
  return articles.filter((a) => {
    if (seen.has(a.url)) return false;
    seen.add(a.url);
    return true;
  });
}

export async function fetchNews(): Promise<Article[]> {
  const results = await Promise.allSettled([
    fetchHackerNews(),
    fetchDevTo(),
    fetchReddit(),
    fetchTLDR(),
    fetchGitHubTrending(),
  ]);

  const articles = results.flatMap((r) =>
    r.status === "fulfilled" ? r.value : [],
  );

  if (articles.length === 0) {
    return loadCache();
  }

  const sorted = [...articles].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return dedupeByUrl(sorted);
}
