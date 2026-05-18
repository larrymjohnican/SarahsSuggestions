const { connectDB } = require("../_lib/db");
const User = require("../_lib/models/User");
const crypto = require("crypto");
const { Resend } = require("resend");
const rateLimit = require("../_lib/rateLimit");
const setSecurityHeaders = require("../_lib/securityHeaders");

const FRONTEND_URL = process.env.FRONTEND_URL;
const limiter = rateLimit(10, 60 * 1000);

module.exports = async (req, res) => {
  setSecurityHeaders(res);
  if (req.method !== "POST") return res.status(405).end();
  if (!limiter(req, res)) return;

  try {
    if (!FRONTEND_URL) return res.status(500).json({ detail: "Server misconfiguration." });
    await connectDB();

    const { email } = req.body;
    if (!email) return res.status(400).json({ detail: "Email is required." });

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    // Always return success — never reveal whether the email exists
    if (user) {
      const resetToken = crypto.randomBytes(32).toString("hex");
      user.resetToken = resetToken;
      user.resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
      await user.save();

      const resetUrl = `${FRONTEND_URL}/reset-password?token=${resetToken}`;
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Sarah's Suggestions <noreply@sarahssuggestions.com>",
        to: normalizedEmail,
        subject: "Reset your password – Sarah's Suggestions",
        html: `
          <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; padding: 32px; color: #1a1a2e;">
            <h1 style="color: #c9a84c; font-size: 24px; margin-bottom: 8px;">Sarah's Suggestions 🌙</h1>
            <p style="font-size: 16px; line-height: 1.6;">We received a request to reset your password. Click below to choose a new one.</p>
            <a href="${resetUrl}" style="display:inline-block; margin: 24px 0; padding: 12px 28px; background: #c9a84c; color: #1a1a2e; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 15px;">
              Reset my password
            </a>
            <p style="font-size: 13px; color: #666;">If you didn't request this, you can ignore this email — your password won't change.</p>
            <p style="font-size: 13px; color: #666;">This link expires in 1 hour.</p>
          </div>
        `,
      });
    }

    res.json({ detail: "If that email is registered, you'll receive a reset link shortly." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ detail: "Something went wrong." });
  }
};
