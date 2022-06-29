export default class Player extends Phaser.Physics.Arcade.Sprite {//Phaser.GameObjects.Sprite {
    scene;

    constructor(config) {
        super(config.scene, config.x, config.y, config.name);
        this.scene = config.scene;
        
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this);

        //config.scene.add.existing(this);
       //
        this.setInteractive();

		config.scene.anims.createFromAseprite(config.name)

		this.setDepth(2)
        this.setGravityY(200)
		this.setPosition(200, 650)
		config.scene.physics.add.collider(this, config.scene.ground)
		//config.scene.physics.add.collider(this, config.player)

        
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

		 if (this.scene.player2.x > this.x + 250) {
		 	this.play({ key: 'fly-right', repeat: -1 }, true);
		 	this.setVelocityY(-100);
		 	this.setVelocityX(150);
		 } else if (this.scene.player2.x < this.x - 250) {
			this.play({ key: 'fly-left', repeat: -1 }, true);
			this.setVelocityY(-100);
			this.setVelocityX(-150);
		} else if ((this.scene.player2.x < this.x - 50) && this.y > 650) {
			this.play({ key: 'walk-left', frameRate: 18, repeat: -1 }, true);
			this.setVelocityX(-50);
		} else if ((this.scene.player2.x > this.x + 50) && this.y > 650) {
			this.play({ key: 'walk-right', frameRate: 18, repeat: -1 }, true);
			this.setVelocityX(50);
		} else if (this.y > 650) {
			this.play({ key: 'stand-right', repeat: -1 }, true);
			this.setVelocityX(0);
		} else {
			this.setVelocityY(-5);
		}
	}


}

// Phaser.GameObjects.GameObjectFactory.register('duck', function (x, y) {
// 	const player = new Player({scene:this.scene, x:1024 * 0.4, y:578, name:'duck'})
// 	this.setGravityY(1000);
//     this.displayList.add(player);
//     this.updateList.add(player);

//     return player;
// })
