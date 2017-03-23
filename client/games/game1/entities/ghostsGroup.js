GhostsGroup = function (game, test) {
  Phaser.Group.call(this, game);
  this.enableBody = true;
  this.physicsBodyType = Phaser.Physics.ARCADE;

  for (var i = 0; i < test.length; i++){
    var ghost = new Ghost(game, i*100, 10, 'ghost');
    ghost.setEquation(test[i][0], test[i][1]);
    ghost.kill();
    this.add(ghost);

  };

  this.setAll('checkWorldBounds', true);
  this.setAll('body.collideWorldBounds', true);
  this.setAll('body.bounce.y', 0.2);
};

GhostsGroup.prototype = Object.create(Phaser.Group.prototype);
GhostsGroup.prototype.constructor = GhostsGroup;





// Ghost.prototype.setEquation = function(variable1, variable2){
//       this.equation = "" + variable1 + " + " + variable2 + " = ";
//       this.sum = variable1 + variable2;
//       this.equation_text.text = this.equation;
//   }
