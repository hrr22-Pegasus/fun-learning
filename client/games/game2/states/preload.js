var GameState2 = GameState2 || {};

GameState2.Preload = function(game){};

GameState2.Preload.prototype = {
  init: function(custom){
    console.log("custom var in Preload", custom);
  },
  preload: function(){
    //place all the booted items on the screen
    // this.graphics = this.game.add.graphics(this.game.world.centerX, this.game.world.centerY);
    // this.graphics.beginFill(0x876645);
    // this.graphics.arc(0, 0, 90, this.game.math.degToRad(0), this.game.math.degToRad(120), true);
    // this.graphics.endFill();

  },
  create: function(){
    // this.background = game.add.sprite(0,0, 'background');
    this.state.start('MainMenu')
  }
};