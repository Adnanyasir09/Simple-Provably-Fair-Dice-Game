import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

app.post("/roll-dice", (req, res) => {
  const { bet, clientSeed } = req.body;
  const roll = Math.floor(Math.random() * 100) + 1;
  const win = roll > 49.5;
  const payout = win ? bet * 2 : 0;
  res.json({ roll, win, payout, balance: 1000 + (win ? payout : -bet) });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
