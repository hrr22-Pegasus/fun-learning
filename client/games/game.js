angular.module('funLearning.game', [])
  .controller('GameCtrl', ['$scope', 'UsersFactory', 'GameResultsFactory' ,function($scope, UsersFactory, GameResultsFactory){


  var game = new Phaser.Game(600, 410, Phaser.CANVAS, 'game-canvas', null, false);


  GameState.Preload.prototype.getAvatar = function(){
    return UsersFactory.currentUser[0]["avatar"][0];
  }


  GameState.Level1.prototype.saveResults = function(results){
    GameResultsFactory.set(results);
  };
  GameState.Level1.prototype.sendResults = function(){
    GameResultsFactory.test();
  };


  console.log("GameState", GameState);
  game.state.add('Boot', GameState.Boot);
  game.state.add('Preload', GameState.Preload);
  game.state.add('MainMenu', GameState.MainMenu);
  game.state.add('Level1', GameState.Level1);

  var avatar = UsersFactory.currentUser[0]["avatar"][0]; //TODO
  console.log(avatar, "user from game.js")

  game.state.start('Boot');


}]);