import PhysicalObject from "./PhysicalObject";

export default class Npc extends PhysicalObject {
    constructor(config) {
        super(config);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
	}
}