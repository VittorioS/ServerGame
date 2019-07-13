var config = {
	type: Phaser.AUTO,
	parent: 'phaser-example',
	width: 800,
	height: 600,
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};

function displayPlayers(self, playerInfo, sprite) {
	const player = self.add.sprite(playerInfo.x, playerInfo.y, sprite);
	if (playerInfo.team === 'blue') player.setTint(0x0000ff);
	else player.setTint(0xff0000);
	player.playerId = playerInfo.playerId;
	self.players.add(player);
}

function preload() {
	this.load.image('sky', 'assets/sky.png');
	this.load.image('ground', 'assets/platform.png');
	this.load.image('star', 'assets/star.png');
	this.load.image('bomb', 'assets/bomb.png');
	this.load.spritesheet('dude',
		'assets/dude.png', {
			frameWidth: 32,
			frameHeight: 48
		}
	);
	this.load.spritesheet('otherPlayer',
		'assets/dude.png', {
			frameWidth: 32,
			frameHeight: 48
		}
	);
}
var platforms;

function create() {
	var self = this;
	this.socket = io();
	/* PLATFORM - START*/
	this.add.image(400, 300, 'sky');

	platforms = this.add.group();

	platforms.create(400, 568, 'ground').setScale(2);

	platforms.create(600, 400, 'ground');
	platforms.create(50, 250, 'ground');
	platforms.create(750, 220, 'ground');
	/* PLATFORM - END*/
	
	/* PLAYER - START*/
	this.players = this.add.group();

	 	this.anims.create({
 		key: 'left',
 		frames: this.anims.generateFrameNumbers('dude', {
 			start: 0,
 			end: 3
 		}),
 		frameRate: 10,
 		repeat: -1
 	});
 	
 	this.anims.create({
 		key: 'sprint_left',
 		frames: this.anims.generateFrameNumbers('dude', {
 			start: 0,
 			end: 3
 		}),
 		frameRate: 15,
 		repeat: -1
 	});

 	this.anims.create({
 		key: 'turn',
 		frames: [{
 			key: 'dude',
 			frame: 4
 		}],
 		frameRate: 20
 	});

 	this.anims.create({
 		key: 'right',
 		frames: this.anims.generateFrameNumbers('dude', {
 			start: 5,
 			end: 8
 		}),
 		frameRate: 10,
 		repeat: -1
 	});

 	this.anims.create({
 		key: 'sprint_right',
 		frames: this.anims.generateFrameNumbers('dude', {
 			start: 5,
 			end: 8
 		}),
 		frameRate: 15,
 		repeat: -1
 	});
	/* PLAYER - END*/
	
	this.cursors = this.input.keyboard.createCursorKeys();
	this.leftKeyPressed = false;
	this.rightKeyPressed = false;
	this.upKeyPressed = false;

	this.socket.on('currentPlayers', function (players) {
		Object.keys(players).forEach(function (id) {
			if (players[id].playerId === self.socket.id) {
				displayPlayers(self, players[id], 'dude');
			} else {
				displayPlayers(self, players[id], 'otherPlayer');
			}
		});
	});

	this.socket.on('newPlayer', function (playerInfo) {
		displayPlayers(self, playerInfo, 'otherPlayer');
	});

	this.socket.on('disconnect', function (playerId) {
		var o = self.players.getChildren().find(function (player) {
			return playerId === player.playerId;
		});
		if (o)
			o.destroy();
	});

	this.socket.on('playerUpdates', function (players) {
		Object.keys(players).forEach(function (id) {
			self.players.getChildren().forEach(function (player) {
				if (players[id].playerId === player.playerId) {
					player.setRotation(players[id].rotation);
					player.setPosition(players[id].x, players[id].y);
					if (players[id].input.left) {
						player.anims.play("left", true);
					} else if (players[id].input.right) {
						player.anims.play("right", true);
					} else {
						player.anims.play("turn", true);
					}
				}
			});
		});
	});
}

function update() {

	const left = this.leftKeyPressed;
	const right = this.rightKeyPressed;
	const up = this.upKeyPressed;

	if (this.cursors.left.isDown) {
		this.leftKeyPressed = true;
	} else if (this.cursors.right.isDown) {
		this.rightKeyPressed = true;
	} else {
		this.leftKeyPressed = false;
		this.rightKeyPressed = false;
	}

	if (this.cursors.up.isDown) {
		this.upKeyPressed = true;
	} else {
		this.upKeyPressed = false;
	}

	if (left !== this.leftKeyPressed || right !== this.rightKeyPressed || up !== this.upKeyPressed) {
		this.socket.emit('playerInput', {
			left: this.leftKeyPressed,
			right: this.rightKeyPressed,
			up: this.upKeyPressed
		});
	}
}

const game = new Phaser.Game(config);