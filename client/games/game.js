angular.module('funLearning.game', [])
  .controller('GameCtrl', function($scope, UsersFactory, GameResultsFactory, TestsFactory){

    $scope.getGameResults = function() {
      return GameResultsFactory.getGameResults().then(function(data) {
        console.log('data response', data);
        console.log('all game data', GameResultsFactory.allGameData);
      });
    };

  var game = new Phaser.Game(600, 410, Phaser.CANVAS, 'game-canvas', null, false);

    game.state.add('Boot', GameState.Boot);
    game.state.add('Preload', GameState.Preload);
    game.state.add('MainMenu', GameState.MainMenu);
    game.state.add('Level1', GameState.Level1);
    game.state.add('GameOver', GameState.GameOver);
    game.state.start('Boot');

    // GameState.Preload.prototype.getAvatar = function(){
    //   return UsersFactory.currentUser[0]["avatar"][0];
    // };

    GameState.Preload.prototype.getPropertyFromUser = function(property){
      return UsersFactory.currentUser[0][property][0];
    };

    GameState.GameOver.prototype.getUsername = function(){
      return UsersFactory.currentUser[0]["username"];
    };

    GameState.GameOver.prototype.addResult = function(gameName, userName, data) {
      console.log('game1: ', gameName, 'user1: ', userName, 'data1: ', data);
      return GameResultsFactory.addNewResult(gameName, userName, data);
    }


  })
  .controller('GameCtrl2', function($scope, UsersFactory, GameResultsFactory, TestsFactory){
    $scope.getGameResults = function() {
      return GameResultsFactory.getGameResults().then(function(data) {
        console.log('data response', data);
        console.log('all game data', GameResultsFactory.allGameData);
      });
    };

    var game2 = new Phaser.Game(600, 600, Phaser.CANVAS, 'phaser-example', null, false);

    GameState2.GameOver.prototype.addResult = function(gameName, userName, data) {
      console.log('game: ', gameName, 'user: ', userName, 'data: ', data);
      return GameResultsFactory.addNewResult(gameName, userName, data);
    }

    GameState2.GameOver.prototype.getUsername = function(){
      return UsersFactory.currentUser[0]["username"];
    };

    game2.state.add('Boot', GameState2.Boot);
    game2.state.add('Preload', GameState2.Preload);
    game2.state.add('MainMenu', GameState2.MainMenu);
    game2.state.add('Level1', GameState2.Level1);
    game2.state.add('GameOver', GameState2.GameOver);
    game2.state.start('Boot');
  })
  .controller('GameCtrl3', function($scope, UsersFactory, GameResultsFactory, TestsFactory){


    $scope.getGameResults = function() {
      return GameResultsFactory.getGameResults().then(function(data) {
        console.log('data response', data);
        console.log('all game data', GameResultsFactory.allGameData);
           var game3 = new Phaser.Game(1600, 1200, Phaser.CANVAS, 'game3', null, false);

     var game3 = new Phaser.Game(1600, 1400, Phaser.CANVAS, 'game3', null, false);
     GameState3.Level1.prototype.getTest = function(teacher){
      return TestsFactory.getTest(teacher);
  };
    game3.state.add('Boot', GameState3.Boot);
    game3.state.add('Preload', GameState3.Preload);
    game3.state.add('MainMenu', GameState3.MainMenu);
    game3.state.add('Level1', GameState3.Level1);

    game3.state.start('Boot');
      });
    };
  });
