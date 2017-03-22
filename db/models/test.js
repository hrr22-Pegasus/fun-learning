  var mongoose = require("mongoose");
  var Schema = mongoose.Schema;

  var testSchema = new Schema({
    teacher: String,
    games: Object
  });

  var Test = mongoose.model("Test", testSchema);
  module.exports = Test;




