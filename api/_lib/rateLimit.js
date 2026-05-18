const store = new Map();

function rateLimit(max = 10, windowMs = 60 * 1000) {
  return function limit(req, res) {
    const ip =
      (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
      req.socket?.remoteAddress ||
      "unknown";
    const now = Date.now();
    let entry = store.get(ip);

    if (!entry || now > entry.resetAt) {
      entry = { count: 0, resetAt: now + windowMs };
    }

    entry.count++;
    store.set(ip, entry);

    if (store.size > 5000) {
      for (const [key, val] of store) {
        if (now > val.resetAt) store.delete(key);
      }
    }

    if (entry.count > max) {
      res.setHeader("Retry-After", String(Math.ceil((entry.resetAt - now) / 1000)));
      res.status(429).json({ detail: "Too many requests. Please try again later." });
      return false;
    }

    return true;
  };
}

module.exports = rateLimit;
