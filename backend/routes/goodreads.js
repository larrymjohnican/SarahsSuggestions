"use strict";

const express = require("express");
const router = express.Router();
const { XMLParser } = require("fast-xml-parser");

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
let cache = { data: null, timestamp: 0 };

// Extract plain text from a fast-xml-parser field (handles CDATA or plain string)
function text(field) {
  if (field === undefined || field === null) return "";
  if (typeof field === "object" && "__cdata" in field) return String(field.__cdata || "").trim();
  return String(field).trim();
}

function stripHtml(str) {
  if (!str) return "";
  return str.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function shortBlurb(fullText, maxLen = 200) {
  if (!fullText || fullText.length <= maxLen) return fullText || "";
  const cut = fullText.lastIndexOf(" ", maxLen);
  return fullText.slice(0, cut > 0 ? cut : maxLen) + "…";
}

const SYSTEM_SHELVES = new Set(["read", "to-read", "currently-reading"]);

function parseGenre(userShelves) {
  const raw = text(userShelves);
  if (!raw) return "General";
  const first = raw
    .split(",")
    .map((s) => s.trim())
    .find((s) => s && !SYSTEM_SHELVES.has(s));
  if (!first) return "General";
  // Convert "fantasy-romance" → "Fantasy Romance"
  return first.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// GET /api/goodreads/reviews
router.get("/reviews", async (req, res) => {
  const userId = process.env.GOODREADS_USER_ID;
  if (!userId) {
    return res.status(503).json({ error: "Goodreads integration not configured." });
  }

  // Serve cached data if still fresh
  if (cache.data && Date.now() - cache.timestamp < CACHE_TTL_MS) {
    return res.json(cache.data);
  }

  try {
    const feedUrl = `https://www.goodreads.com/review/list_rss/${userId}?shelf=read&sort=date_read&order=d`;

    const response = await fetch(feedUrl, {
      headers: { "User-Agent": "SarahsSuggestions/1.0 (book review site)" },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      throw new Error(`Goodreads returned HTTP ${response.status}`);
    }

    const xml = await response.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      cdataPropName: "__cdata",
      isArray: (name) => name === "item",
      trimValues: true,
    });

    const doc = parser.parse(xml);
    const items = doc?.rss?.channel?.item ?? [];

    const books = items
      .filter((item) => parseInt(item.user_rating, 10) > 0)
      .map((item) => {
        const fullReview = stripHtml(text(item.user_review));
        return {
          id: String(item.book_id || item.link || item.guid),
          title: text(item.title),
          author: text(item.author_name),
          rating: parseInt(item.user_rating, 10),
          coverUrl: text(item.book_large_image_url),
          genre: parseGenre(item.user_shelves),
          fullReview,
          shortBlurb: shortBlurb(fullReview),
        };
      });

    cache = { data: books, timestamp: Date.now() };
    res.json(books);
  } catch (err) {
    console.error("Goodreads fetch error:", err.message);
    res.status(502).json({ error: "Could not fetch reviews from Goodreads." });
  }
});

module.exports = router;
