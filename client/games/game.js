angular.module('funLearning.game', [])
  .controller('GameCtrl', ['$scope', 'UsersFactory', 'GameResultsFactory' ,function($scope, UsersFactory, GameResultsFactory){

  //var game = new Phaser.Game(600, 410, Phaser.CANVAS, 'game-canvas', null, false);

  GameState.Preload.prototype.getAvatar = function(){
    return UsersFactory.currentUser[0]["avatar"][0];
  };

  GameState.Level1.prototype.getTeacher = function(){
    return UsersFactory.currentUser[0]["teacher"] //returns teacher to be used to get test
  };

  GameState.Level1.prototype.getTest = function(teacher){
    return TestsFactory.getTest(teacher);
  };

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

  game.state.start('Boot');

  var game2 = new Phaser.Game(300, 300, Phaser.CANVAS, 'phaser-example', null, false);
  GameState2.Level1.prototype.getTeacher = function(){
    return UsersFactory.currentUser[0]["teacher"] //returns teacher to be used to get test
  };

  GameState2.Level1.prototype.getTest = function(teacher){
    return TestsFactory.getTest(teacher);
  };
  game2.state.add('Boot', GameState2.Boot);
  game2.state.add('Preload', GameState2.Preload);
  game2.state.add('MainMenu', GameState2.MainMenu);
  game2.state.add('Level1', GameState2.Level1);

  game2.state.start('Boot');
}]);