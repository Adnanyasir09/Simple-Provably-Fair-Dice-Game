const mongoose = require("mongoose");

const betSchema = new mongoose.Schema({
  username: String,
  betAmount: Number,
  rollResult: Number,
  win: Boolean,
  payout: Number,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Bet", betSchema);
