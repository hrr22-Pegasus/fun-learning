var GameState3 = GameState3 || {};
GameState3.Level1 = function(game){};

GameState3.Level1.prototype = {
  // preload: function(){}, //already did this
  create: function(){
    this.background = this.game.add.tileSprite(0, 0, 1600, 1200, 'scrollingSpace');
    this.ship = new Ship(this.game, 800, 1200, 'ship');
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.questions = ["The brain of the cell", "nucleus"]


    this.mitochondria = new Enemy(this.game, Math.random()*1600, Math.random()* 800, 'mitochondria');

     this.mitochondria.enableBody = true;
    this.mitochondria.physicsBodyType = Phaser.Physics.ARCADE;


    this.chloroplast = new Enemy(this.game, Math.random()*1600, Math.random()*800, 'chloroplast');
    this.chloroplast.enableBody = true;
    this.chloroplast.physicsBodyType = Phaser.Physics.ARCADE;

    this.animalCell = new Enemy(this.game, Math.random()*1600, Math.random()*800, 'animalCell');
    this.animalCell.enableBody = true;
    this.animalCell.physicsBodyType = Phaser.Physics.ARCADE;



    this.plantCell = new Enemy(this.game, Math.random()*1600, Math.random()*800, 'plantCell');
    this.plantCell.enableBody = true;
    this.plantCell.physicsBodyType = Phaser.Physics.ARCADE;

    this.nucleus = new Enemy(this.game, Math.random()*1600, Math.random()*400, 'nucleus');
    this.nucleus.enableBody = true;
    this.nucleus.physicsBodyType = Phaser.Physics.ARCADE;
    this.nucleus.value = "nucleus"




    this.golgicomplex = new Enemy(this.game, Math.random()*1600, Math.random()*800, 'golgiComplex')
    this.golgicomplex.enableBody = true;
    this.golgicomplex.physicsBodyType = Phaser.Physics.ARCADE;


    this.dna = new Enemy(this.game, Math.random()*1600, Math.random()*800, 'dna');
    this.dna.enableBody = true;
    this.dna.physicsBodyType = Phaser.Physics.ARCADE;



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
    this.score = 0;
    this.scoreText = this.game.add.text(this.game.world.width - 200, 10, this.scoreString + this.score, { font: '34px Arial', fill: '#fff' });
    this.game.add.text(this.game.world.width - 200, 1100, 'Question : ', { font: '34px Arial', fill: '#fff' });

    this.answers = this.game.add.group();
    this.answers.enableBody = true;
    this.answers.physicsBodyType = Phaser.Physics.ARCADE;


    this.moveAnswers();
  },

  update: function() {

    this.background.tilePosition.y += 2;


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


  collisionHandlerMitochondria: function(bullet, mitochondria, animalCell,chloroplast) {
    this.bullet.kill();
    this.mitochondria.kill();
    this.score+=1;
    this.scoreText.text = this.scoreString + this.score
    console.log("Collision!");

  },
  collisionHandlerChloroplast: function(bullet, chloroplast) {
    this.bullet.kill();
    this.chloroplast.kill();
    this.score+=1;
    console.log("Collision!");
    this.scoreText.text = this.scoreString + this.score
  },
  collisionHandlerAnimalCell: function(bullet, animalCell) {
    this.bullet.kill();
    this.animalCell.kill();
    this.score+=1;
    console.log("Collision!");
    this.scoreText.text = this.scoreString + this.score;
  },
  collisionHandlerPlantCell: function(bullet, plantCell) {
    this.bullet.kill();
    this.plantCell.kill();
    this.score+=1;
    console.log("Collision!");
    this.scoreText.text = this.scoreString + this.score;
  },
  collisionHandlerDna: function(bullet, dna) {
    this.bullet.kill();
    this.dna.kill();
    this.score+=1;
    console.log("Collision!");
    this.scoreText.text = this.scoreString + this.score;
  },
  collisionHandlerGolgiComplex: function(bullet, golgicomplex) {
    this.bullet.kill();
    this.golgicomplex.kill();
    this.score+=1;
    console.log("Collision!");
    this.scoreText.text = this.scoreString + this.score;
  },
  collisionHandlerNucleus: function(bullet, nucleus) {
    this.bullet.kill();
    this.nucleus.kill();
    this.score+=1;
    console.log("Collision!");
    this.scoreText.text = this.scoreString + this.score;
  }

};

