const Meal = require('../models/meal.js');
const Foodtype = require('../models/foodtype.js');
const User = require('../models/user.js');
const mongoose = require('mongoose');

exports.getAddfood = (req, res) => {
  res.render('addfood', { isAuthenticated: true, title: "Tracker-Add Food" }); 
}

exports.postAddfood = (req, res) => {
  User.findById(req.session.passport.user, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      food = new Foodtype({
        _id: new mongoose.Types.ObjectId(),
        oauthID: user.oauthID,
        name: req.body.name,
        volume: req.body.volume,
        packageDailyEquivalent: req.body.packageDailyEquivalent,
      });
      user.foodtypes.push(food);
      user.save((err) => {
        console.log(err)
      })
      food.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          res.render('addfood', { isAuthenticated: true, title: "Tracker-Add Food" });
        }
      });
    }
  });
}  