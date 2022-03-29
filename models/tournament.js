const mongoose = require("mongoose");
// const TrainerSchema = require("./trainer");
const random = require("../util/random");

const TournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Tournament : " + random.getRandomInRange(5000, 6000),
  },
  trainers: [
    {
      _id: mongoose.SchemaTypes.ObjectId,
      name: String,
      pokemons: [String],
      points: {
        type: Number,
        default: 0,
      },
    },
  ],
  leaderBoard: [{ _id: String, name: String, points: Number }],
  isFinished: {
    type: Boolean,
    default: false,
  },
  teams: {
    type: [[String]],
    default: [],
  },
});

module.exports = mongoose.model("Tournament", TournamentSchema);
