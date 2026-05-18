const { XMLParser } = require("fast-xml-parser");
const setSecurityHeaders = require("../_lib/securityHeaders");

const CACHE_TTL_MS = 60 * 60 * 1000;
let cache = { data: null, timestamp: 0 };

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
  const first = raw.split(",").map((s) => s.trim()).find((s) => s && !SYSTEM_SHELVES.has(s));
  if (!first) return "General";
  return first.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

module.exports = async (req, res) => {
  setSecurityHeaders(res);
  if (req.method !== "GET") return res.status(405).end();

  const userId = process.env.GOODREADS_USER_ID;
  if (!userId) {
    return res.status(503).json({ error: "Goodreads integration not configured." });
  }

  if (cache.data && Date.now() - cache.timestamp < CACHE_TTL_MS) {
    return res.json(cache.data);
  }

  try {
    const feedUrl = `https://www.goodreads.com/review/list_rss/${userId}?shelf=read&sort=date_read&order=d&per_page=200`;
    const response = await fetch(feedUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" },
      signal: AbortSignal.timeout(10000),
      redirect: "follow",
    });

    if (!response.ok) throw new Error(`Goodreads returned HTTP ${response.status}`);

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
      .map((item) => {
        const fullReview = stripHtml(text(item.user_review));
        const rating = parseInt(item.user_rating, 10) || 0;
        return {
          id: String(item.book_id || item.link || item.guid),
          title: text(item.title),
          author: text(item.author_name),
          rating,
          coverUrl: text(item.book_medium_image_url || item.book_image_url),
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
};
