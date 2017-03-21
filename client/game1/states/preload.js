var GameState = GameState || {};

GameState.Preload = function(game){};

GameState.Preload = {
  preload: function(){
    //place all the booted items on the screen
    this.load.image('background', 'assets/forrest_background.png');
    this.load.spritesheet('kanye', '../assets/bear_animation_test_real_panda.png',870/10,166, 20,1,1);
    //this.load.setPreloadSprite(this.preloadBar);

  },
  create: function(){
    // this.background = game.add.sprite(0,0, 'background');
    this.state.start('MainMenu')
  }


};