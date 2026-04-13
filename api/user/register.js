const { connectDB } = require("../_lib/db");
const User = require("../_lib/models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { Resend } = require("resend");

const FRONTEND_URL = process.env.FRONTEND_URL || "https://sarahssuggestions.com";

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  try {
    await connectDB();

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ detail: "email and password are required." });
    }
    if (email.length > 254 || password.length > 128) {
      return res.status(400).json({ detail: "Input exceeds maximum length." });
    }
    if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      return res.status(400).json({ detail: "Password must be at least 8 characters and include a letter and a number." });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const exists = await User.findOne({ email: normalizedEmail });
    if (exists) {
      return res.status(400).json({ email: ["A user with that email already exists."] });
    }

    const hashed = await bcrypt.hash(password, 12);
    const verifyToken = crypto.randomBytes(32).toString("hex");
    const verifyTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await User.create({ email: normalizedEmail, password: hashed, verified: false, verifyToken, verifyTokenExpires });

    const verifyUrl = `${FRONTEND_URL}/verify?token=${verifyToken}`;
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Sarah's Suggestions <noreply@sarahssuggestions.com>",
      to: normalizedEmail,
      subject: "Verify your email – Sarah's Suggestions",
      html: `
        <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; padding: 32px; color: #1a1a2e;">
          <h1 style="color: #c9a84c; font-size: 24px; margin-bottom: 8px;">Sarah's Suggestions 🌙</h1>
          <p style="font-size: 16px; line-height: 1.6;">Thanks for signing up! Click below to verify your email and get started.</p>
          <a href="${verifyUrl}" style="display:inline-block; margin: 24px 0; padding: 12px 28px; background: #c9a84c; color: #1a1a2e; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 15px;">
            Verify my email
          </a>
          <p style="font-size: 13px; color: #666;">If you didn't sign up, you can ignore this email.</p>
          <p style="font-size: 13px; color: #666;">This link expires after 24 hours.</p>
        </div>
      `,
    });

    res.status(201).json({ detail: "Account created. Check your email to verify your account." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ detail: "Something went wrong." });
  }
};
