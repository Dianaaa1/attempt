const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

mongoose.set("useCreateIndex", true);

mongoose
  .connect("mongodb://localhost/MyDatabase", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connected!"))
  .catch((err) => {
    console.log(`DB Connection Error: ${err.message}`);
  });

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

/*const newUser = new User({ username: "test" });
User.register(newUser, "test", (err, user) => console.log('err ', err));*/

module.exports = User;
