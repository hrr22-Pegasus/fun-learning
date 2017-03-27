var GameState2 = GameState2 || {};
GameState2.Boot = function(game) {};

GameState2.Boot.prototype = {
  preload: function() {
    this.game.stage.backgroundColor = '#add8e6'
  },
  create: function() {
    // sets game state to Preload
    this.state.start('Preload');
  }
};