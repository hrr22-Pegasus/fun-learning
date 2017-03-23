angular.module('funLearning')

.factory('GameResultsFactory', function ($http) {

    var allGameData = [];

    var addNewResult = function(gameName, userName, data) {
      return $http({
        method: 'POST',
        url: '/api/results/' + gameName + '/' + userName,
        data: data
      }).then(function(){
        console.log('post request succeeded! :)')
        getGameResults();
      })
    };

    var getGameResults = function() {
      return $http({
        method: 'GET',
        url: '/api/results',
      }).then(function(res){
        console.log('get request succeeded! :)')
        allGameData.push(res.data);
        console.log(allGameData)
        return res.data;
      });
    };

    return {
      allGameData: allGameData,
      addNewResult: addNewResult,
      getGameResults: getGameResults
    };
});

  // var gameResults = [];

  // return {
  //   set: function(newResults){
  //     console.log("setting gameResults in gameResultsfactory:", newResults);
  //     gameResults.push(newResults);
  //     console.log("gameResults after push", gameResults);
  //   },

  //   get: function(){
  //     console.log("getting gameResults in gameResultsfactory")
  //     return gameResults;
  //   },

  //   test: function(){
  //     console.log("Game Factory test - holding: ", gameResults)

  //   }

  // };