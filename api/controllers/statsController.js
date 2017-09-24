const User = require('../models/user.js');
const Meal = require('../models/meal.js');
const logger = require('tracer').console();

exports.getStats = (req, res) => {
  User.findById(req.session.passport.user, (err, user) => {
    if (err) {
      logger.log(err);
    } else {
      Meal.aggregate([
        {
          $match: {
            oauthID: user.oauthID,
          },
        },
        {
          $project: {
            dayOfYear: { $substr: ['$timestamp', 0, 10] },
            percentDailyValue: true,
          },
        },
        {
          $group: {
            _id: '$dayOfYear',
            percentDailyValue: { $sum: '$percentDailyValue' },
          },
        },
        { $sort: { _id: 1 } },
      ], (error, meals) => {
        if (error) logger.log(error);
        res.json(meals);
      });
    }
  });
};
