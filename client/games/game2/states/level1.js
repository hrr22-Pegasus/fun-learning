var GameState2 = GameState2 || {};
GameState2.Level1 = function(game) {};

GameState2.Level1.prototype = {
  create: function () {

    // set the data for the game questions and available choices, these three lines could potentially be replaced with a call to the teachers service to get the specific test from the database.
    this.testArray = [[1, 2], [1, 3], [3, 4]];
    this.choices = [['1/2', '3/4', '1/3'], ['5/8', '3/4', '1/3'], ['4/7', '3/4', '2/3']];
    this.answerArray = ['1/2', '1/3', '3/4'];

    // do the equivalent of declaring global variables that will be used throughout the game
    this.game.attempts = 0;
    this.game.score = 0;
    this.game.scoreString = 'Score: ';
    this.game.pointsAvailable = this.answerArray.length;
    this.game.incorrectAnswers = 0;
    this.gameTime = this.testArray.length * 3;


    // add initial graphics and text to the game
    this.graphics = this.game.add.graphics(this.game.world.centerX, this.game.world.centerY);
    this.game.scoreText = this.game.add.text(420, 25, this.game.scoreString + this.game.score, {font: '20px Arial'});
    this.game.add.text(10, 30, 'Choose one: ', {font: '20px Arial'});

    // create function for rendering the game
    this.renderGame = function () {

      // remove old choices from display
      if (this.game.choice1) {
        this.game.choice1.destroy();
        this.game.choice2.destroy();
        this.game.choice3.destroy();
      }

      // add choices to game
      this.game.choice1 = this.game.add.text(150, 25, this.choices[0][0], {font: '20px Arial'});
      this.game.choice2 = this.game.add.text(190, 25, this.choices[0][1], {font: '20px Arial'});
      this.game.choice3 = this.game.add.text(230, 25, this.choices[0][2], {font: '20px Arial'});

      // add answer to game object to retain access once click event fires
      this.game.answer = this.answerArray[0];

      // add click events to choices
      this.game.choice1.inputEnabled = true;
      this.game.choice1.events.onInputDown.add(this.picked1, this);
      this.game.choice2.inputEnabled = true;
      this.game.choice2.events.onInputDown.add(this.picked2, this);
      this.game.choice3.inputEnabled = true;
      this.game.choice3.events.onInputDown.add(this.picked3, this);

      // calculate the percentage of the circle needing to be displayed
      this.percentage = this.testArray[0][0] / this.testArray[0][1];
      this.rad1 = 0;
      // there is an issue with phaser rendering the graphic, adding 6.5 makes the graphic the most consistent across the three different questions
      this.rad2 = Math.round(360 * this.percentage) + 6.5;

      // clear old pie and then draw the new one
      this.graphics.clear();
      this.graphics.beginFill(0x873655);
      this.graphics.arc(0, 0, 180, this.game.math.degToRad(this.rad2), this.game.math.degToRad(this.rad1), true);
      this.graphics.endFill();

      // remove first item from each of the input arrays
        // this is because the preceeding logic always checks the 0th element of each of these arrays
      this.choices.shift();
      this.testArray.shift();
      this.answerArray.shift();
      console.log('timer ran');
    };


    // set renderGame to repeat
    this.repeatTimer = this.game.time.create(false);
    this.repeatTimer.start();
    this.repeatTimer.repeat(Phaser.Timer.SECOND * 3, this.testArray.length - 1, this.renderGame, this);

    // set length of the game
    this.gameLengthTimer = this.game.time.create(false);
    this.gameLengthTimer.start();
    this.gameLengthTimer.add(Phaser.Timer.SECOND * this.testArray.length * 3, this.endOfGame, this);

    // initialize the game
    this.renderGame();
  },
  endOfGame: function () {
      console.log('in endOfGame');
      // sends the results to the database once the game ends
      this.sendGameData();
  },
  picked1: function () {
    // each of these "picked functions" will be run once the click event has happed for the respective user choice and they all do the same things

    // checks if the user picked the right answer
    if (this.game.choice1._text === this.game.answer) {
      // checks if the user has already attempted to answer and got the question wrong last time
      if (!(this.game.attempts > 0)) {
        this.game.score++;
      }
      // adds some color based on if the answer was correct and updates the score text, resets attempts for next set of questions
      this.game.choice1.addColor('#128511', 0);
      this.game.scoreText.text = this.game.scoreString + this.game.score;
      this.game.attempts = 0;
    } else {
      this.game.choice1.addColor('#e31423', 0);
      this.game.incorrectAnswers++;
      this.game.attempts++;
    }

  },
  picked2: function () {

    if (this.game.choice2._text === this.game.answer) {
      if (!(this.game.attempts > 0)) {
        this.game.score++;
      }
      this.game.choice2.addColor('#128511', 0);
      this.game.scoreText.text = this.game.scoreString + this.game.score;
      this.game.attempts = 0;
    } else {
      this.game.choice2.addColor('#e31423', 0);
      this.game.incorrectAnswers++;
      this.game.attempts++;
    }

  },
  picked3: function () {

    if (this.game.choice3._text === this.game.answer) {
      if (!(this.game.attempts > 0)) {
        this.game.score++;
      }
      this.game.choice3.addColor('#128511', 0);
      this.game.scoreText.text = this.game.scoreString + this.game.score;
      this.game.attempts = 0;
    } else {
      this.game.choice3.addColor('#e31423', 0);
      this.game.incorrectAnswers++;
      this.game.attempts++;
    }

  },
  sendGameData: function () {
    // creates data object containing all the data gathered by this game
    var data = {
      'livesUsed': this.game.incorrectAnswers,
      'time': this.gameTime,
      'pointsScored': this.game.score,
      'pointsAvailable': this.game.pointsAvailable,
      'feeling': 0
    };
    // resets game
    this.graphics.clear();
    this.game.choice1.destroy();
    this.game.choice2.destroy();
    this.game.choice3.destroy();
    //calls the gameover state to finish gathering data
    this.game.state.start('GameOver', null, null, data);
  }
}