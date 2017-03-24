var GameState3 = GameState3 || {};

GameState3.Boot = function(game){};

GameState3.Boot.prototype = {

  preload: function(){
    this.game.stage.backgroundColor = '#000000'
  },
  create: function(){
    this.state.start('Preload');
  }


};