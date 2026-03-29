require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const notesRoutes = require("./routes/notes");

const app = express();

// Security headers
app.use(helmet());

// CORS — only allow the real frontend
const allowedOrigins = [
  "https://sarahssuggestions.com",
  "https://www.sarahssuggestions.com",
  process.env.NODE_ENV !== "production" && "http://localhost:5173",
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl in dev)
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

app.use(express.json({ limit: "10kb" })); // Limit body size

// Rate limiting — auth routes (stricter)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { detail: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

// General API rate limit
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { detail: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api", generalLimiter);
app.use("/api/token", authLimiter);
app.use("/api/user/register", authLimiter);

// Cached MongoDB connection for serverless
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
};

// Connect before every request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("MongoDB connection error:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Routes
app.use("/api", authRoutes);
app.use("/api/notes", notesRoutes);

// Global error handler — never leak stack traces to the client
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ detail: "Something went wrong." });
});

// For local dev
if (require.main === module) {
  const PORT = process.env.PORT || 8000;
  connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });
}

module.exports = app;
