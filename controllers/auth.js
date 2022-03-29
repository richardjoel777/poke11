const User = require("../models/user");
const jwt = require("jsonwebtoken");

const secret = "mysecretsshhh";

exports.postRegister = (req, res) => {
  console.log(req);
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  console.log(name, email, password);
  user.save(function (err) {
    if (err) {
      console.log("Error occured");
      res
        .status(500)
        .json({ message: "Error registering new user please try again." });
    } else {
      console.log("Works");
      res.status(200).json({ message: "Welcome to the club!" });
    }
  });
};

exports.postLogin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, function (err, user) {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal error please try again",
      });
    } else if (!user) {
      res.status(401).json({
        error: "Incorrect email or password",
      });
    } else {
      user.isCorrectPassword(password, function (err, same) {
        if (err) {
          res.status(500).json({
            error: "Internal error please try again",
          });
        } else if (!same) {
          res.status(401).json({
            error: "Incorrect email or password",
          });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: "30h",
          });
          // console.log('')
          res
            .cookie("token", token, { httpOnly: false })
            .status(200)
            .json({ token: token });
        }
      });
    }
  });
};
