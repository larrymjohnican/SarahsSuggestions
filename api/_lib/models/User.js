const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  verifyToken: { type: String, default: null },
  verifyTokenExpires: { type: Date, default: null },
  resetToken: { type: String, default: null },
  resetTokenExpires: { type: Date, default: null },
});

module.exports = mongoose.model("User", userSchema);
