var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.baseURL = 'http://examples.phaser.io/assets/';
    game.load.crossOrigin = 'anonymous';

    game.load.image('ship', 'assets/milleniumFalconShip');
    game.load.image('bullet', 'misc/bullet0.png');

}

var player;
var bullets;

var cursors;
var fireButton;

var bulletTime = 0;
var bullet;

function create() {

    bullets = game.add.physicsGroup();
    bullets.createMultiple(32, 'bullet', false);
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);

    player = game.add.sprite(400, 550, 'ship');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

function update () {

    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -600;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 600;
    }

    if (fireButton.isDown)
    {
        fireBullet();
    }

}

function fireBullet () {

    if (game.time.time > bulletTime)
    {
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(player.x + 6, player.y - 12);
            bullet.body.velocity.y = -600;
            bulletTime = game.time.time + 100;
        }
    }

}

function render () {

}