const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Note", noteSchema);
