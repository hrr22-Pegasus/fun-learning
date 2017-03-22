var game2 = new Phaser.Game(300, 300, Phaser.CANVAS, 'phaser-example', null, false);
  game2.state.add('Boot', GameState2.Boot);
  game2.state.add('Preload', GameState2.Preload);
  game2.state.add('MainMenu', GameState2.MainMenu);
  game2.state.add('Level1', GameState2.Level1);

  game2.state.start('Boot');