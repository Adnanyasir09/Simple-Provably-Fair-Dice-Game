import React, { useState, useEffect } from "react";
import { FaDice, FaSun, FaMoon } from "react-icons/fa";

const Game = () => {
  const [bet, setBet] = useState(0);
  const [balance, setBalance] = useState(1000);
  const [roll, setRoll] = useState(null);
  const [result, setResult] = useState("");
  const [multiplier, setMultiplier] = useState(2.0);
  const [winChance, setWinChance] = useState(3);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "#1a202c"; // Full dark mode
      document.body.style.color = "white";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "#ffffff"; // Full light mode
      document.body.style.color = "black";
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const rollDice = () => {
    if (bet <= 0 || bet > balance) {
      setResult("⚠ Invalid Bet!");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const randomRoll = Math.floor(Math.random() * 6) + 1;
      setRoll(randomRoll);

      if (randomRoll > winChance) {
        const winnings = bet * (multiplier - 1);
        setResult(`🎉 You Win! +₹${winnings.toFixed(2)}`);
        setBalance(balance + winnings);
      } else {
        setResult("❌ You Lose!");
        setBalance(balance - bet);
      }

      setLoading(false);
    }, 1200);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center p-6 transition-all duration-300">

      {/* 🌗 Theme Toggle Button - Fixed White Background */}
      <button
        className={`absolute top-5 right-5 p-3 rounded-full shadow-md transition-all duration-300 
          ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black border border-gray-300"}`}
        onClick={toggleTheme}
      >
        {theme === "dark" ? (
          <FaSun size={24} className="text-yellow-400" />
        ) : (
          <FaSun size={24} className="text-black" />
        )}
      </button>

      <div className={`p-6 rounded-lg shadow-lg w-full max-w-3xl text-center space-y-5 transition-all duration-300 
        ${theme === "dark" ? "bg-gray-800" : "bg-white border border-gray-300"}`}>

        {/* 💰 Balance & 🎲 Last Roll */}
        <div className="flex justify-between items-center text-lg font-semibold">
          <span className="text-green-500">💰 Current Balance: ₹{balance.toFixed(2)}</span>
          <span className="text-gray-500">🎲 Last Roll: {roll !== null ? roll : "--"}</span>
        </div>

        {/* 🎯 Bet Amount */}
        <div>
          <label className="text-gray-500 block text-left">Bet Amount</label>
          <input
            type="number"
            value={bet}
            onChange={(e) => setBet(parseFloat(e.target.value))}
            className={`w-full p-2 rounded-md text-center transition-all duration-300 
              ${theme === "dark" ? "bg-gray-700 text-white" : "bg-white border border-gray-400"}`}
          />
        </div>

        {/* 📈 Profit Calculation */}
        <div>
          <label className="text-gray-500 block text-left">Profit on Win</label>
          <input
            type="number"
            value={(bet * (multiplier - 1)).toFixed(2)}
            disabled
            className={`w-full p-2 rounded-md text-center transition-all duration-300 
              ${theme === "dark" ? "bg-gray-700 text-white" : "bg-white border border-gray-400"}`}
          />
        </div>

        {/* ⚙️ Multiplier & Win Chance */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-500 block">Multiplier</label>
            <input
              type="number"
              value={multiplier}
              onChange={(e) => setMultiplier(parseFloat(e.target.value))}
              className={`w-full p-2 rounded-md text-center transition-all duration-300 
                ${theme === "dark" ? "bg-gray-700 text-white" : "bg-white border border-gray-400"}`}
            />
          </div>
          <div>
            <label className="text-gray-500 block">Win Chance (Roll Over)</label>
            <input
              type="number"
              value={winChance}
              onChange={(e) => setWinChance(parseFloat(e.target.value))}
              className={`w-full p-2 rounded-md text-center transition-all duration-300 
                ${theme === "dark" ? "bg-gray-700 text-white" : "bg-white border border-gray-400"}`}
            />
          </div>
        </div>

        {/* 🎰 Bet Button */}
        <button
          className="w-full p-3 rounded-md font-bold transition duration-300 text-black bg-green-500 hover:bg-green-400"
          onClick={rollDice}
          disabled={loading}
        >
          {loading ? "Rolling..." : "Place Bet"}
        </button>

        {/* 🎲 Dice Animation */}
        <div className="flex justify-center items-center mt-2 space-x-4">
          <div className={`p-4 rounded-lg flex items-center transition-all duration-300 
            ${theme === "dark" ? "bg-gray-700" : "bg-white border border-gray-400"}`}>
            <FaDice size={40} className={`transition-all duration-300 ${loading ? "animate-spin" : ""}`} />
            <span className="ml-2 text-2xl font-bold">{roll !== null ? roll : "?"}</span>
          </div>
        </div>

        {/* 🏆 Result Message */}
        <h3 className="text-xl font-bold">{result}</h3>
      </div>
    </div>
  );
};

export default Game;
