"use client";

import { useState, useEffect } from "react";
import { useReducedMotion, motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, RefreshCw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { fetchNewsClient } from "@/lib/fetchNewsClient";
import {
  ALL_SOURCES,
  SOURCE_TEXT_COLORS,
  type Article,
  type ArticleSource,
  type SourceFilter,
} from "@/types/news";

const SOURCE_TABS: SourceFilter[] = [
  ALL_SOURCES,
  "Hacker News",
  "Dev.to",
  "Reddit",
  "TLDR",
  "GitHub Trending",
];

function formatDate(iso: string): string {
  try {
    return formatDistanceToNow(new Date(iso), { addSuffix: true });
  } catch {
    return "";
  }
}

function Skeleton() {
  return (
    <div className="mt-10 flex flex-col">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="border-b border-border py-6">
          <div className="mb-2 h-3 w-24 animate-pulse rounded bg-muted/50" />
          <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-muted" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-muted/50" />
        </div>
      ))}
    </div>
  );
}

export default function FeedClient() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSource, setActiveSource] = useState<SourceFilter>(ALL_SOURCES);
  const reduced = useReducedMotion();

  useEffect(() => {
    fetchNewsClient()
      .then(setArticles)
      .finally(() => setLoading(false));
  }, []);

  const container = reduced ? {} : staggerContainer;
  const item = reduced ? {} : fadeInUp;

  if (loading) return <Skeleton />;

  const filtered =
    activeSource === ALL_SOURCES
      ? articles
      : articles.filter((a) => a.source === activeSource);

  const countFor = (src: SourceFilter) =>
    src === ALL_SOURCES
      ? articles.length
      : articles.filter((a) => a.source === src).length;

  if (articles.length === 0) {
    return (
      <div className="mt-10 flex flex-col items-center gap-3 rounded-lg border border-border bg-muted/20 px-6 py-14 text-center">
        <RefreshCw size={18} className="text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          All sources are unavailable right now. Check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10">
      {/* Source filter tabs */}
      <div
        className="mb-8 flex flex-wrap gap-1.5"
        role="tablist"
        aria-label="Filter by source"
      >
        {SOURCE_TABS.map((src) => {
          const isActive = activeSource === src;
          return (
            <button
              key={src}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveSource(src)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                isActive
                  ? "bg-white/8 text-foreground"
                  : "text-muted-foreground hover:bg-white/4 hover:text-foreground",
              )}
            >
              {src}
              <span
                className={cn(
                  "tabular-nums",
                  isActive ? "opacity-60" : "opacity-40",
                )}
              >
                {countFor(src)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Article list */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeSource}
          variants={container}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
          className="flex flex-col"
        >
          {filtered.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted-foreground">
              No articles for this source yet.
            </p>
          ) : (
            filtered.map((article) => (
              <motion.div key={article.id} variants={item}>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group -mx-3 flex items-start justify-between gap-6 rounded-sm border-b border-border px-3 py-6 transition-colors hover:bg-white/3"
                >
                  <div className="flex min-w-0 flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "text-xs font-medium",
                          SOURCE_TEXT_COLORS[article.source as ArticleSource],
                        )}
                      >
                        {article.source}
                      </span>
                      {article.tag && (
                        <Badge variant="secondary" className="text-xs">
                          {article.tag}
                        </Badge>
                      )}
                    </div>

                    <span className="line-clamp-2 font-medium text-foreground decoration-border underline-offset-4 group-hover:underline">
                      {article.title}
                    </span>

                    {article.summarySource !== "none" && article.summary && (
                      <div className="flex flex-col gap-0.5">
                        <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
                          {article.summary}
                        </p>
                        {article.summarySource === "extracted" && (
                          <span className="text-xs text-muted-foreground/50">
                            auto-extracted
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      {article.meta && <span>{article.meta}</span>}
                      <span>{formatDate(article.publishedAt)}</span>
                    </div>
                  </div>

                  <ArrowUpRight
                    size={16}
                    className="mt-1 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
                  />
                </a>
              </motion.div>
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
