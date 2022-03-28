const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");

exports.createTournament = async (req, res, next) => {
  var today = Date.now();
  var name = "tournament_" + Math.random();
  const db = getDb();
  var trainers = await db.collection("tournaments").find({}).limit(5).toArray();
  var t = await db
    .collection("trainers")
    .insertOne({ name, trainers, winners: [] });
  console.log(t);
  // var id = new mongodb.ObjectId(t.insertId);
  var tournament = await db
    .collection("trainers")
    .find({ _id: t.insertedId })
    .next();
  //   res.setContentType("json");
  res.send(JSON.stringify(tournament));
};

exports.participateTournament = async (req, res, next) => {
  //   var tournamentId = req.body.tournament;
  //   var userTrainers = req.body.trainers;
  console.log(req);
  //   const db = getDb();
  //   var tournament = await db
  //     .collection("trainers")
  //     .find({ _id: new mongodb.ObjectId(tournamentId) })
  //     .next();
  //   var trainers = tournament.trainers;
  //   var results = [];
  //   for (var i = 0; i < trainers.length; i++) {
  //     results.push(0);
  //   }
  for (var i = 0; i < trainers.length; i++) {
    for (var j = i + 1; j < trainers.length; j++) {
      if (randomBool()) {
        var alive = getRandomInt(1, 3);
        results[i] += 5 + alive;
        results[j] += 3 - alive - 1;
      } else {
        var killed = getRandomInt(0, 2);
        results[j] += 5 + alive;
        results[i] += 3 - killed - 1;
      }
    }
  }
  //   console.log(results);
  res.send("hi");
};
