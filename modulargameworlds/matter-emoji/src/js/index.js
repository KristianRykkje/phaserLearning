import Phaser from "phaser";
import MainScene from "./main-scene.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#000c1f",
  parent: "game-container",
  pixelArt: true,

  // Load our yet-to-be-created custom scene
  scene: MainScene,

  // Load up Matter and optionally configure it
  physics: {
    default: "matter",
    matter: {
      gravity: { y: 1 }, // This is the default value, so we could omit this
    },
  },
};

const game = new Phaser.Game(config);
