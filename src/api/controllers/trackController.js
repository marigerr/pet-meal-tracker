const Meal = require('../models/meal.js');
const User = require('../models/user.js');

exports.getTrack = (req, res) => {
  User.findOne({ _id: req.session.passport.user })
    .populate('foodtypes')
    .exec((err, user) => {
      if (err) {
        console.log(err);
      } else {
        res.render('track', { isAuthenticated: true, user, title: 'Pet Meal Tracker' });
      }
    });
};

exports.postTrack = (req, res) => {
  User.findOne({ _id: req.session.passport.user })
    .populate('foodtypes')
    .exec((err, user) => {
      if (err) {
        console.log(err);
      } else {
        const meal = new Meal({
          name: req.body.name,
          packageportion: req.body.amount,
          openednewpackage: req.body.openednewpackage,
          oauthID: user.oauthID,
          timestamp: new Date(),
        });
        meal.save((error) => {
          if (err) {
            console.log(error);
          } else {
            res.render('track', { isAuthenticated: true, user, title: 'Pet Meal Tracker' });
          }
        });
      }
    });
};
