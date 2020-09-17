const express = require('express');
const router = express.Router();
const passport=require('passport');
const User=require('../models/users');

const jwt = require('jsonwebtoken')
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtsecret = "mysecretkey";
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtsecret
};
//запрос логина
router.post('/login',
  passport.authenticate('local', { session: false }),
  function (req, res) {
    console.log('You are logged in!');
    User.findOne({ username: req.body.username }, (err, user) => user.username);
    var payload = { username: req.body.username };
    var token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json({ message: "ok", token: token });
  });
//запрос на регистрацию
router.post('/register', (req, res) => {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.error(err);
      res.send({message: 'Данное имя пользователя занято, выберите другое', status: 'not done'})
    } else {
      passport.authenticate('local')(req, res, () => {
        console.log('user authenticated');
        res.send({message: 'You are registed, try to login', status: 'done'})
      })
    }
  })
})
module.exports = router;