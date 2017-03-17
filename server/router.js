var handler = require('request-handler');
var app = require('server.js');
var User = require('../client/models/user.js');
var mongoose = require('mongoose');




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
