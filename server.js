require('dotenv').config()
const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser');
const session = require('express-session')
const path = require('path');
const User = require('./models/user.js');
const Meal = require('./models/meal.js');
const Foodtype = require('./models/foodtype.js');
const accountController = require('./controllers/accountController.js');
const trackController = require('./controllers/trackController.js');
const statsController = require('./controllers/statsController.js');
const addfoodController = require('./controllers/addfoodController.js');
const mongoose = require('mongoose');
const passport = require('passport');
const auth = require('./auth.js');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {
  useMongoClient: true,
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use('/assets', express.static(__dirname + '/assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true, cookie: { maxAge: 2592000000 } }));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user._id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (!err) done(null, user);
    else done(err, null);
  });
});

app.get('/', (req, res) => {
  if (req.session.passport && req.session.passport.user) {
    User.findById(req.session.passport.user, function (err, user) {
      if (err) {
        console.log(err);
      } else {
        res.render('index', { isAuthenticated: true, title: "Pet Meal Tracker" })
      }
    });
  } else {
    res.render('index', { isAuthenticated: false, title: "Pet Meal Tracker" })
  }
});

app.get('/auth/github',
  passport.authenticate('github'),
  (req, res) => { });
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/track');
  });
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.route('/account')
  .get(ensureAuthenticated, accountController.getAccount);
router.route('/track')
  .get(ensureAuthenticated, trackController.getTrack)
  .post(ensureAuthenticated, trackController.postTrack);
router.route('/stats')
  .get(ensureAuthenticated, statsController.getStats);
router.route('/addfood')
  .get(ensureAuthenticated, addfoodController.getAddfood)
  .post(ensureAuthenticated, addfoodController.postAddfood);


app.use('/', router);

auth(app, db);

app.listen(process.env.PORT, () => {
  console.log("Listening on port " + process.env.PORT);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

module.exports = app;
