  var mongoose = require("mongoose");
  var Schema = mongoose.Schema;

  var testSchema = new Schema({
    teacher: String,
    test: Array

  });

  var Test = mongoose.model("Test", testSchema);
  module.exports = Test;



router.post("/api/tests", function(req, res){
  console.log("Inside test Post FUNCTION: ");
  //req.body = {teacher: Tre}
  console.log("Data being added: ", req.body);

  var testInfo = req.body;
  var newTest = new Test(testInfo);

  newTest.save(function(err, result){
  if (err) {
    console.log('Error fetching records', err);
  }
    res.status(200).send(result);
    console.log("test saved successfully")
  });
});


router.get('/api/tests/:teacher/', function(req, res) {
  var currentTeacher = req.params.teacher;

  console.log("Server - req.params.teacher", req.params.teacher);

  Test.findOne({"teacher": currentTeacher}, function(err, tests) { //TODO
    if (err) {
      console.log(err);
    } else if (tests) {
      console.log("Test is in the database!");
      console.log("Tests return object: ", tests);
      res.status(200).send(tests);
      // res.redirect(301, '#/dashboard');
    } else {
      console.log("This teacher not in database or is incorrect");
    }
    res.end();
  });
});







  // [
  //   {
  //     "teacher": "Tre",
  //     "test": [[0, 1], [7,7], [6,4], [7,8]]
  //   }
  // ]
