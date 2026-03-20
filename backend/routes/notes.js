const express = require("express");
const Note = require("../models/Note");
const requireAuth = require("../middleware/auth");

const router = express.Router();

// GET /api/notes/  — list notes for the authenticated user
router.get("/", requireAuth, async (req, res) => {
  const notes = await Note.find({ author: req.user.id }).sort({ created_at: -1 });
  res.json(notes);
});

// POST /api/notes/  — create a note
router.post("/", requireAuth, async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ detail: "title and content are required." });
  }
  const note = await Note.create({ title, content, author: req.user.id });
  res.status(201).json(note);
});

// DELETE /api/notes/delete/:id/  — delete a note owned by the authenticated user
router.delete("/delete/:id/", requireAuth, async (req, res) => {
  const note = await Note.findOneAndDelete({ _id: req.params.id, author: req.user.id });
  if (!note) {
    return res.status(404).json({ detail: "Not found." });
  }
  res.status(204).send();
});

module.exports = router;
