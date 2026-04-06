import axios from "axios";
import * as cheerio from "cheerio";

const TIMEOUT_MS = 3000;
const MAX_CHARS = 220;

const USER_AGENT = "Mozilla/5.0";

/**
 * Fetch an external article URL and extract a short summary using meta tags
 * or the first meaningful paragraph. Returns null on timeout, error, or
 * when no usable text is found (paywalls, SPAs, etc.).
 */
export async function extractSummary(url: string): Promise<string | null> {
  try {
    const res = await axios.get<string>(url, {
      headers: { "User-Agent": USER_AGENT },
      timeout: TIMEOUT_MS,
      maxRedirects: 3,
      responseType: "text",
      // Accept only HTML to avoid downloading binary files
      validateStatus: (s) => s >= 200 && s < 400,
    });

    const $ = cheerio.load(res.data);

    // Try selectors in priority order — take first one that yields ≥ 30 chars
    const candidates = [
      $('meta[name="description"]').attr("content"),
      $('meta[property="og:description"]').attr("content"),
      $("article p").first().text(),
      $("main p").first().text(),
    ];

    const text = candidates
      .map((c) => c?.trim())
      .find((c) => c && c.length >= 30);

    if (!text) return null;
    return text.length > MAX_CHARS ? text.slice(0, MAX_CHARS) + "..." : text;
  } catch {
    // Covers: timeout (ECONNABORTED), network error, 4xx/5xx, parse error
    return null;
  }
}

/** Pause execution for `ms` milliseconds. */
export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
