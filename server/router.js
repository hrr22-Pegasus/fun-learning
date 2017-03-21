var handler = require('./request-handler');
var User = require('../db/models/user.js');
var mongoose = require('mongoose');
var express = require('express');

var router = express.Router();

router.post("/api/users", function(req, res){
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


router.get('/api/users/:username/:password', function(req, res) {
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

router.get('/api/users', function(req, res) {
  User.find({}, function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(users);
    }
    res.end();
  });
});

module.exports = router;
/*
  API endpoints have a / http requests have method name
    /login
      POST
    /signup
      POST
    /profile/:user
      GET/POST/DELETE
      /report-card
      GET
    /dashboard
      GET?
      /game1
        POST
      /game2
        POST
      /game3
        POST
      /game4
        POST
    /leaderboard ? overview ?
      GET
*/
/*
  app.get('/profile/:userId')
  app.post('/profile/:userId')
  app.delete('/profile/:userId')

  app.get('/login')
  app.post('/login')

  app.post('/signup')

  app.get('/report-card')

  app.get('/dashboard')

  app.post('/dashboard/:gameId')

  app.get('/overview')
*/
