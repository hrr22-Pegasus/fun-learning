var GameState = GameState || {};

GameState.Preload = function(game){};

GameState.Preload.prototype = {

  preload: function(){
    this.avatarPath = this.getPropertyFromUser("avatar");
    console.log("importing avatar...", this.avatarPath);
    //place all the booted items on the screen
    this.load.image('background', 'assets/haunted-mansion.png');
    this.load.spritesheet('kanye', this.avatarPath, 870/10, 166, 20,1,1);
    this.load.image('ghost', 'assets/ghost.png');
    this.load.image('option1', 'assets/score1.png');
    this.load.image('option2', 'assets/score2.png');
    this.load.image('option3', 'assets/score3.png');
    this.load.image('option4', 'assets/score4.png');
    this.load.image('option5', 'assets/score5.png');
  },
  create: function(){
    // this.background = game.add.sprite(0,0, 'background');
    this.state.start('MainMenu')
  }
};

