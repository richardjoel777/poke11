const mongoose = require("mongoose");
const uuid = require("uuid");
const random = require("random-name");

const Tournament = require("../models/tournament");
const Trainer = require("../models/trainer");
const User = require("../models/user");

const rand = require("../util/random");

exports.getTournament = async (req, res) => {
  const { email } = req;
  console.log(email);
  var user = await User.findOne({ email });
  console.log(user);

  const trainers = await Trainer.aggregate([{ $sample: { size: 5 } }]);

  //   console.log(trainers);

  var leaderBoard = [];
  leaderBoard.push({ _id: user._id.toString(), name: user.name, points: 0 });
  for (var i = 0; i < 2; i++) {
    var randId = uuid.v4();
    var randName = random.first();
    leaderBoard.push({ _id: randId, name: randName, points: 0 });
  }

  var tournament = await Tournament.create({
    trainers,
    leaderBoard,
  });

  console.log(tournament);

  res.setHeader("content-type", "application/json");
  res.send(JSON.stringify({ tournament }));
};

exports.postTournament = async (req, res) => {
  const { email } = req;
  var user = await User.findOne({ email });

  const { userTrainers, id } = req.body;

  if (!mongoose.isValidObjectId(id)) {
    res.status(404).json({ message: "Invalid Tournament Id" });
  }

  var tournament = await Tournament.findOne({
    _id: mongoose.Types.ObjectId(id),
  });

  if (tournament === null || tournament.isFinished) {
    res.status(402).json({ message: "Invalid tournament Id" });
  } else {
    const trainers = tournament.trainers;
    for (var i = 0; i < trainers.length; i++) {
      for (var j = i + 1; j < trainers.length; j++) {
        if (rand.randomBool()) {
          var alive = rand.getRandomInRange(1, 3);
          trainers[i].points += 5 + alive;
          trainers[j].points += 3 - alive - 1;
        } else {
          var alive = rand.getRandomInRange(1, 3);
          trainers[j].points += 5 + alive;
          trainers[i].points += 3 - alive - 1;
        }
      }
    }

    tournament.trainers = trainers;

    const leaderBoard = tournament.leaderBoard;

    //   const index = leaderBoard.findIndex((obj) => obj.id === user._id.toString());

    console.log(userTrainers);

    const teams = [];
    teams.push(userTrainers);

    for (var i = 0; i < 2; i++) {
      teams.push(
        rand.getRandomElements(trainers, 3).map((p) => p._id.toString())
      );
    }

    for (var trainer of trainers) {
      for (var i = 0; i < 3; i++) {
        if (teams[i].includes(trainer._id.toString()))
          leaderBoard[i].points += trainer.points;
      }
    }

    console.log(trainers);

    console.log(leaderBoard);

    tournament.leaderBoard = leaderBoard;
    tournament.isFinished = true;
    tournament.teams = teams;

    await tournament.save();
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(tournament));
  }
};
