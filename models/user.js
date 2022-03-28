const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

UserSchema.pre("save", async function (next) {
  // Check if document is new or a new password has been set
  // console.log(this.isNew, this.isModified("password"));
  if (this.isNew || this.isModified("password")) {
    // Saving reference to this because of changing scopes
    const document = this;
    bcrypt.hash(document.password, saltRounds, function (err, hashedPassword) {
      if (err) {
        console.error(err.message);
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

UserSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

module.exports = mongoose.model("User", UserSchema);
