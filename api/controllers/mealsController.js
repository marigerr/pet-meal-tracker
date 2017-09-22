const User = require('../models/user.js');
const Meal = require('../models/meal.js');

exports.getMeals = (req, res) => {
  User.findById(req.session.passport.user, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      Meal.find({
        oauthID: user.oauthID,
      })
        .sort({ timestamp: 'asc' })
        .exec((error, meals) => {
          // res.render('stats', { isAuthenticated: true, title: 'Tracker-Stats', meals });
          res.json(meals);
        });
    }
  });
};

exports.deleteMeal = (req, res) => {
  console.log(req.body);

  Meal.findByIdAndRemove(req.body._id, (err, meal) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ message: `meal id# ${meal._id} deleted`, mealId: meal._id });
    }
  });
};
