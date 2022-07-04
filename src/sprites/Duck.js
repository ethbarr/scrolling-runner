import Npc from "./Npc";

export default class Duck extends Npc {
    leader;
    ground = 670;

    constructor(config) {
        super(config);
        this.leader = config.leader;
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

		if (this.isToTheLeft(250)) {
		 	this.flyRight();
		} else if (this.isToTheRight(250)) {
			this.flyLeft();
		} else if (this.isToTheLeft(50) && this.isAirborne()) {
			this.setVelocityY(75);
	    } else if (this.isToTheRight(50) && this.isAirborne()) {
		   this.setVelocityY(75);
		} else if (this.isToTheRight(50) && this.isGrounded()) {
			this.walkLeft();
		} else if (this.isToTheLeft(50) && this.isGrounded()) {
			this.walkRight();
            this.setTint(Math.random() * 0xffffff)
        } else if (this.isGrounded()) {
			this.standRight();
		} else {
            
		}
	}

    standRight() {
        this.playAnimation('stand-right');
        this.setVelocityX(0);
    }

    walkRight() {
        this.playAnimation('walk-right');
        this.setVelocityX(30);
    }

    walkLeft() {
        this.playAnimation('walk-left');
        this.setVelocityX(-30);
    }

    flyLeft() {
        this.playAnimation('fly-left');
        this.setVelocityY(-300);
        this.setVelocityX(-100);
    }

    flyRight() {
        this.playAnimation('fly-right');
        this.setVelocityY(-300);
        this.setVelocityX(100);
    }

    isGrounded() {
        return this.y >= this.ground;
    }

    isAirborne() {
        return this.y < this.ground;
    }

    isToTheRight(pixels) {
        return this.leader.x < this.x - pixels;
    }

    isToTheLeft(pixels) {
        return this.leader.x > this.x + pixels;
    }

    playAnimation(name){
        this.play({ key: name, frameRate: 18, repeat: -1 }, true);
    }
}