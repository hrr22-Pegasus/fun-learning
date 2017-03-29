var GameState3 = GameState3 || {};
GameState3.Level1 = function(game){};

GameState3.Level1.prototype = {


  create: function() {
    //starts the time at 0 once the game is created
    this.game.timerTest = 0;
    //adds a background which is scrollable
    this.background = this.game.add.tileSprite(0, 0, 1200, 1000, 'scrollingSpace');
    //introduces a shape object at the base of the screen
    this.ship = new Ship(this.game, 600, 1000, 'ship');
    //starts the phaser physics engine
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    //array of questions which shifts upon correct answer entry
    this.game.questions = ["a dense organelle present in most eukaryotic cells, typically a single rounded \n structure bounded by a double membrane, containing the genetic material.", "Shares a similar construction motif with the typical eukaryote cell, but does not have centrioles, \n lysosomes, intermediate filaments, cilia, or flagella but does features a cell wall", "a molecule that carries the genetic instructions used in the growth, development, functioning\n and reproduction of all known living organisms and many viruses", "produce the energy currency of the cell, ATP (i.e., phosphorylation of ADP),\n through respiration, and to regulate cellular metabolism.", "a plastid that contains chlorophyll and \n in which photosynthesis takes place.", " a series of flattened, stacked pouches called cisternae, it is responsible for transporting, modifying, \nand packaging proteins", "cells contain a nucleus and other organelles enclosed \n within membranes but no cell wall.", "GAME OVER"];
    //an array of answers which correlates to the same indexed question and shifts on correct responses
    this.game.answers = ["nucleus", "plantCell", "dna", "mitochondria", "chloroplast", "golgiComplex", "animalCell"];

    //these are the individual "answer" properties. It is is given a random x and y position. The value is what is checked upon collision. If it is correct then the object is killed, the question and answer arrays are shifted.
    this.mitochondria = new Enemy(this.game, Math.random()*1200, Math.random()* 800, 'mitochondria');
    this.mitochondria.enableBody = true;
    this.mitochondria.physicsBodyType = Phaser.Physics.ARCADE;
    this.mitochondria.value = "mitochondria";


    //these are the individual "answer" properties. It is is given a random x and y position. The value is what is checked upon collision. If it is correct then the object is killed, the question and answer arrays are shifted.
    this.chloroplast = new Enemy(this.game, Math.random()*1200, Math.random()*800, 'chloroplast');
    this.chloroplast.enableBody = true;
    this.chloroplast.physicsBodyType = Phaser.Physics.ARCADE;
    this.chloroplast.value = "chloroplast";

    //these are the individual "answer" properties. It is is given a random x and y position. The value is what is checked upon collision. If it is correct then the object is killed, the question and answer arrays are shifted.
    this.animalCell = new Enemy(this.game, Math.random()*1200, Math.random()*800, 'animalCell');
    this.animalCell.enableBody = true;
    this.animalCell.physicsBodyType = Phaser.Physics.ARCADE;
    this.animalCell.value = "animalCell";


    //these are the individual "answer" properties. It is is given a random x and y position. The value is what is checked upon collision. If it is correct then the object is killed, the question and answer arrays are shifted.
    this.plantCell = new Enemy(this.game, Math.random()*1200, Math.random()*800, 'plantCell');
    this.plantCell.enableBody = true;
    this.plantCell.physicsBodyType = Phaser.Physics.ARCADE;
    this.plantCell.value = "plantCell";

    //these are the individual "answer" properties. It is is given a random x and y position. The value is what is checked upon collision. If it is correct then the object is killed, the question and answer arrays are shifted.
    this.nucleus = new Enemy(this.game, Math.random()*1200, Math.random()*400, 'nucleus');
    this.nucleus.enableBody = true;
    this.nucleus.physicsBodyType = Phaser.Physics.ARCADE;
    this.nucleus.value = "nucleus";

    //these are the individual "answer" properties. It is is given a random x and y position. The value is what is checked upon collision. If it is correct then the object is killed, the question and answer arrays are shifted.


    this.golgicomplex = new Enemy(this.game, Math.random()*1200, Math.random()*800, 'golgiComplex')
    this.golgicomplex.enableBody = true;
    this.golgicomplex.physicsBodyType = Phaser.Physics.ARCADE;
    this.golgicomplex.value = "golgiComplex"

    //these are the individual "answer" properties. It is is given a random x and y position. The value is what is checked upon collision. If it is correct then the object is killed, the question and answer arrays are shifted.

    this.dna = new Enemy(this.game, Math.random()*1200, Math.random()*800, 'dna');
    this.dna.enableBody = true;
    this.dna.physicsBodyType = Phaser.Physics.ARCADE;
    this.dna.value = "dna";


    //creates cursors for the keyboard allowing it to move left and right and fire
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    //adds a group of bullets which all share the following properties.
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(30, 'bullet');
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 1);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);
    this.bulletTime = 0;

    //Here we are setting up our string, number of correct and incorrect questions which are dynamically rendered after points in either category (correct or incorrect) are allocated.
    this.scoreString = 'Score: ';
    this.wrongString = 'Incorrect: ';
    this.game.numWrong = 0;
    this.game.score = 0;
    this.scoreText = this.game.add.text(this.game.world.width - 200, 10, this.scoreString + this.game.score, { font: '34px Arial', fill: '#ff0' });
    this.scoreWrong = this.game.add.text(this.game.world.width - 200, 50, this.wrongString + this.game.numWrong , { font: '34px Arial', fill: '#ff0000' });
    this.questionString = "Question: ";
    this.questionToAsk = this.game.questions[0];
    this.questionText =  this.game.add.text(40, 750,  this.questionString + this.questionToAsk, { font: '24px Arial', fill: '#fff' });

    //this is perhaps a better way of making our answers (instead of defining each separately). I like the way it was done above because it gives you a clear idea of how to modulate the behaviors, respectively.
    // this.answers = this.game.add.group();
    // this.answers.enableBody = true;
    // this.answers.physicsBodyType = Phaser.Physics.ARCADE;

    //this checks the attempts each time a collision happens. If the attempts are greater than 1 for example than points are allocated in the num wrong as to as a correct answer. The user can still attempt to get the question right but has in
    this.game.attempts = 0;
    this.moveAnswers();
  },

  update: function() {

    //on update (which occurs at 60fps), this scrolls the background upwards.
    this.background.tilePosition.y += 2;

    //timer is incremented by 1 every update; so when exporting by the time, since it is updating at 60fps, we divide by 60
    this.game.timerTest +=1;
    //checking if this ship is alive is mainly important if somehow your enemies or answers can attack you, but it is still working because the ship never dies at the moment!
    if (this.ship.alive) {
      //neutral velocity if no cursor is pressed
      this.ship.body.velocity.setTo(0, 0);


      if (this.cursors.left.isDown) {
        //moves at 400 velocity to the left
        this.ship.body.velocity.x = -400;
        //moves 400 to the right
      } else if (this.cursors.right.isDown) {
        this.ship.body.velocity.x = 400;
      }
      if (this.fireButton.isDown) {
        //fires a bullet
        this.fireBullet();
      }
      if (this.game.time.now > this.firingTimer) {
        this.enemyFires();
      }
    }

    //this checks for collision every time update happens. A collision is essentially defined as overlap between two elements, in this case the bullet and the enemy.
    this.game.physics.arcade.overlap(this.bullets, this.mitochondria, this.collisionHandlerMitochondria, null, this);
    this.game.physics.arcade.overlap(this.bullets, this.chloroplast, this.collisionHandlerChloroplast, null, this);
    this.game.physics.arcade.overlap(this.bullets, this.nucleus, this.collisionHandlerNucleus, null, this);
    this.game.physics.arcade.overlap(this.bullets, this.animalCell, this.collisionHandlerAnimalCell, null, this);
    this.game.physics.arcade.overlap(this.bullets, this.plantCell, this.collisionHandlerPlantCell, null, this);
    this.game.physics.arcade.overlap(this.bullets, this.nucleus, this.collisionHandlerNucleus, null, this);
    this.game.physics.arcade.overlap(this.bullets, this.dna, this.collisionHandlerDna, null, this);
    this.game.physics.arcade.overlap(this.bullets, this.golgicomplex, this.collisionHandlerGolgiComplex, null, this);
  },

  fireBullet: function() {

      //  To avoid them being allowed to fire too fast we set a time limit
    if (this.game.time.now > this.bulletTime) {
          //  Grab the first bullet we can from the pool
      this.bullet = this.bullets.getFirstExists(false);

      if (this.bullet) {
        this.bullet.reset(this.ship.x, this.ship.y + 8);
        this.bullet.body.velocity.y = -1000;
        this.bulletTime = this.game.time.now + 200;
      }
    }


  },

  resetBullet: function(bullet) {
    this.bullet.kill();
  },
  moveAnswers: function() {
    //tweens are basically motion patterns. Here we assign unique motion patterns to each of the elements.
    this.tween = this.game.add.tween(this.chloroplast).to( { x: 200 }, Math.random()*4000+1000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    this.tween2 = this.game.add.tween(this.golgicomplex).to( { x: 200 }, Math.random()*4000+1000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    this.tween3 = this.game.add.tween(this.animalCell).to( { x: 200 }, Math.random()*4000+1000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    this.tween4 = this.game.add.tween(this.plantCell).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    this.tween5 = this.game.add.tween(this.nucleus).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    this.tween6 = this.game.add.tween(this.mitochondria).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1500, true);

    this.tween7 = this.game.add.tween(this.dna).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 2500, true);

  },

  //Each collision handler takes in two parameters, a bullet and an answer/enemy. On collision, if the value is equal to the game answer, it kills the bullet and the answer. If there have been no previous attempts, the positive score is incremented by one. if the answer is incorrect, attempts increases by one and also sets num wrong for that problem. This allows for a user to attempt the game and still try to get the correct answer even if having shot the wrong object.
  collisionHandlerMitochondria: function(bullet, mitochondria) {

    if (this.mitochondria.value === this.game.answers[0]) {
      this.bullet.kill();
      this.mitochondria.kill();
      this.game.questions.shift();
      this.game.answers.shift();

      this.questionToAsk = this.game.questions[0];
      this.questionText.text = this.questionString + this.questionToAsk;
      if (this.game.attempts === 0){
        this.game.score+=1;
        this.scoreText.text = this.scoreString + this.game.score;

      }
      this.game.attempts = 0;
      if (this.game.questions[0] === "GAME OVER") {
        this.sendGameData();
      }

    } else {
      this.bullet.kill();
      this.game.attempts +=1;
      if (this.game.attempts ===1) {
        this.game.numWrong +=1;
        this.scoreWrong.text = this.wrongString + this.game.numWrong;
      }
    }




  },
  collisionHandlerChloroplast: function(bullet, chloroplast) {

    if (this.chloroplast.value === this.game.answers[0]) {
      this.bullet.kill();
      this.chloroplast.kill();
      this.game.questions.shift();
      this.game.answers.shift();

      this.questionToAsk = this.game.questions[0];
      this.questionText.text = this.questionString + this.questionToAsk;
      if (this.game.attempts === 0){
        this.game.score+=1;
        this.scoreText.text = this.scoreString + this.game.score;

      }
      this.game.attempts = 0;
      if (this.game.questions[0] === "GAME OVER") {
        this.sendGameData();
      }

    } else {
      this.bullet.kill();
      this.game.attempts +=1;
      if (this.game.attempts ===1) {
        this.game.numWrong +=1;
        this.scoreWrong.text = this.wrongString + this.game.numWrong;
      }
    }
  },
  collisionHandlerAnimalCell: function(bullet, animalCell) {

    if (this.animalCell.value === this.game.answers[0]) {
      this.bullet.kill();
      this.animalCell.kill();
      this.game.questions.shift();
      this.game.answers.shift();

      this.questionToAsk = this.game.questions[0];
      this.questionText.text = this.questionString + this.questionToAsk;
      if (this.game.attempts === 0){
        this.game.score+=1;
        this.scoreText.text = this.scoreString + this.game.score;

      }
      this.game.attempts = 0;
      if (this.game.questions[0] === "GAME OVER") {
        this.sendGameData();
      }

    } else {
      this.bullet.kill();
      this.game.attempts +=1;
      if (this.game.attempts ===1) {
        this.game.numWrong +=1;
        this.scoreWrong.text = this.wrongString + this.game.numWrong;
      }
    }
  },
  collisionHandlerPlantCell: function(bullet, plantCell) {

    if (this.plantCell.value === this.game.answers[0]) {
      this.bullet.kill();
      this.plantCell.kill();
      this.game.questions.shift();
      this.game.answers.shift();

      this.questionToAsk = this.game.questions[0];
      this.questionText.text = this.questionString + this.questionToAsk;
      if (this.game.attempts === 0){
        this.game.score+=1;
        this.scoreText.text = this.scoreString + this.game.score;
      }
      this.game.attempts = 0;
      if (this.game.questions[0] === "GAME OVER") {
        this.sendGameData();
      }

    } else {
      this.bullet.kill();
      this.game.attempts +=1;
      if (this.game.attempts ===1) {
        this.game.numWrong +=1;
        this.scoreWrong.text = this.wrongString + this.game.numWrong;
      }
    }
  },
  collisionHandlerDna: function(bullet, dna) {

    if (this.dna.value === this.game.answers[0]) {
      this.bullet.kill();
      this.dna.kill();
      this.game.questions.shift();
      this.game.answers.shift();

      this.questionToAsk = this.game.questions[0];
      this.questionText.text = this.questionString + this.questionToAsk;
      if (this.game.attempts === 0){
        this.game.score+=1;
        this.scoreText.text = this.scoreString + this.game.score;
      }
      this.game.attempts = 0;
      if (this.game.questions[0] === "GAME OVER") {
        this.sendGameData();
      }

    } else {
      this.bullet.kill();
      this.game.attempts +=1;
      if (this.game.attempts ===1) {
        this.game.numWrong +=1;
        this.scoreWrong.text = this.wrongString + this.game.numWrong;
      }
    }
  },
  collisionHandlerGolgiComplex: function(bullet, golgicomplex) {

    if (this.golgicomplex.value === this.game.answers[0]) {
      this.bullet.kill();
      this.golgicomplex.kill();
      this.game.questions.shift();
      this.game.answers.shift();

      this.questionToAsk = this.game.questions[0];
      this.questionText.text = this.questionString + this.questionToAsk;
      if (this.game.attempts === 0){
        this.game.score+=1;
        this.scoreText.text = this.scoreString + this.game.score;
      }
      this.game.attempts = 0;
      if (this.game.questions[0] === "GAME OVER") {
        this.sendGameData();
      }

    } else {
      this.bullet.kill();
      this.game.attempts +=1;
      if (this.game.attempts ===1) {
        this.game.numWrong +=1;
        this.scoreWrong.text = this.wrongString + this.game.numWrong;
      }
    }
  },
  collisionHandlerNucleus: function(bullet, nucleus) {

    if (this.nucleus.value === this.game.answers[0]) {
      this.bullet.kill();
      this.nucleus.kill();
      this.game.questions.shift();
      this.game.answers.shift();

      this.questionToAsk = this.game.questions[0];
      this.questionText.text = this.questionString + this.questionToAsk;
      if (this.game.attempts === 0){
        this.game.score+=1;
        this.scoreText.text = this.scoreString + this.game.score;

      }
      this.game.attempts = 0;
      if (this.game.questions[0] === "GAME OVER") {
        this.sendGameData();
      }

    } else {
      this.bullet.kill();
      this.game.attempts +=1;
      if (this.game.attempts ===1) {
        this.game.numWrong +=1;
        this.scoreWrong.text = this.wrongString + this.game.numWrong;
      }
    }
  },

  sendGameData: function () {
  // creates data object containing all the data gathered by this game
    var data = {
      'livesUsed': 0,
      'time': parseInt(this.game.timerTest)/60,
      'pointsScored': this.game.score,
      'pointsAvailable': 7,
      'feeling': 0
    };

  //calls the gameover state to finish gathering data
    this.game.state.start('GameOver', null, null, data);
  }

};

