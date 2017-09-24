const User = require('../models/user.js');
const Meal = require('../models/meal.js');
const logger = require('tracer').console();

exports.getStats = (req, res) => {
  User.findById(req.session.passport.user, (err, user) => {
    if (err) {
      logger.log(err);
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
}
;
