var Game = {};

Game.MainMenu = function(game){};

Game.MainMenu.prototype = {
  preload: function(){
    this.load.image( 'background', '../assets/forrest_background.png');
    this.load.image( 'zero', '../assets/mnist-digits-0.png');
    this.load.spritesheet('kanye', '../assets/bear_animation_test_real_panda.png',870/10,166, 20,1,1);

    this.fallingTimer = 0;
    this.countDownClock = 10;
    this.kanyeScoreText;

    this.variable1;
    this.variable2;
    this.sum;
    this.points = 2174;
    this.resultsSent = false;

  },
  create: function(game){
    this.background = game.add.sprite(0, 0, 'background');
    this.zero = game.add.sprite(100, 100, 'zero');
    this.zero.enableBody = true;
    game.physics.enable(this.zero, Phaser.Physics.ARCADE);


    this.cursors = game.input.keyboard.createCursorKeys(); //arrow keys
    console.log(this.cursors);

    this.kanye = new Player(game, 500, 350, 'kanye');
    this.walkleft = this.kanye.animations.add('walkleft', [0, 1, 2, 3, 4, 5, 6, 7] , 10, true);
    this.stand = this.kanye.animations.add('stand', [15] , 1, true);


    this.kanyeScoreText = game.add.text(16, 16, 'Timer: 0', { fontSize: '14px', fill: '#000' });
    this.scopeIncrementText = game.add.text(16, 40, '$scope: ', { fontSize: '14px', fill: '#000' });
  },

  update: function(game){

    this.kanye.body.velocity.x = 0;

    if(this.cursors.left.isDown){
      this.kanye.scale.x = 1;
      this.kanye.animations.play('walkleft');
      this.kanye.body.velocity.x = -this.kanye.speed;
    };

    if(this.cursors.right.isDown){
      this.kanye.scale.x = -1;
      this.kanye.animations.play('walkleft');
      this.kanye.body.velocity.x = this.kanye.speed;
    };


    if(!this.cursors.right.isDown && !this.cursors.left.isDown){
      this.kanye.animations.play('stand');
    };

    if(this.fallingTimer < 10000){
      if (game.time.now > this.fallingTimer){
        console.log(this.fallingTimer);
        this.kanyeScoreText.text = "Timer: " + this.countDownClock;
        this.scopeIncrementText.text = "$Scope: ";
        this.fallingTimer += 1000;
        this.addScore();

      }
    } else {
      // GameResultsFactory.test();
      if(!this.resultsSent){
        console.log("sending Results", this.points)
        this.saveResults(this.points);
        this.sendResults();
        this.resultsSent = true;
      }
      console.log("times up");

    }
  },

  addScore: function(){
    this.countDownClock -=1;
  }

};

