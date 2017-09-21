const User = require('../models/user.js');

exports.getAccount = (req, res) => {
  User.findById(req.session.passport.user, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      // res.render('account', { user, isAuthenticated: true, title: 'Account' });
      res.json(user);
    }
  });
};
