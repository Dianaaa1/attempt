const express = require("express");
const bodyParser = require("body-parser");
const passport = require('passport')
const app = express();
const cors = require('cors');

app.use(cors())
app.options('*', cors())
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  //res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  next();
});

const jwt = require('jsonwebtoken')
const User = require('./models/users')

const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtsecret = "mysecretkey";
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtsecret
};
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

require('./auth');

//запрос логина
app.post('/login',
  passport.authenticate('local', { session: false }),
  function (req, res) {
    console.log('You are logged in!');
    User.findOne({ username: req.body.username }, (err, user) => user.username);
    var payload = { username: req.body.username };
    var token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json({ message: "ok", token: token });
  });
//запрос на регистрацию
app.post('/register', (req, res) => {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      if (!req.body.username || !req.body.password) {
        return res.send('Введите все данные')
      }
      console.error(err);
      res.send('Данное имя пользователя занято, выберите другое')
    } else {
      passport.authenticate('local')(req, res, () => {
        console.log('user authenticated');
        res.send('You are registed, try to login')
      })
    }
  })
})
app.get('/home', passport.authenticate('jwt', { session: false }),
  function (req, res) {
    res.send('ok');
  }
);
app.post('/todo', () => { })
app.listen(4000, () => {
  console.log("Started on PORT 4000");
});
