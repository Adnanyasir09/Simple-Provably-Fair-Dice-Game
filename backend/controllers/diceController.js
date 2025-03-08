const Bet = require("../models/Bet");

const rollDice = async (req, res) => {
  const { username, bet } = req.body;

  if (!bet || bet <= 0) {
    return res.status(400).json({ error: "Invalid bet amount!" });
  }

  const roll = Math.floor(Math.random() * 100) + 1; // Random number 1-100
  const win = roll > 50; // Example win condition
  const payout = win ? bet * 2 : 0;

  // Store bet in MongoDB
  const newBet = new Bet({
    username,
    betAmount: bet,
    rollResult: roll,
    win,
    payout,
  });

  await newBet.save();

  res.json({ roll, win, payout, message: win ? "You win!" : "You lose!" });
};

module.exports = { rollDice };
