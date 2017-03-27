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
        if (res.data) {
          currentTest.push(res.data);
        } else {
          alert('This teacher does not exist');
        }
        return currentTest;
      });
    }

    return {
      currentTest: currentTest,
      addNewTest: addNewTest,
      getTest: getTest

    };

  });