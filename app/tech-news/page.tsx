import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import FeedClient from "./_components/feed-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech Feed — Anish Chaudhary",
  description:
    "Aggregated tech news from Hacker News, Dev.to, Reddit, TLDR, and GitHub Trending.",
};

export default function TechNewsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-24 md:px-12 lg:px-24">
      <Link
        href="/"
        className="mb-12 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={14} />
        Back
      </Link>

      <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
        Tech Feed
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Top stories from Hacker News, Dev.to, Reddit and more — loaded fresh
        each visit
      </p>

      <FeedClient />
    </main>
  );
}
