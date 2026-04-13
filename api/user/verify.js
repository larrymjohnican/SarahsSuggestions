const { connectDB } = require("../_lib/db");
const User = require("../_lib/models/User");

module.exports = async (req, res) => {
  if (req.method !== "GET") return res.status(405).end();

  try {
    await connectDB();

    const { token } = req.query;
    if (!token) return res.status(400).json({ detail: "Token is required." });

    const user = await User.findOne({ verifyToken: token });
    if (!user || !user.verifyTokenExpires || user.verifyTokenExpires < new Date()) {
      return res.status(400).json({ detail: "Invalid or expired verification link." });
    }

    user.verified = true;
    user.verifyToken = null;
    user.verifyTokenExpires = null;
    await user.save();

    res.json({ detail: "Email verified successfully. You can now log in." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ detail: "Something went wrong." });
  }
};
