import type { Article } from "@/types/news";
import { extractSummary, delay } from "@/lib/summarizer";

interface RedditPost {
  id: string;
  title: string;
  url: string;
  selftext: string;
  score: number;
  created_utc: number;
  link_flair_text: string | null;
  permalink: string;
}

interface RedditResponse {
  data: {
    children: { data: RedditPost }[];
  };
}

export async function fetchReddit(): Promise<Article[]> {
  try {
    const res = await fetch(
      "https://www.reddit.com/r/programming/hot.json?limit=5",
      {
        headers: { "User-Agent": "tech-news-portfolio/1.0" },
        next: { revalidate: 21600 },
      },
    );
    if (!res.ok) return [];
    const json: RedditResponse = await res.json();
    const posts = json.data.children.map((c) => c.data);

    // Extract summaries sequentially with 300ms delay for external links
    const articles: Article[] = [];

    for (let i = 0; i < posts.length; i++) {
      const p = posts[i];
      const isExternal = !p.url.includes("reddit.com");
      const resolvedUrl = isExternal ? p.url : `https://www.reddit.com${p.permalink}`;

      let summary: string | null = null;
      let summarySource: Article["summarySource"] = "none";

      if (p.selftext.trim()) {
        // Self-post with body text — use directly as native
        summary = p.selftext.slice(0, 220);
        summarySource = "native";
      } else if (isExternal) {
        // Link post — extract from external page
        summary = await extractSummary(p.url);
        summarySource = summary ? "extracted" : "none";
        if (i < posts.length - 1) await delay(300);
      }

      articles.push({
        id: `reddit-${p.id}`,
        title: p.title,
        url: resolvedUrl,
        summary,
        summarySource,
        source: "Reddit" as const,
        tag: p.link_flair_text ?? undefined,
        meta: `${p.score} points`,
        publishedAt: new Date(p.created_utc * 1000).toISOString(),
      });
    }

    return articles;
  } catch {
    return [];
  }
}
