const express = require("express");

const pokeController = require("../controllers/poke");

const router = express.Router();

router.get("/tournament", pokeController.createTournament);

router.post("/participate", pokeController.participateTournament);

module.exports = router;
