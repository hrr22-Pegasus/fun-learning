var GameState2 = GameState2 || {};
GameState2.MainMenu = function(game){};


GameState2.MainMenu.prototype = {
  create: function(){
    var text = "Tap to begin";
    var style = { font: "36px Arial", fill: "#fff", align: "center" };
    var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
    t.anchor.set(0.5);
  },
  update: function(){
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('Level1');
      console.log("game started");
    }
  }
};