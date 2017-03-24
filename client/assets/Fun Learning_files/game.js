angular.module('funLearning.game', [])
  .controller('GameCtrl', ['$scope', 'UsersFactory', 'GameResultsFactory', 'TestsFactory' ,function($scope, UsersFactory, GameResultsFactory, TestsFactory){

  var game = new Phaser.Game(600, 410, Phaser.CANVAS, 'game-canvas', null, false);

  GameState.Preload.prototype.getAvatar = function(){
    // TestsFactory.getTest("Cheng");

    return UsersFactory.currentUser[0]["avatar"][0];
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


  var game3 = new Phaser.Game(1600, 1200, Phaser.CANVAS, 'game3', null, false);

   GameState3.Level1.prototype.getTest = function(teacher){
    return TestsFactory.getTest(teacher);
  };
  game3.state.add('Boot', GameState3.Boot);
  game3.state.add('Preload', GameState3.Preload);
  game3.state.add('MainMenu', GameState3.MainMenu);
  game3.state.add('Level1', GameState3.Level1);

  game3.state.start('Boot');


}]);