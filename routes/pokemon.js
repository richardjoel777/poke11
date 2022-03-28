const express = require("express");

const pokemonController = require("../controllers/pokemon");

const router = express.Router();

router.get("/join", pokemonController.getTournament);
router.post("/play", pokemonController.postTournament);

module.exports = router;
