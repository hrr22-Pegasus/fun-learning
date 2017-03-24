Enemy = function(game, x, y, name, value){

Phaser.Sprite.call(this, game, x, y, name)

  //player shared properties
  game.add.existing(this);
  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.collideWorldBounds = true;
  // this.body.gravity.y = 200;
  this.anchor.setTo(0.5, 0.5);

  //Ghost unique properties
  this.speed = Math.random()*100 + 25;
  this.maxSpeed = Math.random()*300 + 25;
  this.physicsBodyType = Phaser.Physics.ARCADE;

};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Ship;