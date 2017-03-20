var express = require('express');
var User = require('../db/models/user.js');
var bodyParser = require('body-parser');
var path = require("path");
var mongoose = require('mongoose');


var bodyParser = require('body-parser');
var path = require("path");


var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));
console.log("directoy name: ", __dirname);

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

app.post("/api/users", function(req, res){
  console.log("Inside Post FUNCTION: ");
  //req.body = {user: Joe, age: 10, grade: 5} //from game.html
  console.log("Data being added: ", req.body);

  var userInfo = req.body;
  var newUser = new User(userInfo);

  newUser.save(function(err, result){
  if (err) {
    console.log('Error fetching records', err);
  }
    res.status(200).send(result);
    console.log("user saved successfully")
  });
});

app.get('/api/users', function(req, res) {
  User.find({}, function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(users);
    }
    res.end();
  });
});

app.get('/api/users/:username/:password', function(req, res) {
  var currentUsername = req.params.username;
  var currentPassword = req.params.password;

  console.log("Server - req.params.username", req.params.username);
  console.log("Server - req.params.password", req.params.password);

  User.findOne({"username": currentUsername, "password": currentPassword}, function(err, users) { //TODO
    if (err) {
      console.log(err);
    } else if (users) {
      console.log("User and Password is in the database!");
      console.log("Users return object: ", users);
      res.status(200).send(users);
      // res.redirect(301, '#/dashboard');
    } else {
      console.log("This user and/or password not in database or is incorrect");
      // res.redirect(301, '#/signup');
    }
    res.end();
  });
});


module.exports = app;