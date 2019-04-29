require('dotenv').config()

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const session = require('./config/session.config')
const passport = require ('passport')

require('./config/passport.config');
require('./config/hbs.config')
require('./config/db.config');

const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');
const placesRouter = require('./routes/places.routes')
const mapsRouter = require('./routes/maps.routes')
// const placesRouter = require('./routes/places.routes')
const dashBoardRouter = require('./routes/dash.routes')
const setRouter = require('./routes/set.routes')




const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.path = req.path;
  res.locals.session = req.user;
  next();
})

//cambiar esta redirección para mostrar bien la landing page
app.get('/', (req,res,next) => {
  res.redirect('/login')
});
app.use('/',authRouter)
app.use('/',userRouter)
app.use('/places', placesRouter)
app.use('/mapbox', mapsRouter)
app.use('/set',setRouter)
// app.use('/places', placesRouter)
app.use('/dashboard', dashBoardRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
