angular.module('funLearning.game', [])
  .controller('GameCtrl', ['$scope', 'UsersFactory', 'GameResultsFactory' ,function($scope, UsersFactory, GameResultsFactory){


  var game = new Phaser.Game(600, 410, Phaser.CANVAS, 'game-canvas', null, false);

  console.log("GameState", GameState);

  game.state.add('Boot', GameState.Boot);
  game.state.add('Preload', GameState.Preload);
  game.state.add('MainMenu', GameState.MainMenu);
  game.state.add('Level1', GameState.Level1);

  var avatar = UsersFactory.currentUser[0]["lastName"];
  console.log(avatar, "user from game.js")

  game.state.start('Boot', null, null, '../assets/bear_animation_test.png');
  // game.state.start('Boot', null, null, '../assets/bear_animation_test_real_panda.png');


}]);