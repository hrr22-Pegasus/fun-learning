var express = require('express');
<<<<<<< HEAD
var User = require('../client/models/user.js');
var bodyParser = require('body-parser');
var path = require("path");
var mongoose = require('mongoose');

=======
var bodyParser = require('body-parser');
var path = require("path");
>>>>>>> App updated to include basic front end modules and server functionality. Still need to incorporate databases.

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));
console.log("directoy name: ", __dirname);

<<<<<<< HEAD
//mongodb://<dbuser>:<dbpassword>@ds133340.mlab.com:33340/teampegasus
mongoose.connect('mongodb://test:test@ds133340.mlab.com:33340/teampegasus', function(err) {
  if(err) {
    console.log('connection error', err);
  }
  else {
    console.log('connection with database successful');
  }
});


=======
>>>>>>> App updated to include basic front end modules and server functionality. Still need to incorporate databases.
var port = process.env.PORT || 1337;

app.listen(port);
console.log('Hey!');
console.log("Listening on port: ", port);
<<<<<<< HEAD

////////SERVER going to be routing///////////

app.post("/api/users", function(req, res){
  console.log("Inside Post FUNCTION: ");
  //req.body = {user: Ryan, age: 10, grade: 5} //from game.html
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



=======
>>>>>>> App updated to include basic front end modules and server functionality. Still need to incorporate databases.
module.exports = app;