var GameState = GameState || {};

GameState.Boot = function(game){};

GameState.Boot.prototype = {

  preload: function(){
    this.game.stage.backgroundColor = '#ADD8E6'
  },
  create: function(){
    this.state.start('Preload');
  }


};