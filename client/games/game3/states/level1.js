var GameState3 = GameState3 || {};
GameState3.Level1 = function(game){};

GameState3.Level1.prototype = {


  create: function() {
    this.game.timerTest = 0;
    this.background = this.game.add.tileSprite(0, 0, 1200, 1000, 'scrollingSpace');
    this.ship = new Ship(this.game, 600, 1000, 'ship');
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.questions = ["a dense organelle present in most eukaryotic cells, typically a single rounded \n structure bounded by a double membrane, containing the genetic material.", "Shares a similar construction motif with the typical eukaryote cell, but does not have centrioles, \n lysosomes, intermediate filaments, cilia, or flagella but does features a cell wall", "a molecule that carries the genetic instructions used in the growth, development, functioning\n and reproduction of all known living organisms and many viruses", "produce the energy currency of the cell, ATP (i.e., phosphorylation of ADP),\n through respiration, and to regulate cellular metabolism.", "a plastid that contains chlorophyll and \n in which photosynthesis takes place.", " a series of flattened, stacked pouches called cisternae, it is responsible for transporting, modifying, \nand packaging proteins", "cells contain a nucleus and other organelles enclosed \n within membranes but no cell wall.", "GAME OVER"],
    this.game.answers = ["nucleus", "plantCell", "dna", "mitochondria", "chloroplast", "golgiComplex", "animalCell"];


    this.mitochondria = new Enemy(this.game, Math.random()*1200, Math.random()* 800, 'mitochondria');
    this.mitochondria.enableBody = true;
    this.mitochondria.physicsBodyType = Phaser.Physics.ARCADE;
    this.mitochondria.value = "mitochondria";



    this.chloroplast = new Enemy(this.game, Math.random()*1200, Math.random()*800, 'chloroplast');
    this.chloroplast.enableBody = true;
    this.chloroplast.physicsBodyType = Phaser.Physics.ARCADE;
    this.chloroplast.value = "chloroplast";


    this.animalCell = new Enemy(this.game, Math.random()*1200, Math.random()*800, 'animalCell');
    this.animalCell.enableBody = true;
    this.animalCell.physicsBodyType = Phaser.Physics.ARCADE;
    this.animalCell.value = "animalCell";



    this.plantCell = new Enemy(this.game, Math.random()*1200, Math.random()*800, 'plantCell');
    this.plantCell.enableBody = true;
    this.plantCell.physicsBodyType = Phaser.Physics.ARCADE;
    this.plantCell.value = "plantCell";


    this.nucleus = new Enemy(this.game, Math.random()*1200, Math.random()*400, 'nucleus');
    this.nucleus.enableBody = true;
    this.nucleus.physicsBodyType = Phaser.Physics.ARCADE;
    this.nucleus.value = "nucleus"




    this.golgicomplex = new Enemy(this.game, Math.random()*1200, Math.random()*800, 'golgiComplex')
    this.golgicomplex.enableBody = true;
    this.golgicomplex.physicsBodyType = Phaser.Physics.ARCADE;
    this.golgicomplex.value = "golgiComplex"



    this.dna = new Enemy(this.game, Math.random()*1200, Math.random()*800, 'dna');
    this.dna.enableBody = true;
    this.dna.physicsBodyType = Phaser.Physics.ARCADE;
    this.dna.value = "dna"



    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(30, 'bullet');
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 1);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);
    this.bulletTime = 0;
    this.scoreString = 'Score: ';
    this.wrongString = 'Incorrect: ';
    this.game.numWrong = 0;
    this.game.score = 0;
    this.scoreText = this.game.add.text(this.game.world.width - 200, 10, this.scoreString + this.game.score, { font: '34px Arial', fill: '#ff0' });
    this.scoreWrong = this.game.add.text(this.game.world.width - 200, 50, this.wrongString + this.game.numWrong , { font: '34px Arial', fill: '#ff0000' });
    this.questionString = "Question: ";
    this.questionToAsk = this.game.questions[0];
    this.questionText =  this.game.add.text(40, 750,  this.questionString + this.questionToAsk, { font: '24px Arial', fill: '#fff' });


    this.answers = this.game.add.group();
    this.answers.enableBody = true;
    this.answers.physicsBodyType = Phaser.Physics.ARCADE;

    this.game.attempts = 0;
    this.moveAnswers();
  },

  update: function() {

    this.background.tilePosition.y += 2;

    this.game.timerTest +=1;
    console.log(this.game.timerTest/60);

    if (this.ship.alive) {
      this.ship.body.velocity.setTo(0, 0);

      if (this.cursors.left.isDown) {
        this.ship.body.velocity.x = -400;
      } else if (this.cursors.right.isDown) {
        this.ship.body.velocity.x = 300;
      }
      if (this.fireButton.isDown) {
        this.fireBullet();
      }
      if (this.game.time.now > this.firingTimer) {
        this.enemyFires();
      }
    }

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
    this.tween = this.game.add.tween(this.chloroplast).to( { x: 200 }, Math.random()*4000+1000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    this.tween2 = this.game.add.tween(this.golgicomplex).to( { x: 200 }, Math.random()*4000+1000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    this.tween3 = this.game.add.tween(this.animalCell).to( { x: 200 }, Math.random()*4000+1000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    this.tween4 = this.game.add.tween(this.plantCell).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    this.tween5 = this.game.add.tween(this.nucleus).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    this.tween6 = this.game.add.tween(this.mitochondria).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1500, true);

    this.tween7 = this.game.add.tween(this.dna).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 2500, true);

  },


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

