export type ArticleSource =
  | "Hacker News"
  | "Dev.to"
  | "Reddit"
  | "TLDR"
  | "GitHub Trending";

export type Article = {
  id: string;
  title: string;
  url: string;
  summary: string | null;
  summarySource: "native" | "extracted" | "none";
  source: ArticleSource;
  tag?: string;
  meta?: string; // "342 points" | "12 min read" | "⭐ 234 stars today"
  publishedAt: string; // ISO 8601
};

export const ALL_SOURCES = "All" as const;
export type SourceFilter = ArticleSource | typeof ALL_SOURCES;

export const SOURCE_TEXT_COLORS: Record<ArticleSource, string> = {
  "Hacker News": "text-orange-400",
  "Dev.to": "text-violet-400",
  Reddit: "text-red-400",
  TLDR: "text-blue-400",
  "GitHub Trending": "text-emerald-400",
};
