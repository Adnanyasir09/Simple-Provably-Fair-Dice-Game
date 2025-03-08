import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

// ✅ Allow only your frontend (Replace with actual frontend URL)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*", // Allow all if FRONTEND_URL not set
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ Check if MONGO_URI exists
if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing! Check environment variables.");
  process.exit(1);
}

// ✅ Improved MongoDB Connection with Error Handling
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit process if MongoDB fails
  });

// ✅ Root Route for Testing
app.get("/", (req, res) => {
  res.send("✅ Server is running! 🚀");
});

// 🎲 Dice Roll Endpoint
app.post("/roll-dice", (req, res) => {
  const { bet } = req.body;

  if (!bet || bet <= 0) {
    return res.status(400).json({ error: "Invalid bet amount" });
  }

  const roll = Math.floor(Math.random() * 100) + 1;
  const win = roll > 49.5;
  const payout = win ? bet * 2 : 0;

  res.json({ roll, win, payout, balance: 1000 + (win ? payout : -bet) });
});

// ✅ Serve Frontend Production Build
if (process.env.NODE_ENV === "production") {
  // Serve static files from the frontend build folder
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  // Fallback route for Single Page Application (SPA) handling
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}

// ✅ Start Server
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
