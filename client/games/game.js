angular.module('funLearning.game', [])
  .controller('GameCtrl', function($scope, UsersFactory, GameResultsFactory, TestsFactory, $location){

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

    $scope.changeLocation = function(path) {
      console.log('clicked: ', path);
      $location.path(path);
    };


    GameState.Preload.prototype.getAvatarFromUser = function(){
      return UsersFactory.currentUser[0]["avatar"];
    };

    /////////////////// Level1 Functions Using Factory //////////////////

    console.log("Gamestate they say is undefined: ", GameState);
    GameState.Preload.prototype.getTeacherFromUser = function(){
      return UsersFactory.currentUser[0]["teacher"];
    };

    GameState.Preload.prototype.loadTestByTeacher = function(teacher){
      TestsFactory.getTest(teacher);
      console.log("Test factor after getTest", TestsFactory);
    };
    /////////////////////////////////////////////////////////////////////
    GameState.Level1.prototype.returnTest = function(game, test){
      var testObj = TestsFactory.currentTest[0];
      console.log("returning test in Level1", testObj);
      var filteredTest = testObj["games"][game][test];
      return filteredTest;
    };


    /////////////////// Gameover Functions Using Factory //////////////////
    GameState.GameOver.prototype.getUsername = function(){
      return UsersFactory.currentUser[0]["username"];
    };

    GameState.GameOver.prototype.addResult = function(gameName, userName, data) {
      console.log('game1: ', gameName, 'user1: ', userName, 'data1: ', data);
      return GameResultsFactory.addNewResult(gameName, userName, data);
    }
    ////////////////////////////////////////////////////////////////////////

    game.state.start('Boot');

  })
  .controller('GameCtrl2', function($scope, UsersFactory, GameResultsFactory, TestsFactory, $location){
    $scope.getGameResults = function() {
      return GameResultsFactory.getGameResults().then(function(data) {
        console.log('data response', data);
        console.log('all game data', GameResultsFactory.allGameData);
      });
    };

    $scope.changeLocation = function(path) {
      console.log('clicked: ', path);
      $location.path(path);
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
  .controller('GameCtrl3', function($scope, UsersFactory, GameResultsFactory, TestsFactory, $location){


    $scope.getGameResults = function() {
      return GameResultsFactory.getGameResults().then(function(data) {
        console.log('data response', data);
        console.log('all game data', GameResultsFactory.allGameData);


    });
};


    $scope.changeLocation = function(path) {
          console.log('clicked: ', path);
          $location.path(path);
        };

var game3 = new Phaser.Game(1200, 1000, Phaser.CANVAS, 'game-3', null, false);



  GameState3.GameOver.prototype.addResult = function(gameName, userName, data) {
      console.log('game: ', gameName, 'user: ', userName, 'data: ', data);
      return GameResultsFactory.addNewResult(gameName, userName, data);
    }

    GameState3.GameOver.prototype.getUsername = function(){
      return UsersFactory.currentUser[0]["username"];
    };


    game3.state.add('Boot', GameState3.Boot);
    game3.state.add('Preload', GameState3.Preload);
    game3.state.add('MainMenu', GameState3.MainMenu);
    game3.state.add('Level1', GameState3.Level1);
    game3.state.add('GameOver', GameState3.GameOver);
    game3.state.start('Boot');
  });


