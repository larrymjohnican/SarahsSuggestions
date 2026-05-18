const { connectDB } = require("../_lib/db");
const Note = require("../_lib/models/Note");
const requireAuth = require("../_lib/requireAuth");

module.exports = async (req, res) => {
  try {
    await connectDB();

    const user = requireAuth(req, res);
    if (!user) return;

    if (req.method === "GET") {
      const notes = await Note.find({ author: user.id }).sort({ created_at: -1 });
      return res.json(notes);
    }

    if (req.method === "POST") {
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({ detail: "title and content are required." });
      }
      const clean = (s) => String(s).replace(/<[^>]*>/g, "").trim();
      const note = await Note.create({ title: clean(title), content: clean(content), author: user.id });
      return res.status(201).json(note);
    }

    res.status(405).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ detail: "Something went wrong." });
  }
};
