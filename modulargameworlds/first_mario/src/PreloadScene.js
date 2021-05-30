import Phaser from "phaser";
import images from "./assets/*.png";
import sounds from "./assets/*.m4a";

class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    // "this" === Phaser.Scene
    this.load.image(
      "repeating-background",
      "https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/images/escheresque_dark.png",
    );
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
}

export default PreloadScene;
