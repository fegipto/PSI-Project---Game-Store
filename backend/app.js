var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var mainRouter = require("./routes/index");

var app = express()

app.use(cors())

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose instanceof mongoose.Mongoose; // true
mongoose.set('strictQuery', false);
const m = new mongoose.Mongoose();
const mongoDB = "mongodb+srv://tiagomg7fernandes:mBTQcpcGgtJeLuDj@locallibrary.kxp3fjt.mongodb.net/my_database?retryWrites=true&w=majority";
//const mongoDB = "mongodb://psi031:psi031@localhost:27017/psi031?retryWrites=true&authSource=psi031";

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  await m.createConnection(mongoDB).dropCollection("users");
  await m.createConnection(mongoDB).dropCollection("items");
  await m.createConnection(mongoDB).dropCollection("carts");

}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use("/", mainRouter); // Add catalog routes to middleware chain.

//Cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Origin", "GET, POST, PUT, DELETE"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  res.header('Access-Control-Expose-Headers', 'x-acess-token, x-refresh-token');
  next();
});

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
