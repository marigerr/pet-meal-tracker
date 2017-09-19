const User = require('../models/user.js');

exports.getAccount = (req, res) => {
  User.findById(req.session.passport.user, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      res.render('account', { user: user, isAuthenticated: true, title: "Account" });
    }
  });
}