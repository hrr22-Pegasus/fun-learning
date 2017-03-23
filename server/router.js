var handler = require('./request-handler');
var User = require('../db/models/user.js');
var Test = require('../db/models/test.js');
var mongoose = require('mongoose');
var express = require('express');

var router = express.Router();

router.post('/api/results/:gameName/:userName', function(req, res) {
  var gameName = req.sanitize(req.params.gameName);
  var userName = req.sanitize(req.params.userName);

  var gameData = {};
  for(var key in req.body) {
    gameData[key] = req.sanitize(req.body[key]);
  }
  // find user, User.findOne()
  // check for the game,
  // add the game data User.update({'gameResults.game1'})
  User.findOneAndUpdate({'username': userName}, {$push: {'gameResults': gameData}}, function(err, data) {
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
  User.find({}, function(err, users) {
    if (err) {
      console.log(err);
    } else {
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
  // console.log("Inside Post FUNCTION: ");
  //req.body = {user: Joe, age: 10, grade: 5} //from game.html
  // console.log("Data being added: ", req.body);
  var userInfo = {};
  for(var key in req.body) {
    userInfo[key] = req.sanitize(req.body[key]);
  }
  //var userInfo = req.sanitize(req.body);
  //var userInfo = req.body;
  // console.log('sanitized', userInfo);
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
  // console.log('sanitized', req.sanitize(req.params.username));
  var currentUsername = req.sanitize(req.params.username);
  // console.log('unsanitary!!!', currentUsername);
  var currentPassword = req.sanitize(req.params.password);

  // console.log("Server - req.params.username", req.params.username);
  // console.log("Server - req.params.password", req.params.password);

  User.findOne({'username': currentUsername, 'password': currentPassword}, function(err, users) { //TODO
    if (err) {
      console.log(err);
    } else if (users) {
      console.log('User and Password is in the database!');
      console.log('Users return object: ', users);
      res.status(200).send(users);
      // res.redirect(301, '#/dashboard');
    } else {
      console.log('This user and/or password not in database or is incorrect');
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

router.post('/api/tests', function(req, res){
  console.log('Inside test Post FUNCTION: ');
  //req.body = {teacher: Tre}
  console.log('Data being added: ', req.body);

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
  var currentTeacher = req.params.teacher;

  console.log('Server - req.params.teacher', req.params.teacher);

  Test.findOne({'teacher': currentTeacher}, function(err, tests) { //TODO
    if (err) {
      console.log(err);
    } else if (tests) {
      console.log('Test is in the database!');
      console.log('Tests return object: ', tests);
      res.status(200).send(tests);
      // res.redirect(301, '#/dashboard');
    } else {
      console.log('This teacher not in database or is incorrect');
    }
    res.end();
  });
});


module.exports = router;

