Option = function(game, x, y, name){
  Phaser.Sprite.call(this, game, x, y, name)

  // Option shared properties
  game.add.existing(this);
  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.scale.x = .2;
  this.scale.y = .2;
  // Option unique properties
  this.value = 0;
};

Option.prototype = Object.create(Phaser.Sprite.prototype);
Option.prototype.constructor = Option;