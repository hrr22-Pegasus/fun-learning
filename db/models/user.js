  var mongoose = require("mongoose");
  var Schema = mongoose.Schema;

  var userSchema = new Schema({
    //user profile / demographic info
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    age: Number,
    gender: String,
    isAdministrator: Boolean,
    grade: Number,
    teacher: String,
    school: String,
    dateJoined: Date,
    avatar: Array,

    //game related logic
    gameResults: Object,
    badges: Array,
    friends: Array,
    sessionLength: Array

  });

  var User = mongoose.model("User", userSchema);
  module.exports = User;


// {
// username: username,
// password: password,
// age: age,
// gender: gender,
// Administrator: true/false,
// gameResults:
//   {
//     game1:[{
//       level: level,
//       score: score,
//       correct: correct,
//       incorrect: incorrect,
//       time: time,
//       subject: subject,
//       topic: topic,
//       sentiment: sentiment,
//       hintsUsed: hintsUsed
//     }]
//   }

// grade: grade,
// teacher: teacher,
// badges: badges,
// avatar: avatar,

// friends: friends,
// school: school,
// dateJoined: dateJoined,
// sessionLength: { login: loginTime, logout: logoutTime }

// }