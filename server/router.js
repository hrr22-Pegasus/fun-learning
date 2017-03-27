// var handler = require('./request-handler');
var User = require('../db/models/user.js');
var Test = require('../db/models/test.js');
var mongoose = require('mongoose');
var express = require('express');

var router = express.Router();

router.post('/api/results/:gameName/:userName', function(req, res) {
  // sanitizes user input to prevent xss attacks
  var gameName = req.sanitize(req.params.gameName);
  var userName = req.sanitize(req.params.userName);
  console.log('adding results still works');
  // builds game data object with sanitized values
  var gameData = {};
  for(var key in req.body) {
    gameData[key] = req.sanitize(req.body[key]);
  }
  // builds query string for dynamically selecting the game to insert the results into
  var query = {};
  query['gameResults.' + gameName] = gameData;

  User.findOneAndUpdate({'username': userName}, {$addToSet: query}, function(err, data) {
    if (err) {
      console.error(err);
    } else {
      console.log('data from server', data);
      res.status(201).send(data);
    }
    res.end();
  });
});
router.get('/api/results', function(req, res) {
  console.log('get all game results ran');
  User.find({}, function(err, users) {
    if (err) {
      console.log(err);
    } else {
      // builds a game data array to send back to the client, this is for analysis purposes
      var gameData = [];
      for (var i = 0; i < users.length; i++) {
        gameData.push(users[i].gameResults);
      }
      res.status(200).send(gameData);
    }
    res.end();
  });
});
router.post('/api/users', function(req, res){

  // sanitizes new user input and then adds it to the database
  var userInfo = {};
  for(var key in req.body) {
    userInfo[key] = req.sanitize(req.body[key]);
  }

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
  // checks if the username and password supplied on the login page exist in the database
  var currentUsername = req.sanitize(req.params.username);
  var currentPassword = req.sanitize(req.params.password);

  User.findOne({'username': currentUsername, 'password': currentPassword}, function(err, users) {
    if (err) {
      console.log(err);
    } else if (users) {
      console.log('User and Password is in the database!');
      res.status(200).send(users);
    } else {
      console.log('This user and/or password not in database or is incorrect');
    }
    res.end();
  });
});
router.get('/api/users', function(req, res) {
  console.log('get all users ran');
  // gets all users
  User.find({}, function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(users);
    }
    res.end();
  });
});
router.post('/api/tests', function(req, res){
  // adds a new test to the database
  var testInfo = req.body;
  var newTest = new Test(testInfo);

  newTest.save(function(err, result){
  if (err) {
    console.log('Error fetching records', err);
  }
    res.status(200).send(result);
    console.log('test saved successfully')
  });
});
router.get('/api/tests/:teacher/', function(req, res) {
  // finds the current teacher and checks if they have tests stored in the database
  var currentTeacher = req.params.teacher;

  Test.findOne({'teacher': currentTeacher}, function(err, tests) {
    if (err) {
      console.log(err);
    } else if (tests) {
      console.log('Test is in the database!');
      res.status(200).send(tests);
    } else {
      console.log('This teacher not in database or is incorrect');
    }
    res.end();
  });
});

module.exports = router;

