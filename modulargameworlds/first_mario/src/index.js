import Phaser from "phaser";

import PlayScene from "./PlayScene";
import PreloadScene from "./PreloadScene";

const config = {
  type: Phaser.AUTO,
  parent: "game-container",
  width: 800,
  height: 600,
  backgroundColor: "#222222",
  scene: [PreloadScene, PlayScene],
};

new Phaser.Game(config);
