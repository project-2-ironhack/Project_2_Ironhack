const User = require('../models/user.model')
const mongoose = require('mongoose')
const passport = require('passport');

module.exports.profile = (req,res,next) => {
  res.render('auth/profile')
}

module.exports.doProfile = (req,res,next) => {
  function renderWithErrors(errors) {
    res.render('auth/register', {
      user: req.body,
      errors: errors
    })
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        renderWithErrors({ email: 'Email already registered'})
      } else {
        user = new User(req.body);
        return user.save()
          .then(user => res.redirect('/login'))
      }
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        renderWithErrors(error.errors)
      } else {
        next(error);
      }
    });
}

module.exports.login = (req,res,next) => {
  res.render('auth/login')
}
