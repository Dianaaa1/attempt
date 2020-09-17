const express = require("express");
const bodyParser = require("body-parser");
const passport = require('passport')
const app = express();
const cors = require('cors');
const mongoose=require('mongoose');

app.use(cors())
app.options('*', cors())
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

//настраиваем работу с бд
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

require('./auth');
//объявляем роутеры
const authRoutes=require('./routes/auth');
const projectsRoutes=require('./routes/projects');
//подключаем роутеры
app.use('/user',authRoutes);
app.use('/projects',projectsRoutes);
//запрос редиректа на профильную страницу при входе при валидном токене
app.get('/home', passport.authenticate('jwt', { session: false }),
  function (req, res) {
    res.send('ok');
  }
);
app.post('/todo', () => { })
app.listen(4000, () => {
  console.log("Started on PORT 4000");
});
