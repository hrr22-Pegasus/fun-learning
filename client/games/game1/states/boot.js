var GameState = GameState || {};

GameState.Boot = {
  // init: function(custom){
  //   this.avatarPath = custom;
  //   console.log("custom var in Boot", custom);
  // },
  preload: function(){
    this.game.stage.backgroundColor = '#ADD8E6'
  },
  create: function(){
    // this.background = game.add.sprite(0,0, 'background');
    this.state.start('Preload')
  }


};