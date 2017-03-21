var GameState = GameState || {};

GameState.Preload = function(game){};

GameState.Preload.prototype = {
  init: function(custom){
    this.avatarPath = custom;
    console.log("custom var in Preload", custom);
  },
  preload: function(){
    //place all the booted items on the screen
    this.load.image('background', 'assets/forrest_background.png');
    this.load.spritesheet('kanye', this.avatarPath, 870/10, 166, 20,1,1);
    //this.load.setPreloadSprite(this.preloadBar);

  },
  create: function(){
    // this.background = game.add.sprite(0,0, 'background');
    this.state.start('MainMenu')
  }
};


