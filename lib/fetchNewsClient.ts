import type { Article } from "@/types/news";

// ---------------------------------------------------------------------------
// Browser-safe fetchers — no Node.js / axios / cheerio
// Each returns [] on any error so one failing source never breaks the feed.
// ---------------------------------------------------------------------------

async function fetchHN(): Promise<Article[]> {
  try {
    const ids: number[] = await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json",
    ).then((r) => r.json());

    const items = await Promise.all(
      ids.slice(0, 5).map((id) =>
        fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
        ).then((r) => r.json()),
      ),
    );

    return items.map((item) => ({
      id: `hn-${item.id}`,
      title: item.title ?? "",
      url: item.url ?? `https://news.ycombinator.com/item?id=${item.id}`,
      summary: item.text
        ? item.text.replace(/<[^>]+>/g, "").slice(0, 220)
        : null,
      summarySource: item.text ? ("native" as const) : ("none" as const),
      source: "Hacker News" as const,
      meta: item.score ? `${item.score} points` : undefined,
      publishedAt: new Date(item.time * 1000).toISOString(),
    }));
  } catch {
    return [];
  }
}

async function fetchDevto(): Promise<Article[]> {
  try {
    const data = await fetch(
      "https://dev.to/api/articles?top=1&per_page=5",
    ).then((r) => r.json());

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.map((a: any) => ({
      id: `devto-${a.id}`,
      title: a.title,
      url: a.url,
      summary: a.description ?? null,
      summarySource: a.description ? ("native" as const) : ("none" as const),
      source: "Dev.to" as const,
      tag: a.tag_list?.[0],
      meta: `${a.reading_time_minutes} min read`,
      publishedAt: a.published_at,
    }));
  } catch {
    return [];
  }
}

async function fetchReddit(): Promise<Article[]> {
  try {
    const json = await fetch(
      "https://www.reddit.com/r/programming/hot.json?limit=5",
      { headers: { "User-Agent": "portfolio-tech-feed/1.0" } },
    ).then((r) => r.json());

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return json.data.children.map((c: any) => {
      const p = c.data;
      return {
        id: `reddit-${p.id}`,
        title: p.title,
        url: p.url.includes("reddit.com")
          ? `https://reddit.com${p.permalink}`
          : p.url,
        summary: p.selftext ? p.selftext.slice(0, 220) : null,
        summarySource: p.selftext ? ("native" as const) : ("none" as const),
        source: "Reddit" as const,
        meta: `${p.score} points`,
        publishedAt: new Date(p.created_utc * 1000).toISOString(),
      };
    });
  } catch {
    return [];
  }
}

async function fetchTLDR(): Promise<Article[]> {
  try {
    const rssUrl = encodeURIComponent("https://tldr.tech/rss");
    const data = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}&count=3`,
    ).then((r) => r.json());

    if (data.status !== "ok") return [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.items.slice(0, 3).map((item: any) => ({
      id: `tldr-${item.guid ?? item.link}`,
      title: item.title,
      url: item.link,
      summary: item.description
        ? item.description.replace(/<[^>]+>/g, "").slice(0, 220)
        : null,
      summarySource: item.description
        ? ("native" as const)
        : ("none" as const),
      source: "TLDR" as const,
      publishedAt: item.pubDate
        ? new Date(item.pubDate).toISOString()
        : new Date().toISOString(),
    }));
  } catch {
    return [];
  }
}

async function fetchGitHubTrending(): Promise<Article[]> {
  try {
    // Repos created in the last 7 days, sorted by stars — closest public
    // approximation to GitHub Trending without scraping.
    const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    const data = await fetch(
      `https://api.github.com/search/repositories?q=created:>${since}&sort=stars&order=desc&per_page=5`,
      { headers: { Accept: "application/vnd.github.v3+json" } },
    ).then((r) => r.json());

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (data.items ?? []).map((repo: any) => ({
      id: `gh-${repo.id}`,
      title: repo.full_name,
      url: repo.html_url,
      summary: repo.description ?? null,
      summarySource: repo.description ? ("native" as const) : ("none" as const),
      source: "GitHub Trending" as const,
      tag: repo.language ?? undefined,
      meta: `⭐ ${repo.stargazers_count.toLocaleString()} stars`,
      publishedAt: repo.created_at,
    }));
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------

function dedupeByUrl(articles: Article[]): Article[] {
  const seen = new Set<string>();
  return articles.filter((a) => {
    if (seen.has(a.url)) return false;
    seen.add(a.url);
    return true;
  });
}

export async function fetchNewsClient(): Promise<Article[]> {
  const results = await Promise.allSettled([
    fetchHN(),
    fetchDevto(),
    fetchReddit(),
    fetchTLDR(),
    fetchGitHubTrending(),
  ]);

  const articles = results.flatMap((r) =>
    r.status === "fulfilled" ? r.value : [],
  );

  return dedupeByUrl(
    articles.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    ),
  );
}
