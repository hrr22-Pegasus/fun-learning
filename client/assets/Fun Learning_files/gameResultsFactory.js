'use strict'

angular.module('funLearning')

.factory('GameResultsFactory', function () {
  var gameResults = [];

  return {
    set: function(newResults){
      console.log("setting gameResults in gameResultsfactory:", newResults);
      gameResults.push(newResults);
      console.log("gameResults after push", gameResults);
    },

    get: function(){
      console.log("getting gameResults in gameResultsfactory")
      return gameResults;
    },

    test: function(){
      console.log("Game Factory test - holding: ", gameResults)

    }

  };
})