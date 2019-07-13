const players = {};
var platforms = {};

const config = {
	type: Phaser.AUTO,
	parent: 'phaser-example',
	width: 800,
	height: 600,
	autoFocus: false,
	physics: {
		default: "arcade",
		arcade: {
			gravity: {
				y: 300
			},
			debug: true
		},
		impact: {
			gravity: 50,
			maxVelocity: 800,
			debug: false
		}
	},
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};

function addPlayer(self, playerInfo) {
	var player = self.physics.add.sprite(playerInfo.x, playerInfo.y, 'dude');

	player.setBounce(1);
	player.setCollideWorldBounds(true);
	player.body.setGravityY(300); // Body
	player.playerId = playerInfo.playerId;
	self.players.add(player);
}

function removePlayer(self, playerId) {
	self.players.getChildren().forEach((player) => {
		if (playerId === player.playerId) {
			player.destroy();
		}
	});
}

function handlePlayerInput(self, playerId, input) {
	self.players.getChildren().forEach((player) => {
		if (playerId === player.playerId) {
			players[player.playerId].input = input;
		}
	});
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
}
var player;
function create() {

	const self = this;

	/* PLATFORM - START*/
	this.add.image(400, 300, 'sky');

	platforms = this.physics.add.staticGroup();

	platforms.create(400, 568, 'ground').setScale(2).refreshBody();

	platforms.create(600, 400, 'ground');
	platforms.create(50, 250, 'ground');
	platforms.create(750, 220, 'ground');
	/* PLATFORM - END*/

	
	
	this.players = this.physics.add.group();
addPlayer(self, {
rotation: 0,
			x: 100,
			y: 450,
			playerId: "eqweqweqw",
			team: (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue',
			input: {
				left: false,
				right: false,
				up: false
			}
});

	this.players.children.iterate(function (child) {
 		child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
 	});

 // player = self.physics.add.sprite(100, 450, 'dude');

	// player.setBounce(1);
	// player.setCollideWorldBounds(true);
	// player.body.setGravityY(300); // Body
	// player.playerId = playerInfo.playerId;

	/* COLLIDER - START*/
	// this.physics.add.collider(player, platforms);
	this.physics.add.collider(this.players, platforms);

	/* io.on('connection', function (socket) {
		console.log('a user connected');

		// create a new player and add it to our players object
		players[socket.id] = {
			rotation: 0,
			x: 100,
			y: 450,
			playerId: socket.id,
			team: (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue',
			input: {
				left: false,
				right: false,
				up: false
			}
		};
		// add player to server
		addPlayer(self, players[socket.id]);
		// send the players object to the new player
		socket.emit('currentPlayers', players);
		// update all other players of the new player
		socket.broadcast.emit('newPlayer', players[socket.id]);

		// when a player moves, update the player data
		socket.on('playerInput', function (inputData) {
			handlePlayerInput(self, socket.id, inputData);
		});

		socket.on('disconnect', function () {
			console.log('user disconnected');
			// remove player from server
			removePlayer(self, socket.id);
			// remove this player from our players object
			delete players[socket.id];
			// emit a message to all players to remove this player
			io.emit('disconnect', socket.id);
		});
	}); */
}

function update() {
	// this.players.getChildren().forEach((player) => {
		// const input = players[player.playerId].input;
		// if (input.left) {
			// player.setVelocityX(-160);
		// } else if (input.right) {
			// player.setVelocityX(160);
		// } else {
			// player.setVelocityX(0);
		// }

		// if (input.up && player.body.touching.down) {
			// player.setVelocityY(-490);
		// }

		// players[player.playerId].x = player.x;
		// players[player.playerId].y = player.y;
		// players[player.playerId].rotation = player.rotation;
	// });
	// this.physics.world.wrap(this.players, 5);
	// io.emit('playerUpdates', players);

}

const game = new Phaser.Game(config);

// window.gameLoaded();