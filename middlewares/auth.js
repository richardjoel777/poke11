const jwt = require("jsonwebtoken");
const secret = "mysecretsshhh";
const withAuth = function (req, res, next) {
  const token = req.cookies.token;
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
