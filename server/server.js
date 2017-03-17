var express = require('express');
var bodyParser = require('body-parser');
var path = require("path");

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));
console.log("directoy name: ", __dirname);

var port = process.env.PORT || 1337;

app.listen(port);
console.log('Hey!');
console.log("Listening on port: ", port);
module.exports = app;