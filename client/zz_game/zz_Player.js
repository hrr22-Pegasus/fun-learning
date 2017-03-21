// Player = function(game, x, y, name){
//   Phaser.Sprite.call(this, game, x, y, name)

//   //player shared properties
//   game.add.existing(this);
//   game.physics.enable(this, Phaser.Physics.ARCADE);
//   this.body.collideWorldBounds = true;
//   this.body.gravity.y = 200;
//   this.anchor.setTo(0.5, 0.5);

//   //Player unique properties
//   this.score = 0;
//   this.speed = 100;
//   this.maxSpeed = 300;

//   this.physicsBodyType = Phaser.Physics.ARCADE;
// };

// Player.prototype = Object.create(Phaser.Sprite.prototype);
// Player.prototype.constructor = Player;