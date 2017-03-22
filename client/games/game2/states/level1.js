var GameState2 = GameState2 || {};
GameState2.Level1 = function(game) {};

GameState2.Level1.prototype = {
  create: function () {
    // set the array for the test
    this.testArray = [[1, 2], [1, 3], [3, 4]];
    this.choices = [['1/2', '3/4', '1/3'], ['5/8', '3/4', '1/3'], ['4/7', '3/4', '2/3']];
    this.graphics = this.game.add.graphics(this.game.world.centerX, this.game.world.centerY);

    this.renderPie = function() {
      for(var i = 0; i < this.choices.length; i++) {
        this.game.add.text(32, 164, this.choices[0][i]);
      }
      // calculate the fraction
      this.fraction = this.testArray[0][0] / this.testArray[0][1];
      this.rad1 = 0;
      console.log(this.fraction);
      this.rad2 = Math.round(360 * this.fraction);
      this.testArray.shift();

      console.log('rad 2', this.rad2);
      // clear old pie and then draw the new one
      this.graphics.clear();
      this.graphics.beginFill(0x873655);
      this.graphics.arc(0, 0, 90, this.game.math.degToRad(this.rad2), this.game.math.degToRad(this.rad1), true);
      this.graphics.endFill();
    };

    this.game.time.events.repeat(Phaser.Timer.SECOND * 3, this.testArray.length - 1, this.renderPie, this);
    this.renderPie();
  },
  render: function () {
    this.game.debug.text('Time until event: ' + this.game.time.events.duration, 32, 32);
  }

}