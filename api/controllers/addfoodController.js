const Meal = require('../models/meal.js');
const Foodtype = require('../models/foodtype.js');
const User = require('../models/user.js');
const mongoose = require('mongoose');
const logger = require('tracer').console();

exports.postAddfood = (req, res) => {
  User.findById(req.session.passport.user, (err, user) => {
    if (err) {
      logger.log(err);
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
        if (error) logger.log(error);
      });
      food.save((error) => {
        if (err) {
          logger.log(error);
          res.send(err);
        } else {
          // res.render('addfood', { isAuthenticated: true, title: 'Tracker-Add Food' });
          res.json({ message: 'New food added', food });
        }
      });
    }
  });
};

exports.deleteFood = (req, res) => {
  Foodtype.findByIdAndRemove(req.body._id, (err1, food) => {
    if (err1) logger.log(err1);
    User.findById(req.session.passport.user, (err2, user) => {
      if (err2) logger.log(err2);
      const filteredFoodTypes = user.foodtypes.filter(foodtype => foodtype._id !== req.body._id);
      user.foodtypes = filteredFoodTypes;
      user.save((err3) => {
        if (err3) logger.log(err3);
        res.json({ message: `meal id# ${food._id} deleted`, foodId: food._id });
      });
    });
  });
};
