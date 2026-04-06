import Parser from "rss-parser";
import type { Article } from "@/types/news";

const parser = new Parser();

const TLDR_FEED = "https://tldr.tech/rss";

export async function fetchTLDR(): Promise<Article[]> {
  try {
    const feed = await parser.parseURL(TLDR_FEED);
    return feed.items.slice(0, 5).map((item, i) => {
      const raw = item.contentSnippet ?? item.content?.slice(0, 200) ?? null;
      return {
        id: `tldr-${item.guid ?? item.link ?? String(i)}`,
        title: item.title ?? "TLDR Article",
        url: item.link ?? TLDR_FEED,
        summary: raw,
        summarySource: raw ? ("native" as const) : ("none" as const),
        source: "TLDR" as const,
        publishedAt: item.isoDate ?? new Date().toISOString(),
      };
    });
  } catch {
    return [];
  }
}
