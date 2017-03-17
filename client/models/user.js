  var mongoose = require("mongoose");
  var Schema = mongoose.Schema;

  var userSchema = new Schema({
    name: String, //primary key here ==> connects to Picture.user_id
    age: Number,
    grade: Number
  });

  var User = mongoose.model("User", userSchema);
  module.exports = User;



