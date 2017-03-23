var GameState = GameState || {};

GameState.Preload = function(game){};

GameState.Preload.prototype = {

  preload: function(){
    this.avatarPath = this.getAvatar();
    console.log("importing avatar...", this.avatarPath);
    //place all the booted items on the screen
    this.load.image('background', 'assets/forrest_background.png');
    this.load.spritesheet('kanye', this.avatarPath, 870/10, 166, 20,1,1);
    this.load.image('ghost', 'assets/apple.png');

  },
  create: function(){
    // this.background = game.add.sprite(0,0, 'background');
    this.state.start('MainMenu')
  }
};

