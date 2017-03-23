var GameState = GameState || {};

GameState.Level1 = {
  // preload: function(){}, //already did this
  create: function(){
    this.background = this.game.add.sprite(0, 0, 'background');
    this.kanye = new Player(this.game, 500, 350, 'kanye');
    // this.ghost = new Ghost(this.game, 0, 350, 'ghost');


    this.test = [
    [0,1], [5,5], [3,3], [0,0],
    [0,2], [5,4], [6,3], [8,0]
    // [1,1], [4,5], [5,3], [6,0],
    // [0,4], [5,5], [3,3], [0,0],
    // [0,1], [5,5], [3,3], [0,0],
    // [0,1], [5,5], [3,3], [0,0],
    // [0,1], [5,5], [3,3], [0,0],
    // [0,1], [5,5], [3,3], [0,0],
    ];
    this.fallingTimer = 0;

    this.guess = "";
    this.pointsScored = 0;
    this.pointsAvailable = this.test.length;

    this.pointsScored_text = this.game.add.text(
      100,
      100,
      "Score: " + this.pointsScored,
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
      this.reviveFruit();
      this.fallingTimer += 3000;
    };

    for (var i = 0; i < this.ghostsGroup.children.length; i++) {
      // console.log(this.ghostsGroup.children[i]);
      // console.log(this.kanye)
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
            }
          }
    }
    this.input.keyboard.pressEvent = null;
  },

  addKeyToGuessString: function(keyPressed){
    this.guess += keyPressed;
    console.log("current guess: ", this.guess);

  },
  endTimer: function() {
    // Stop the timer when the delayed event triggers
    console.log("Times Up");
    this.clearText();
    this.timer.stop();
    //send results off
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
    ghost.destroy();

  },

  reviveFruit: function(){
  //  Get a dead item
    var ghost = this.ghostsGroup.getFirstDead();
    if (ghost){
      // fruit.reset(game.world.randomX, 10);
      // ghost.moving = false;
      ghost.reset(80, 300);
      // this.game.physics.arcade.moveToObject(this.ghost,this.kanye,120);
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
  }

};