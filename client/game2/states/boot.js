var GameState2 = GameState2 || {};
GameState2.Boot = function(game) {};

GameState2.Boot.prototype = {
  init: function(custom) {

  },
  preload: function() {
    this.game.stage.backgroundColor = '#add8e6'
  },
  create: function() {
    this.state.start('Preload');
  }
};