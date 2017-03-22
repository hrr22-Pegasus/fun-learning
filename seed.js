  var mongoose = require('mongoose');
  var UserData = require('./data.json');
  var User = require('./db/models/user.js');

  // var TestData = require('./data')
  // var Test =require(_)


  var mongoose = require('mongoose');
  mongoose.connect('mongodb://test:test@ds133340.mlab.com:33340/teampegasus');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {
    console.log('Dropping and then Seeding the Database!!!!');
    console.log(db.name);//catsDB
    console.log(db.collection);
  });

  User.collection.drop();

  // Step 1: Drop old data
  // TODO

// db.collection.drop();
  // console.log(User.collection);
// Step 2: Add data from `data.json`
  User.collection.insertMany(UserData);


  // Test.collection.drop();
  // Test.collection.insertMany(TestData)



// [
//   {
//     "teacher": "Tre",
//     "games": { game1: { test1: [[0,1], [5,5], [3,3], [0,0]] }, game2: { test1: [[0,1], [5,5], [3,3], [0,0]]} }

//   }
// ]
