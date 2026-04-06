import type { Article } from "@/types/news";

interface DevToArticle {
  id: number;
  title: string;
  url: string;
  description: string;
  tag_list: string[];
  reading_time_minutes: number;
  published_at: string;
}

export async function fetchDevTo(): Promise<Article[]> {
  try {
    const res = await fetch("https://dev.to/api/articles?top=1&per_page=5", {
      next: { revalidate: 21600 },
    });
    if (!res.ok) return [];
    const articles: DevToArticle[] = await res.json();

    return articles.map((a) => ({
      id: `devto-${a.id}`,
      title: a.title,
      url: a.url,
      summary: a.description ? a.description.slice(0, 200) : null,
      summarySource: a.description ? ("native" as const) : ("none" as const),
      source: "Dev.to" as const,
      tag: a.tag_list[0],
      meta: `${a.reading_time_minutes} min read`,
      publishedAt: a.published_at,
    }));
  } catch {
    return [];
  }
}
