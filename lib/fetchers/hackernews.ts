import type { Article } from "@/types/news";
import { extractSummary, delay } from "@/lib/summarizer";

const HN_BASE = "https://hacker-news.firebaseio.com/v0";

interface HNItem {
  id: number;
  title?: string;
  url?: string;
  text?: string;
  score?: number;
  time?: number;
  type?: string;
}

export async function fetchHackerNews(): Promise<Article[]> {
  try {
    const idsRes = await fetch(`${HN_BASE}/topstories.json`, {
      next: { revalidate: 21600 },
    });
    if (!idsRes.ok) return [];
    const ids: number[] = await idsRes.json();

    // Fetch metadata in parallel — hitting HN's own API, not external sites
    const items = await Promise.all(
      ids.slice(0, 5).map((id) =>
        fetch(`${HN_BASE}/item/${id}.json`, { next: { revalidate: 21600 } })
          .then((r) => r.json() as Promise<HNItem>)
          .catch(() => null),
      ),
    );

    const valid = items.filter(
      (item): item is HNItem =>
        item !== null && item.type === "story" && Boolean(item.title),
    );

    // Extract summaries sequentially with 300ms delay to respect external servers
    const articles: Article[] = [];

    for (let i = 0; i < valid.length; i++) {
      const item = valid[i];
      let summary: string | null = null;
      let summarySource: Article["summarySource"] = "none";

      if (item.url) {
        // External link — attempt HTML extraction
        summary = await extractSummary(item.url);
        summarySource = summary ? "extracted" : "none";
      } else if (item.text) {
        // Ask HN / hosted text — strip HTML tags
        summary = item.text.replace(/<[^>]*>/g, "").slice(0, 220);
        summarySource = "native";
      }

      articles.push({
        id: `hn-${item.id}`,
        title: item.title!,
        url: item.url ?? `https://news.ycombinator.com/item?id=${item.id}`,
        summary,
        summarySource,
        source: "Hacker News" as const,
        meta: item.score ? `${item.score} points` : undefined,
        publishedAt: item.time
          ? new Date(item.time * 1000).toISOString()
          : new Date().toISOString(),
      });

      if (i < valid.length - 1) await delay(300);
    }

    return articles;
  } catch {
    return [];
  }
}
