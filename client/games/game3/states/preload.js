var GameState3 = GameState3 || {};

GameState3.Preload = function(game){};

GameState3.Preload.prototype = {

  preload: function(){
    //place all the booted items on the screen
    this.load.image('backgroundImage', 'assets/dnaSpace.png');
    this.load.image('mitochondria', 'assets/mitochondria.png');
    this.load.image('chloroplast', 'assets/chloroplast.png');
    this.load.image('nucleus','assets/nucleus.png');
    this.load.image('ship', 'assets/milleniumFalconShip.png');
    this.load.image('scrollingSpace', 'assets/scrollingSpace.png');
    this.load.image('golgiComplex', 'assets/golgicomplex.png');
    this.load.image('dna', 'assets/dnaHelix.gif');
    this.load.image('animalCell', 'assets/animalcell.png');
    this.load.image('plantCell', 'assets/plantCell.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.spritesheet('explosions', 'assets/explosions.png', 128, 128, 48);
    this.load.image('option1', 'assets/score1.png');
    this.load.image('option2', 'assets/score2.png');
    this.load.image('option3', 'assets/score3.png');
    this.load.image('option4', 'assets/score4.png');
    this.load.image('option5', 'assets/score5.png');

    //this.load.setPreloadSprite(this.preloadBar);

  },
  create: function(){
    // this.background = game.add.sprite(0,0, 'background');
    this.state.start('MainMenu')
  }
};

