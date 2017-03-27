var GameState = GameState || {};

GameState.Level1 = function(game){};

GameState.Level1.prototype = {
  // preload: function(){}, //already did this
  init: function(custom){
    console.log("startTime: ", custom);
    this.fallingTimer = custom;
  },
  create: function(){
    this.background = this.game.add.sprite(0, 0, 'background');
    this.kanye = new Player(this.game, 500, 350, 'kanye');
    this.kanyehead = this.game.add.sprite(455, 245, 'kanye-head');

    this.test = this.returnTest("game1", "test2");

    // this.test = [
    // [0,1], [5,5], [3,3], [0,0]
    // // [0,2], [5,4], [6,3], [8,0]
    // // [1,1], [4,5], [5,3], [6,0],
    // // [0,4], [5,5], [3,3], [0,0],
    // // [0,1], [5,5], [3,3], [0,0],
    // // [0,1], [5,5], [3,3], [0,0],
    // // [0,1], [5,5], [3,3], [0,0],
    // // [0,1], [5,5], [3,3], [0,0],
    // ];
    this.pointsAvailable = this.test.length;
    this.questionsAsked = 0;

    this.guess = "";
    this.pointsScored_text = this.game.add.text(
      100,
      100,
      "Score: " + this.kanye.score,
      { fontSize: '14px', fill: '#000' }
    );


    this.ghostsGroup = new GhostsGroup(this.game, this.test);
    console.log("ghostsGroup", this.ghostsGroup);


    this.myInput = this.createInput(this.game.world.centerX, 50);
    this.myInput.anchor.set(0.5);
    this.myInput.canvasInput.value('');


    // this.testText = this.myInput.canvasInput.selectText();

  },

  update: function(){
    // console.log("canvas text", this.myInput.canvasInput._value);
    this.game.physics.arcade.overlap(this.kanye, this.ghost, this.ghostCollisionHandler);
    this.game.physics.arcade.overlap(this.kanye, this.ghostsGroup, this.ghostCollisionHandler);

    if (this.game.time.now > this.fallingTimer){
      this.questionsAsked += 1;
      this.reviveGhost();
      this.updateScore();
      this.fallingTimer += 3000;
    };

    for (var i = 0; i < this.ghostsGroup.children.length; i++) {
      var ghost = this.ghostsGroup.children[i]
      if(ghost.alive && ghost.moving === false){
        ghost.moveToPlayer(this.kanye);
        ghost.moving = true;
      }

    }

    if(this.input.keyboard.pressEvent){
      // this.enemyFires();
      // this.enemyFires(this.ghost);
      // this.ghost.moveToPlayer(this.kanye);

          for (var i = 0; i < this.ghostsGroup.children.length; i++) {
            // console.log(this.ghostsGroup.children[i]);
            // console.log(this.kanye)
            var ghost = this.ghostsGroup.children[i]
            if(ghost.moving){
              this.guess = this.myInput.canvasInput.value();
              ghost.checkValue(this.guess);
              if(ghost.checkValue(this.guess)){
                console.log("MATCHING UPDATE SCORE")
                this.kanye.score += 1;
                this.updateScore();
              }
            }
          }
    }
    this.input.keyboard.pressEvent = null;

    if(this.questionsAsked > this.test.length + 1){
      console.log("game over");
      this.endGame();
    }
  },

  // enemyFires: function(){
  //   this.game.physics.arcade.moveToObject(this.ghost,this.kanye,120);
  // },
  enemyFires: function(ghost){
    this.game.physics.arcade.moveToObject(ghost,this.kanye,60);
  },
  ghostCollisionHandler: function(player, ghost){
    console.log("player in collision", player);
    console.log("ghost in collision", ghost);
    player.score -= 1;
    ghost.destroy();
  },

  updateScore: function(){
    this.pointsScored_text.text = "Score: " + this.kanye.score
  },

  reviveGhost: function(){
  //  Get a dead item
    var ghost = this.ghostsGroup.getFirstDead();
    if (ghost){
      ghost.reset(80, Math.floor(Math.random() * 300));
    }
  },

  inputFocus: function(sprite){
    sprite.canvasInput.focus();
  },
  createInput: function(x, y){
    var bmd = this.add.bitmapData(400, 50);
    var myInput = this.game.add.sprite(x, y, bmd);

    myInput.canvasInput = new CanvasInput({
      canvas: bmd.canvas,
      fontSize: 30,
      fontFamily: 'Arial',
      fontColor: '#212121',
      fontWeight: 'bold',
      width: 400,
      padding: 8,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 3,
      boxShadow: '1px 1px 0px #fff',
      innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
      placeHolder: 'Press "Space" to submit: '
    });
    myInput.inputEnabled = true;
    myInput.input.useHandCursor = true;
    myInput.events.onInputUp.add(this.inputFocus, this);

    return myInput;
  },
  endGame: function () {
    console.log('game ended');

    for (var i = 0; i < this.ghostsGroup.children.length; i++) {
      var ghost = this.ghostsGroup.children[i]
      ghost.kill();
      ghost.destroy();
    }

    this.ghostsGroup.callAll('kill');
    this.kanye.destroy();
    this.kanyehead.destroy();
    this.myInput.destroy();


    var data = {
      'livesUsed': 0,
      'time': 9,
      'pointsScored': 220,
      'pointsAvailable': this.test.length
    };
    this.game.state.start('GameOver', null, null, data);
  }

};