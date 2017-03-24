angular.module('funLearning.results', [])
  .factory('ResultsFactory', ['$http', function($http) {

    var game1Data = [];
    var game2Data = [];
    var game3Data = [];
    var allGameData = [];

    var addNewResult = function(data) {
      return $http({
        method: 'POST',
        url: '/api/results',
        data: data
      }).then(function(){
        console.log('post request succeeded! :)')

      })
    };

    var getResults = function() {
      return $http({
        method: 'GET',
        url: '/api/results',
      }).then(function(){
        console.log('post request succeeded! :)')

      })
    };

    return {
      game1Data: game1Data,
      game2Data: game2Data,
      game3Data: game3Data,
      allGameData: allGameData,
      addNewResult: addNewResult,
      getResults: getResults
    };

  }]);






