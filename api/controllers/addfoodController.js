const Meal = require('../models/meal.js');
const Foodtype = require('../models/foodtype.js');
const User = require('../models/user.js');
const mongoose = require('mongoose');

// exports.getAddfood = (req, res) => {
//   res.render('addfood', { isAuthenticated: true, title: 'Tracker-Add Food' });
// };

exports.postAddfood = (req, res) => {
  User.findById(req.session.passport.user, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      const food = new Foodtype({
        _id: new mongoose.Types.ObjectId(),
        oauthID: user.oauthID,
        name: req.body.name,
        volume: req.body.volume,
        packageDailyEquivalent: req.body.packageDailyEquivalent,
      });
      user.foodtypes.push(food);
      user.save((error) => {
        console.log(error);
      });
      food.save((error) => {
        if (err) {
          console.log(error);
          res.send(err);
        } else {
          // res.render('addfood', { isAuthenticated: true, title: 'Tracker-Add Food' });
          res.json({ message: 'New food added' });
        }
      });
    }
  });
};
