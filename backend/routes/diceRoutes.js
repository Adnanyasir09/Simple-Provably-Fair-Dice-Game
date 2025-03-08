const express = require("express");
const { rollDice } = require("../controllers/diceController");

const router = express.Router();

router.post("/roll", rollDice);

module.exports = router;
