const mongoose = require("mongoose");

const TrainerSchema = new mongoose.Schema({
  name: String,
  pokemons: [String],
});

module.exports = mongoose.model("Trainer", TrainerSchema);
