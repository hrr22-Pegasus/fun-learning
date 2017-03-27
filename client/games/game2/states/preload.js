var GameState2 = GameState2 || {};

GameState2.Preload = function(game){};

GameState2.Preload.prototype = {

  preload: function(){
    // loads the image files for assessing the feelings at the end of the game
    this.load.image('option1', 'assets/score1.png');
    this.load.image('option2', 'assets/score2.png');
    this.load.image('option3', 'assets/score3.png');
    this.load.image('option4', 'assets/score4.png');
    this.load.image('option5', 'assets/score5.png');
  },
  create: function(){
    // sets the game state to mainmenu
    this.state.start('MainMenu')
  }
};
