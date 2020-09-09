const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

mongoose.set("useCreateIndex", true);
//соединяемся с бд
mongoose
  .connect("mongodb://localhost/MyDatabase", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connected!"))
  .catch((err) => {
    console.log(`DB Connection Error: ${err.message}`);
  });

/*const ProjectsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  completed: {
    type: Boolean,
    default: false,
  }
})
*/
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
  //task: [ProjectsSchema]
});
userSchema.plugin(passportLocalMongoose);

// User Schema model
const User = new mongoose.model('User', userSchema, 'User');
/*const newUser = new User({ username: "test" });
User.register(newUser, "test", (err, user) => console.log('err ', err));*/

module.exports = User;
