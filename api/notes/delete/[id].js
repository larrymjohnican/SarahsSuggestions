const { connectDB } = require("../../_lib/db");
const Note = require("../../_lib/models/Note");
const requireAuth = require("../../_lib/requireAuth");

module.exports = async (req, res) => {
  if (req.method !== "DELETE") return res.status(405).end();

  try {
    await connectDB();

    const user = requireAuth(req, res);
    if (!user) return;

    const note = await Note.findOneAndDelete({ _id: req.query.id, author: user.id });
    if (!note) {
      return res.status(404).json({ detail: "Not found." });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ detail: "Something went wrong." });
  }
};
