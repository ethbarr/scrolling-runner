import Phaser from 'phaser';
import Duck from '../sprites/Duck';

export default 
class GameScene extends Phaser.Scene
{
cursors
CursorKeys
backgrounds = []
velocityX = 10
player;
Image;
clouds;
ground;
scrollPoint = 700;
cameraInitialX;
duck;

	constructor()
	{
		super('game-scene')
	}

	init() {
		this.cursors = this.input.keyboard.createCursorKeys()
	}

	preload() {
		this.load.image('sky', 'assets/sky.png')
		this.load.image('clouds', 'assets/clouds.png')
		this.load.image('background', 'assets/background.png')
		this.load.image('midground', 'assets/midground.png')
		this.load.image('foreground', 'assets/foreground.png')
		this.load.image('ground', 'assets/dirt-grass-1.png')

		this.load.image('guy', 'assets/guy.png')
		this.load.aseprite('dave', 'assets/dave-001.png', 'assets/dave-001.json')
		this.load.aseprite('duck', 'assets/duck.png', 'assets/duck.json')
    }

    create() {
		const { width, height } = this.scale

		this.add.image(0, 0, 'sky')
			.setOrigin(0, 0)
			.setScrollFactor(0)

		this.clouds = this.add.tileSprite(0, 0, width, height, 'clouds')
		.setOrigin(0, 0)
		.setScrollFactor(0, 0)

		// this.add.image(0, 0, 'middle').setOrigin(0, 0)
		this.backgrounds.push({
			ratioX: 0.1,
			sprite: this.add.tileSprite(0, 0, width, height, 'background')
				.setOrigin(0, 0)
				.setScrollFactor(0, 0)
		})

		// this.add.image(0, 0, 'foreground').setOrigin(0, 0)
		this.backgrounds.push({
			ratioX: 0.3,
			sprite: this.add.tileSprite(0, 0, width, height, 'midground')
				.setOrigin(0, 0)
				.setScrollFactor(0, 0)
		})

		// this.add.image(0, 0, 'ground1').setOrigin(0, 0)
		this.backgrounds.push({
			ratioX: 0.7,
			sprite: this.add.tileSprite(0, 0, width, height, 'foreground')
				.setOrigin(0, 0)
				.setScrollFactor(0, 0)
		})

		this.ground = this.add.tileSprite(width*0.5, height-50, 10000, 64, 'ground', 0)
		.setOrigin(0.5, 0.5)
		.setScale(1)
		this.physics.add.existing(this.ground, true)

		this.createDave(width);
		this.createGuy(width);
		this.duck = new Duck({
			scene:this,
			x:width * 0.4, 
			y:this.ground.y-495, 
			name:'duck',
			leader: this.player2});
		

		//this.createDuck(width);

		//this.cameras.main.startFollow(this.player2)
		//this.cameras.main.setFollowOffset(0, 145)
		this.cameras.main.startFollow
		this.cameraInitialX = this.cameras.main.scrollX;
		// const particles = this.add.particles('snow-particle')
		// particles.createEmitter({
		// 	x: 0,
		// 	y: 0,
		// 	// emitZone
		// 	emitZone: {
		// 		source: new Phaser.Geom.Rectangle(-width * 3, 0, width * 7, 100),
		// 		type: 'random',
		// 		quantity: 70
		// 	},
		// 	speedY: { min: 50, max: 70 },
		// 	speedX: { min: -20, max: 20 },
		// 	accelerationY: { random: [10, 15] },
		// 	// lifespan
		// 	lifespan: { min: 8000, max: 10000 },
		// 	scale: { random: [0.25, 0.75] },
		// 	alpha: { random: [0.1, 0.8] },
		// 	gravityY: 10,
		// 	frequency: 10,
		// 	blendMode: 'ADD',
		// 	// follow the player at an offiset
		// 	follow: this.player, 
		// 	followOffset: { x: -width * 0.5, y: -height - 100 }
		// })
    }

	createGuy(width) {
		this.player = this.physics.add.sprite(width * 0.1, this.ground.y - 500, 'guy')
			.setOrigin(0.2, -5)
			.setScale(2);
		this.player.setGravityY(100);
		this.player.setBounce(0.5);
		this.physics.add.collider(this.player, this.ground);
	}

	createDave(width) {
		this.anims.createFromAseprite('dave');
		this.player2 = this.physics.add.sprite(width * 0.4, 575, 'dave', 0)
			.setOrigin(0.5, -0.83)
			.setScale(1.75)
			.setBounce(0.2, 0.2);



		this.player2.setGravityY(1000);
		this.player2.setDepth(2);
		this.physics.add.collider(this.player2, this.ground);
		this.physics.add.collider(this.player2, this.player);
	}

	// createDuck(width) {
	// 	this.anims.createFromAseprite('duck');
	// 	this.duck = this.physics.add.sprite(width * 0.6, 578, 'duck', 0)
	// 		.setOrigin(0.5, -0.83)
	// 		.setScale(1.75)
	// 		.setBounce(0.2, 0.2);

	// 	this.duck.setGravityY(1000);
	// 	this.duck.setDepth(2);
	// 	this.physics.add.collider(this.duck, this.ground);
	// 	this.physics.add.collider(this.duck, this.player);
	// }

	update() {
		// dave
		if (this.cursors.left.isDown && (this.player2.x > this.cameras.main.worldView.left)) {
			this.player2.play({ key: 'walkleft', repeat: -1 }, true)
			this.velocityX = -5
		}
		else if (this.cursors.right.isDown) {
			this.player2.play({ key: 'walkright', repeat: -1 }, true)
			this.velocityX = 5
		}
		else {
			this.player2.play({ key: 'facefront', repeat: -1 }, true)
			this.velocityX = 0
		}

		if (this.cursors.up.isDown && this.player2.body.wasTouching.down) {
			this.player2.setVelocityY(-500)
		}

		this.player2.x += this.velocityX
		//console.log("player2.x: " + this.player2.x + ", player3.x: " + this.player3.x + "player2.y: " + this.player2.y + ", player3.y: " + this.player3.y)
		// duck
		//this.duck.update(this);



		for (let i = 0; i < this.backgrounds.length; ++i) {
			const bg = this.backgrounds[i]

			bg.sprite.tilePositionX = this.cameras.main.scrollX * bg.ratioX
		}

		let isScrolling;
		if (this.player2.x > this.scrollPoint) {
			isScrolling = true;
		}

		if (isScrolling == true) {
			this.cameras.main.scrollX += 10;
			if (this.cameras.main.scrollX > this.cameraInitialX + 700) {
				this.cameraInitialX += 700;
				this.scrollPoint += 700;
				isScrolling = false;
			}	
		} 


		
		this.clouds.tilePositionX += 0.25
	}



	// updateDuck() {
	// 	if (this.player2.x > this.duck.x + 250) {
	// 		this.duck.play({ key: 'fly-right', repeat: -1 }, true);
	// 		this.duck.setVelocityY(-100);
	// 		this.duck.setVelocityX(150);
	// 	} else if (this.player2.x < this.duck.x - 250) {
	// 		this.duck.play({ key: 'fly-left', repeat: -1 }, true);
	// 		this.duck.setVelocityY(-150);
	// 		this.duck.setVelocityX(-150);
	// 	} else if ((this.player2.x > this.duck.x + 25)) {

	// 		if (this.duck.y > 575) {
	// 			this.duck.play({ key: 'walk-right', frameRate: 18, repeat: -1 }, true);
	// 			this.duck.setVelocityX(50);
	// 		} else {

	// 			this.duck.play({ key: 'fly-right', repeat: -1 }, true);
	// 			this.duck.setVelocityY(-100);
	// 			this.duck.setVelocityX(100);
	// 		}

	// 	} else if ((this.player2.x < this.duck.x - 50) && this.duck.y > 575) {
	// 		this.duck.play({ key: 'walk-left', frameRate: 18, repeat: -1 }, true);
	// 		this.duck.setVelocityX(-50);
	// 	} else if (this.duck.y > 575) {
	// 		this.duck.play({ key: 'stand-right', repeat: -1 }, true);
	// 		this.duck.setVelocityX(0);
	// 	} else {
	// 		this.duck.setVelocityY(-9);
	// 	}
	// }
}
