var GameState = GameState || {};

GameState.Level1 = {
  // preload: function(){}, //already did this
  create: function(){
    this.background = this.game.add.sprite(0, 0, 'background');
    this.kanye = new Player(this.game, 500, 350, 'kanye');
    this.ghost = new Ghost(this.game, 0, 350, 'ghost');


    this.test = [[0,1], [5,5], [3,3], [0,0]];

    ghostsGroup = new GhostsGroup(this.game, this.test);
    console.log("ghostsGroup", ghostsGroup);



    this.variable1 = 0
    this.variable2 = 0
    this.sum = this.variable1 + this.variable2;

    this.score = 0;
    this.guess = "";

    this.timer = this.game.time.create();
    this.timerEvent = this.timer.add(Phaser.Timer.SECOND * 10, this.endTimer, this);
    this.timer.start();


    this.variable1_text = this.game.add.text(this.game.width/2, this.game.height/2, this.variable1, { fontSize: '14px', fill: '#000' });

    this.operator_text = this.game.add.text(this.game.width/2 + 15, this.game.height/2, '+', { fontSize: '14px', fill: '#000' });

    this.variable2_text = this.game.add.text(this.game.width/2 + 30, this.game.height/2, this.variable2, { fontSize: '14px', fill: '#000' });

    this.equals_text = this.game.add.text(this.game.width/2 + 45, this.game.height/2, '=', { fontSize: '14px', fill: '#000' });

    this.userAnswer_text = this.game.add.text(this.game.width/2 + 60, this.game.height/2, this.guess, { fontSize: '14px', fill: '#000' });

    this.score_text = this.game.add.text(this.game.width/2, this.game.height/2 + 100, 'Score:' + this.score, { fontSize: '14px', fill: '#000' });

  },

  update: function(){
    this.game.physics.arcade.overlap(this.kanye, this.ghost, this.ghostCollisionHandler);

    if(this.input.keyboard.pressEvent && this.timer.running){
      this.enemyFires();
      this.ev = this.input.keyboard.pressEvent
      console.log("Key event: ", this.ev);
      console.log("Key event key: ", this.ev.key );
      this.addKeyToGuessString(this.ev.key);
      this.userAnswer_text.text = this.guess

    }
    this.input.keyboard.pressEvent = null;
  },
  render: function(){
    if (this.timer.running) {
      this.game.debug.text(Math.round((this.timerEvent.delay - this.timer.ms) / 1000), 2, 14, "#ff0");
    }
  },

  shuffleFunction: function(){
    this.variable1 = Math.floor( (Math.random() * 10) );
    this.variable2 = Math.floor( (Math.random() * 10) );
    this.sum = this.variable1 + this.variable2;
  },

  updateText: function(){
    this.variable1_text.text = this.variable1;
    this.variable2_text.text = this.variable2;
    this.userAnswer_text.text = this.guess;
    this.score_text.text = "Score: " + this.score;
  },

  clearText: function(){
    this.variable1_text.text = 'Game Over';
    this.variable2_text.text = '';
    this.operator_text.text = ''
    this.equals_text.text = ''
    this.userAnswer_text.text = '';
  },

  addKeyToGuessString: function(keyPressed){

    this.guess += keyPressed;

    if(this.guess.length < this.sum.toString().length){
      this.updateText();

    } else if (this.guess.length === this.sum.toString().length){

      if(this.guess == this.sum){
        this.score += 1;
        this.shuffleFunction();
        this.updateText();
        console.log("MATCH");
      }
      this.guess = '';

    } else {
      this.guess = '';
    }
  },
  endTimer: function() {
    // Stop the timer when the delayed event triggers
    console.log("Times Up");
    this.clearText();
    this.timer.stop();
    //send results off
  },

  enemyFires: function(){
    this.game.physics.arcade.moveToObject(this.ghost,this.kanye,120);
  },

  ghostCollisionHandler: function(player, ghost){
  console.log("player in collision", player);
  console.log("player in collision", player);
  ghost.kill();
  }

};