const User = require('../models/user.js');
const logger = require('tracer').console();

exports.getAccount = (req, res) => {
  User.findById(req.session.passport.user, (err, user) => {
    if (err) {
      logger.log(err);
    } else {
      // res.render('account', { user, isAuthenticated: true, title: 'Account' });
      res.json(user);
    }
  });
};
