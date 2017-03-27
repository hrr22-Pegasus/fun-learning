var GameState2 = GameState2 || {};
GameState2.GameOver = function(game) {};

GameState2.GameOver.prototype = {
  init: function(gameResults) {
    // gets the data passed in from the level1 game file and sets it to as a property to be used in this game state
    this.data = gameResults;
  },
  create: function() {
    // retrieves the current username from the database
    this.user = this.getUsername();

    // creates a new option from the options entity
    this.option1 = new Option(this.game, 50, 70, 'option1');
    this.option1.value = 1;

    this.option2 = new Option(this.game, 150, 70, 'option2');
    this.option2.value = 2;

    this.option3 = new Option(this.game, 250, 70, 'option3');
    this.option3.value = 3;

    this.option4 = new Option(this.game, 350, 70, 'option4');
    this.option4.value = 4;

    this.option5 = new Option(this.game, 450, 70, 'option5');
    this.option5.value = 5;

    // adds the equivalent of event listeners to each of the options
    this.option1.inputEnabled = true;
    this.option2.inputEnabled = true;
    this.option3.inputEnabled = true;
    this.option4.inputEnabled = true;
    this.option5.inputEnabled = true;

    this.option1.events.onInputDown.add(this.sendData, this);
    this.option2.events.onInputDown.add(this.sendData, this);
    this.option3.events.onInputDown.add(this.sendData, this);
    this.option4.events.onInputDown.add(this.sendData, this);
    this.option5.events.onInputDown.add(this.sendData, this);
  },
  sendData: function(option) {
    // gets the value of the option that was clicked and adds it to the data property
    this.data.feeling = option.value;
    // adds the game results to the database
    this.addResult('game2', this.user, this.data);
    // sets the game state back to mainmenu
    this.game.state.start('MainMenu');
  }
};
