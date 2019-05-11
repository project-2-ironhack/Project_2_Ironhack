const User = require('../models/user.model')
const mongoose = require('mongoose')
const passport = require('passport');

module.exports.register = (req,res,next) => {
  res.render('auth/register', {authentication: true})
}

module.exports.doRegister = (req,res,next) => {
  function renderWithErrors(errors) {
    res.render('auth/register', {
      user: req.body,
      authentication: true,
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
  res.render('auth/login', {authentication: true})
}

module.exports.doLogin = (req, res, next) => {
  passport.authenticate('local-auth', (err, user, validation) => {
    if(err) { 
      next(next)
    } else if (!user){ 
      res.render('auth/login', { 
        user: req.body,
        authentication: true,
        errors: validation 
      })
    } else { 
      return req.login(user, (err) => { 
        if(err) {
          next(err)
        } else {
          res.redirect('/set')
        }
      })
    }
  })(req, res, next);
}

module.exports.logout = (req, res, next) => {
  req.logout()
  res.redirect('/login')
}