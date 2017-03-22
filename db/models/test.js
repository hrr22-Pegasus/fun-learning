  var mongoose = require("mongoose");
  var Schema = mongoose.Schema;

  var testSchema = new Schema({
    teacher: String,
    games: Object
  });

  var Test = mongoose.model("Test", testSchema);
  module.exports = Test;


  // [
  //   {
  //     "teacher": "Tre",
  //     "games": { game1: { test1: [[0,1], [5,5], [3,3], [0,0]] }, game2: { test1: [[0,1], [5,5], [3,3], [0,0]]} }

  //   }
  // ]


