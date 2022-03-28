const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var cors = require("cors");
var morgan = require("morgan");

const pokeRoutes = require("./routes/poke");
const AuthRoutes = require("./routes/auth");
const pokemonRoutes = require("./routes/pokemon");

const withAuth = require("./middlewares/auth");

const app = express();

const connectDB = require("./util/database");

try {
  connectDB().then((_) => {
    app.listen(5000);
    console.log("Listening on port 5000");
  });
} catch (ex) {
  console.log(ex.message);
}

app.use(cors());
app.use(
  express.json({
    type: ["application/json", "text/plain"],
  })
);

app.use(bodyParser.json());

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/auth", AuthRoutes);

app.use("/", withAuth, pokemonRoutes);
