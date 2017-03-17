angular.module('funLearning.results', [])
  .factory('ResultsFactory', ['$http', function($http) {

    var currentUser = {};
    var currentTeacher = {};
    var allUsers = [];
    var allTeachers = [];
    var game1Data = [];
    var game2Data = [];
    var game3Data = [];
    var allGameData = [];

    var addNewUser = function(data) {
      return $http({
        method: 'POST',
        url: '/api/users',    //1234567890ag
        data: data
      }).then(function(){
        console.log('post request succeeded! :)')

      })
    };

    var addNewResult = function(data) {
      return $http({
        method: 'POST',
        url: '/api/results',    //1234567890ag
        data: data
      }).then(function(){
        console.log('post request succeeded! :)')

      })
    };

    var getUsers = function() {
      return $http({
        method: 'GET',
        url: '/api/users',    //1234567890ag
      }).then(function(){
        console.log('post request succeeded! :)')

      })
    };

    var getResults = function() {
      return $http({
        method: 'GET',
        url: '/api/results',    //1234567890ag
      }).then(function(){
        console.log('post request succeeded! :)')

      })
    };


    return {
      currentUser: currentUser,
      currentTeacher: currentTeacher,
      allUsers: allUsers,
      allTeachers: allTeachers,
      game1Data: game1Data,
      game2Data: game2Data,
      game3Data: game3Data,
      allGameData: allGameData,
      addNewUser: addNewUser,
      addNewResult: addNewResult,
      getUsers: getUsers,
      getResults: getResults
    };

  }]);






