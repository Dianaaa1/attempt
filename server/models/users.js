const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    require: true,
    index: {
      unique: true,
    },
  },
  password: String,
});
userSchema.plugin(passportLocalMongoose);

// User Schema model
const User = new mongoose.model('User', userSchema, 'User');

module.exports = User;
