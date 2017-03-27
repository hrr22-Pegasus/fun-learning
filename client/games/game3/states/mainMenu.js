var GameState3 = GameState3 || {};
GameState3.MainMenu = function(game){};


GameState3.MainMenu.prototype = {
  // preload: function(){}, //already did this
  create: function(){
    this.background = this.game.add.sprite(0,0, 'backgroundImage');

    //start game text
    var text = "Tap to begin";
    var style = { font: "30px Arial", fill: "#fff", align: "center" };
    var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
    t.anchor.set(0.5);
  },

  update: function(){
    if (this.game.input.activePointer.justPressed()) {
      this.game.state.start('Level1');
    }

    if (this.game.input.activePointer.justPressed()) {

      var startTime = this.game.time.now;

      this.game.state.start('Level1', null, null, startTime); //goes through custom of next state
    }

  }




};