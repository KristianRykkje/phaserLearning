import Phaser from "phaser";

class PlayScene extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  create() {
    // You can access the game's config to read the width & height
    const { width, height } = this.sys.game.config;

    // Creating a repeating background sprite
    const bg = this.add.tileSprite(0, 0, width, height, "repeating-background");
    bg.setOrigin(0, 0);

    // In v3, you can chain many methods, so you can create text and configure it in one "line"
    this.add
      .text(width / 2, height / 2, "hello\nphaser 3\ntemplate", {
        font: "100px monospace",
        color: "white",
      })
      .setOrigin(0.5, 0.5)
      .setShadow(5, 5, "#5588EE", 0, true, true);
  }

  update(time, delta) {
    // We aren't using this in the current example, but here is where you can run logic that you need
    // to check over time, e.g. updating a player sprite's position based on keyboard input
  }
}

export default PlayScene;
