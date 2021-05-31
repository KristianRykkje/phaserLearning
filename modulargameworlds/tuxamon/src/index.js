import Phaser from "phaser";

import PlayScene from "./PlayScene";

const config = {
  type: Phaser.AUTO,
  parent: "game-container",
  width: 800,
  height: 600,
  backgroundColor: "#222222",
  scene: [PlayScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
};

new Phaser.Game(config);
