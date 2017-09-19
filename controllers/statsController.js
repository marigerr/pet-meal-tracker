const User = require('../models/user.js');
const Meal = require('../models/meal.js');

exports.getStats = (req, res) => {
  User.findById(req.session.passport.user, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      Meal.find({
        oauthID: user.oauthID
      })
        .sort({ timestamp: 'asc' })
        .exec((err, meals) => {
          res.render('stats', { isAuthenticated: true, title: "Tracker-Stats", meals: meals });
        })
    }
  });
}