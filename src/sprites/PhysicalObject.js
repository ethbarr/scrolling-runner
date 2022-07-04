export default class PhysicalObject extends Phaser.Physics.Arcade.Sprite {
    scene;

    constructor(config) {
        super(config.scene, config.x, config.y, config.name);
        this.scene = config.scene;
        
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this);
		config.scene.anims.createFromAseprite(config.name);
		config.scene.physics.add.collider(this, config.scene.ground);

		this.setInteractive();
		this.setDepth(2);
        this.setGravityY(100);
		this.setPosition(200, 670);
		this.setCollideWorldBounds(true);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
		// this.log();
	}

	 log() {
		 console.log("Player 2.... x: " + this.scene.player2.x + ", y: " + this.scene.player2.y + ", Bottom: " + (this.y - this.displayHeight) + "\n");
		 console.log("Duck........ x: " + this.x + ", y: " + this.y + ", Bottom: " + (this.scene.player2.y - this.scene.player2.displayHeight) + "\n");

	 }


}
