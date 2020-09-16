const express = require('express');
const router = express.Router();
const passport = require("passport");
const User = require("../models/users");
const Projects = require("../models/projects");

router.post(
  "/create",  passport.authenticate('jwt', { session: false }),
  function (req, res) {
    User.findOne({ username: req.user.username }, (err, user) => {
      const id = user._id;
      let project = new Projects({ name: req.body.name });
      project.description = req.body.description;
      project.creator = id;
      project.save((err) => {
        if (!err) {
          res.send("ok");
        } else {
          console.log(err);
        }
      });
    });
  }
);
router.get('/read', passport.authenticate('jwt', { session: false }), (req, res)=>{
  Projects.find({creator: req.user._id}, (err, projects)=>{
    if(err) console.log(err)
    res.json(projects);
  })
})
router.post('/delete', passport.authenticate('jwt', { session: false }), (req, res)=>{
  Projects.findByIdAndDelete(req.body.id, function(err) {
    if (err) {console.log(err)}
  });
})
router.post('/edit', passport.authenticate('jwt', { session: false }), (req, res)=>{
  Projects.findByIdAndUpdate(req.body.id, {name: req.body.name, description: req.body.description}, function(err) {
    if (err) {console.log(err)}
  });
})
//запрос на регистрацию
router.post("/toggle");
module.exports = router;
