var mongoose = require("mongoose");
var connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://richie:liM5KnByybM1sXRJ@vidly.l1jsu.mongodb.net/pokedex?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  );
  console.log("Connected to DB");
};

module.exports = connectDB;
