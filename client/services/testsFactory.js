angular.module('funLearning.tests', [])
  .factory('TestsFactory', function($http, $location) {

    var currentTest = [];

    var addNewTest = function(data) {
      return $http({
        method: 'POST',
        url: '/api/tests',
        data: data
      })
    };

    var getTest = function(teacher){
      return $http({
        method: 'GET',
        url: '/api/tests/' + teacher
      }).then(function(res){
        console.log('testsFactory.js - getCurrentTest result', res);
        if (res.data) {
          currentTest.push(res.data); //****** this may need to be currentTest = res.data
        }
        console.log(currentTest);
        return currentTest;
      });
    }

    return {
      currentTest: currentTest,
      addNewTest: addNewTest,
      getTest: getTest
    };

  });

  // var userSchema = new Schema({
  //   //user profile / demographic info
  //   firstName: String,
  //   lastName: String,
  //   username: String,
  //   password: String,
  //   age: Number,
  //   gender: String,
  //   isAdministrator: Boolean,
  //   grade: Number,
  //   teacher: String,
  //   school: String,
  //   dateJoined: Date,
  //   avatar: Array,

  //   //game related logic
  //   gameResults: Array,
  //   badges: Array,
  //   friends: Array,
  //   sessionLength: Array

  // });





