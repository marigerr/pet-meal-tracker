require('dotenv').config();
const logger = require('tracer').console();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const accountController = require('./controllers/accountController.js');
const trackController = require('./controllers/trackController.js');
const statsController = require('./controllers/statsController.js');
const mealsController = require('./controllers/mealsController.js');
const addfoodController = require('./controllers/addfoodController.js');
const mongoose = require('mongoose');
const passport = require('passport');
const auth = require('./auth.js');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {
  useMongoClient: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const router = express.Router();
const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '../dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true, cookie: { maxAge: 2592000000 } }));

app.use(passport.initialize());
app.use(passport.session());

// app.get('/', (req, res) => {
//   if (req.session.passport && req.session.passport.user) {
//     User.findById(req.session.passport.user, (err, user) => {
//       if (err) {
//         logger.log(err);
//       } else {
//         res.sendFile('..client/index.html', { root: __dirname }, { isAuthenticated: true, title: 'Pet Meal Tracker' });
//       }
//     });
//   } else {
//     res.sendFile('index.html', { isAuthenticated: false, title: 'Pet Meal Tracker' });
//   }
// });

app.get('/api/auth', (req, res) => {
  res.render('login');
});
// why is the message not showing??
app.get('/api/auth/github',
  passport.authenticate('github'),
  (req, res) => {
    // res.json({ message: 'logging in via github' });
  });
app.get('/api/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.render('login', { isAuthenticated: true });
    // res.sendFile(path.resolve(__dirname, '../dist/', 'index.html'));
    // res.json({ message: 'logged in via github' });
  });
app.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


router.route('/api/account')
  .get(ensureAuthenticated, accountController.getAccount);
router.route('/api/track')
  .get(ensureAuthenticated, trackController.getTrack)
  .post(ensureAuthenticated, trackController.postTrack);
router.route('/api/meals')
  .get(ensureAuthenticated, mealsController.getMeals)
  .delete(ensureAuthenticated, mealsController.deleteMeal);
router.route('/api/stats')
  .get(ensureAuthenticated, statsController.getStats);
router.route('/api/addfood')
  .post(ensureAuthenticated, addfoodController.postAddfood)
  .delete(ensureAuthenticated, addfoodController.deleteFood);
router.route('*')
  .get((req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/', 'index.html'));
  });

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../dist/', 'index.html'));
// });

app.use('/', router);

auth(app, db);

app.listen(process.env.PORT, () => {
  logger.log(`Listening on port ${process.env.PORT}`);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.json({ message: 'unauthorized' });
}

module.exports = app;
