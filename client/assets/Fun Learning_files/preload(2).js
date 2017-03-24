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
    this.load.image('golgiComplex', 'assets/golgiComplex.png');
    this.load.image('dna', 'assets/dnaHelix.gif');
    this.load.image('animalCell', 'assets/animalCell.png');
    this.load.image('plantCell', 'assets/plantCell.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.spritesheet('explosions', 'assets/explosions.png', 128, 128, 48);
    this.load.image('enemy', 'http://4.bp.blogspot.com/-jCa_EMObS3U/T_CzRXp0PkI/AAAAAAAAAik/M3PBS1dagbM/s400/Crawfish_attack.gif')

    //this.load.setPreloadSprite(this.preloadBar);

  },
  create: function(){
    // this.background = game.add.sprite(0,0, 'background');
    this.state.start('MainMenu')
  }
};

