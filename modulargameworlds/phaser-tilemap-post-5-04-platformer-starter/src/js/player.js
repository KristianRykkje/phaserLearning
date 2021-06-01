import Phaser from "phaser";
import MultiKey from "./multi-key.js";

export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;

    // Create the physics-based sprite that we will move around and animate
    this.sprite = scene.matter.add.sprite(0, 0, "player", 0);

    const { Body, Bodies } = Phaser.Physics.Matter.Matter; // Native Matter modules
    const { width: w, height: h } = this.sprite;
    const mainBody = Bodies.rectangle(0, 0, w * 0.6, h, {
      chamfer: { radius: 10 },
    });
    this.sensors = {
      bottom: Bodies.rectangle(0, h * 0.5, w * 0.25, 2, { isSensor: true }),
      left: Bodies.rectangle(-w * 0.35, 0, 2, h * 0.5, { isSensor: true }),
      right: Bodies.rectangle(w * 0.35, 0, 2, h * 0.5, { isSensor: true }),
    };
    const compoundBody = Body.create({
      parts: [
        mainBody,
        this.sensors.bottom,
        this.sensors.left,
        this.sensors.right,
      ],
      frictionStatic: 0,
      frictionAir: 0.02,
      friction: 0.1,
    });
    this.sprite
      .setExistingBody(compoundBody)
      .setScale(2)
      .setFixedRotation() // Sets inertia to infinity so the player can't rotate
      .setPosition(x, y);

    // Create the animations we need from the player spritesheet
    const anims = scene.anims;
    anims.create({
      key: "player-idle",
      frames: anims.generateFrameNumbers("player", { start: 0, end: 3 }),
      frameRate: 3,
      repeat: -1,
    });
    anims.create({
      key: "player-run",
      frames: anims.generateFrameNumbers("player", { start: 8, end: 15 }),
      frameRate: 12,
      repeat: -1,
    });
  }

  freeze() {
    this.sprite.setStatic(true);
  }

  update() {}

  destroy() {}
}
