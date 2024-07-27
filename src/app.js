var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// Import routes
const userRoutes = require('./routers/api/v1/userRoutes');
const accountRoutes = require('./routers/api/v1/accountRoutes');
const transactionRoutes = require('./routers/api/v1/transactionRoutes');

// manggil routes
app.use('/api/v1', userRoutes);
app.use('/api/v1', accountRoutes);
app.use('/api/v1', transactionRoutes);

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

// start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;
