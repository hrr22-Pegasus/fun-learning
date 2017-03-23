var express = require('express');
var User = require('../db/models/user.js');
var expressSanitizer = require('express-sanitizer');
var bodyParser = require('body-parser');
var routes = require('./router.js');
var path = require("path");
var mongoose = require('mongoose');



var app = express();

app.use(bodyParser.json());
app.use(expressSanitizer());
app.use(express.static(__dirname + '/../client'));
app.use(routes);
console.log("directory name: ", __dirname);

var isAuthenticated = false;


//mongodb://<dbuser>:<dbpassword>@ds133340.mlab.com:33340/teampegasus
mongoose.connect('mongodb://test:test@ds133340.mlab.com:33340/teampegasus', function(err) {
  if(err) {
    console.log('connection error', err);
  }
  else {
    console.log('connection with database successful');
  }
});


var port = process.env.PORT || 1339;

app.listen(port);
console.log('Hey!');
console.log("Listening on port: ", port);


////////SERVER going to be routing///////////




module.exports = app;