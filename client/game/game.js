angular.module('funLearning.game', [])
  .controller('GameCtrl', ['$scope', 'UsersFactory', 'GameResultsFactory' ,function($scope, UsersFactory, GameResultsFactory){

  $scope.getUser = function(){
    $scope.username = GameResultsFactory.get();
    $scope.password = UsersFactory.getPassword();
  }


  // $scope.test = 0;
  // if($scope.test ===1){
  var game = new Phaser.Game(600, 410, Phaser.CANVAS, 'game-canvas', null, false);

  Game.MainMenu.prototype.saveResults = function(results){
    GameResultsFactory.set(results);
  }

  Game.MainMenu.prototype.sendResults = function(){
    GameResultsFactory.test();
    $scope.username = GameResultsFactory.get();
    console.log("cat")
  };

  console.log("game");
  game.state.add('MainMenu', Game.MainMenu);
  game.state.start('MainMenu');
// }
  // var menuState = {
  //   preload: function(){
  //     this.load.image( 'background', '../assets/forrest_background.png');
  //     this.load.image( 'zero', '../assets/mnist-digits-0.png');

  //     this.fallingTimer = 0;
  //     this.countDownClock = 10;
  //     this.kanyeScoreText;

  //     this.variable1;
  //     this.variable2;
  //     this.sum;
  //     this.points = 0;

  //   },
  //   create: function(){
  //     this.background = game.add.sprite(0, 0, 'background');
  //     this.zero = game.add.sprite(100, 100, 'zero');
  //     this.zero.enableBody = true;
  //     game.physics.enable(this.zero, Phaser.Physics.ARCADE);


  //     this.cursors = game.input.keyboard.createCursorKeys(); //arrow keys
  //     console.log(this.cursors);



  //     this.kanyeScoreText = game.add.text(16, 16, 'Timer: 0', { fontSize: '14px', fill: '#000' });
  //     this.scopeIncrementText = game.add.text(16, 40, '$scope: ', { fontSize: '14px', fill: '#000' });
  //   },

  //   update: function(){

  //     if(this.cursors.right.isDown){
  //       this.zero.body.velocity.x = 10;
  //     };

  //     if(this.fallingTimer < 20000){
  //       if (game.time.now > this.fallingTimer){
  //         console.log(this.fallingTimer);
  //         this.kanyeScoreText.text = "Timer: " + this.countDownClock;
  //         this.scopeIncrementText.text = "$Scope: ";
  //         this.fallingTimer += 1000;
  //         this.countDownClock -= 1;

  //       }
  //     } else {
  //       console.log("times up");
  //     }
  //     // game.animations.play('walkleft');

  //   }

  // };

  // game.state.add('MainMenu', menuState)
  // game.state.start('MainMenu')

}]);

//TESTING GIT COMMENTS
