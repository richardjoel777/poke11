const jwt = require("jsonwebtoken");
const secret = "mysecretsshhh";
const withAuth = function (req, res, next) {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (req.url === "/play") {
    token = req.cookies.token;
  }
  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
  } else {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        res.status(401).json({ message: "Unauthorized: Invalid token" });
      } else {
        req.email = decoded.email;
        console.log(req.email);
        next();
      }
    });
  }
};
module.exports = withAuth;
