var mongoose = require("mongoose");
var connectDB = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@vidly.l1jsu.mongodb.net/pokedex?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
    }
  );
  console.log("Connected to DB");
};

module.exports = connectDB;
