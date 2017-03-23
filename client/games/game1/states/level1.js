var GameState = GameState || {};
GameState.Level1 = function(game){};

GameState.Level1.prototype = {
  // preload: function(){}, //already did this
  create: function(){
    this.gameName = 'game1'
    this.background = this.game.add.sprite(0, 0, 'background');
    this.kanye = new Player(this.game, 500, 350, 'kanye');

    // this.teacher = this.getTeacher();
    // console.log("first import of teacher", this.teacher);

    this.test = this.getTestByTeacher()
    console.log("first import of test", this.test);

    // this.test = [[0,1], [5,5], [3,3], [0,0]];

    this.textStyle = { font: '25px Desyrel', align: 'center'}
    this.time = this.game.add.text(0, 40, '0', this.textStyle);
    this.seconds = 0;


    this.gameStarted = false;
    this.gameEnded = false;

    this.variable1 = this.test[0][0];
    this.variable2 = this.test[0][1];
    this.sum = this.variable1 + this.variable2
    this.answers = [];


    this.equation = "";
    this.guess = "";
    this.pointsScored = 0;
    this.pointsAvailable = this.test.length;


    this.equation_text = this.game.add.text(
      this.game.width/2,
      this.game.height/2,
      this.equation,
      { fontSize: '14px', fill: '#000' }
    );

    this.guess_text = this.game.add.text(
      this.game.width/2 + 50,
      this.game.height/2,
      this.guess,
      { fontSize: '14px', fill: '#000' }
    );

    this.pointsScored_text = this.game.add.text(
      this.game.width/2,
      this.game.height/2 + 100,
      "Score: " + this.pointsScored,
      { fontSize: '14px', fill: '#000' }
    );
  },

  update: function(){
    this.updateTimer();

    if(this.input.keyboard.pressEvent && !this.gameEnded){
      if(!this.gameStarted){
        this.setVariables();
        this.createEquation();
        this.gameStarted = true;
      } else {

        this.ev = this.input.keyboard.pressEvent
        this.addKeyToGuessString(this.ev.key);

        if(this.guess.length === this.sum.toString().length){
          if(this.correctAnswer()){
            this.pointsScored += 1;
            this.answers.push(1);
          } else {
            this.answers.push(0);
          }
          this.guess = "";
          this.test.shift();
          console.log("test array", this.test);
          this.setVariables();
          this.createEquation();
        }
      }
    }
    this.input.keyboard.pressEvent = null;
  },

  correctAnswer: function(){
    return parseInt(this.guess) === this.sum;
  },


  updateTimer: function(){
    var seconds = Math.floor(this.game.time.time / 1000) % 60
    this.time.text = seconds;
    this.renderText()
  },

  createEquation: function(){
    if(this.test[0]){
      this.equation = "" + this.variable1 + " + " + this.variable2 + " = ";
      this.sum = this.variable1 + this.variable2;
      // this.equation_text.text = this.equation;
      this.renderText();
    }
  },

  // randomizeVariables: function(){
  //   this.variable1 = Math.floor(Math.random() * 10);
  //   this.variable2 = Math.floor(Math.random() * 10);
  // },

  setVariables: function(){
    if(this.test[0]){
      this.variable1 = this.test[0][0];
      this.variable2 = this.test[0][1];
      this.renderText();
    } else {
      this.gameOver();
    }
  },

  addKeyToGuessString: function(key){
    this.guess += key;
    console.log("this.guess after adding key: ", this.guess)
    this.renderText()
  },
  renderText: function(){
    this.equation_text.text = this.equation;
    this.guess_text.text = this.guess;
    this.pointsScored_text.text = "Score: " + this.pointsScored;
  },

  gameOver: function(){
    this.gameEnded = true;
    this.equation_text.text = "YOU WON";
    this.guess_text.text = "";
    this.renderText();

    console.log("Game Over");
    // this.saveResults(
    //   {
    //     "time": this.time,
    //     "pointsScored": this.pointsScored,
    //     "pointsAvailable": this.pointsAvailable,
    //     "answers": this.answers,
    //     "feeling": 3
    //   }
    //   );
    // this.sendResults()

  }



};

