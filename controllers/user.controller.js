const mongoose = require('mongoose')

module.exports.profile = (req,res,next) => {
  res.render('auth/profile')
}

module.exports.doProfile = (req, res, next) => {
  if (!req.body.password) {
    delete req.body.password;
  }

  if (req.file) {
    req.body.avatarURL = req.file.secure_url;
  }

  const User = req.user;
  Object.assign(User, req.body);
  User.save()
    .then(user => res.redirect('/profile'))
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('auth/profile', {
          user: req.body,
          errors: error.errors
        })
      } else {
        next(error);
      }
    });
}

module.exports.login = (req,res,next) => {
  res.render('auth/login')
}
