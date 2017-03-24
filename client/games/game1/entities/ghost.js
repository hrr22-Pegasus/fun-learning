Ghost = function(game, x, y, name){
  Phaser.Sprite.call(this, game, x, y, name)

  //player shared properties
  game.add.existing(this);
  game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.collideWorldBounds = true;
  // this.body.gravity.y = 200;
  this.anchor.setTo(0.5, 0.5);

  //Ghost unique properties
  this.speed = 100;
  this.maxSpeed = 300;
  this.physicsBodyType = Phaser.Physics.ARCADE;

  this.moving = false;

  this.equation = "";
  this.sum = 0


  this.style = { font: "12px Arial", fill: "#ffffff" };
  this.equation_text = this.game.add.text(-30, 10, this.equation, this.style);
  this.addChild(this.equation_text);
};

Ghost.prototype = Object.create(Phaser.Sprite.prototype);
Ghost.prototype.constructor = Ghost;

Ghost.prototype.setEquation = function(variable1, variable2){
      this.equation = "" + variable1 + " + " + variable2 + " = ";
      this.sum = variable1 + variable2;
      this.equation_text.text = this.equation;
  }

Ghost.prototype.moveToPlayer = function(player){
  console.log("protoype move to player function");
  this.game.physics.arcade.moveToObject(this, player, 120);
}

Ghost.prototype.checkValue = function(guess){
  console.log("checking: ", guess, " :vs: ", this.sum);
  if(guess.length === this.sum.toString().length){
    if(parseInt(guess) === this.sum){
      console.log("they are equal!")

      this.kill()
      return true;
    }
  }
  return false;
}




