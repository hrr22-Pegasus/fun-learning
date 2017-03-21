var GameState = GameState || {};

GameState.Boot = function(game){};

GameState.Boot = {
  preload: function(){
    this.game.stage.backgroundColor = '#ADD8E6'
  },
  create: function(){
    // this.background = game.add.sprite(0,0, 'background');
    this.state.start('Preload')
  }


};