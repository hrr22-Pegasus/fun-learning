var GameState = GameState || {};

GameState.Preload = function(game){};

GameState.Preload.prototype = {

  preload: function(){

    // find user's teacher
    this.teacher = this.getTeacherFromUser();

    // load test associated with that teacher
    this.loadTestByTeacher(this.teacher);

    // get avatar object from user
    this.avatarPath = this.getAvatarFromUser();
    this.avatarBody = this.avatarPath.body;
    this.avatarHead = this.avatarPath.head;
    console.log("importing avatar: ", this.avatarPath);

    //place all the items on the screen
    this.load.image('background', 'assets/haunted-mansion.png');
    this.load.spritesheet('kanye', this.avatarBody, 780/10, 190/2, 20,1,1);
    this.load.spritesheet('kanye-head', this.avatarHead ,75,75,1,1,1);
    this.load.image('ghost', 'assets/ghost.png');
    this.load.image('option1', 'assets/score1.png');
    this.load.image('option2', 'assets/score2.png');
    this.load.image('option3', 'assets/score3.png');
    this.load.image('option4', 'assets/score4.png');
    this.load.image('option5', 'assets/score5.png');
  },

  create: function(){

    this.state.start('MainMenu');
  }
};

