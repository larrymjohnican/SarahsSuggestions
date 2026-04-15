module.exports = async (req, res) => {
  const userId = process.env.GOODREADS_USER_ID;
  if (!userId) return res.json({ error: "GOODREADS_USER_ID not set" });

  const feedUrl = `https://www.goodreads.com/review/list_rss/${userId}?shelf=read&sort=date_read&order=d`;
  try {
    const response = await fetch(feedUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" },
      signal: AbortSignal.timeout(10000),
      redirect: "follow",
    });
    const body = await response.text();
    res.json({
      status: response.status,
      contentType: response.headers.get("content-type"),
      redirected: response.redirected,
      finalUrl: response.url,
      bodyPreview: body.slice(0, 2000),
    });
  } catch (err) {
    res.json({ error: err.message, stack: err.stack });
  }
};
