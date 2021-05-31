import Phaser from "phaser";
import PlatformerScene from "./platformer-scene";

const config = {
  type: Phaser.AUTO,
  parent: "game-container",
  width: 800,
  height: 600,
  backgroundColor: "#1d212d",
  pixelArt: false,
  scene: PlatformerScene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1000 },
    },
  },
};

new Phaser.Game(config);
