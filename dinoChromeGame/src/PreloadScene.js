import Phaser from "phaser";
import images from "./assets/*.png";
import sounds from "./assets/*.m4a";

class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.load.audio("jump", sounds.jump);
    this.load.audio("hit", sounds.hit);
    this.load.audio("reach", sounds.reach);

    this.load.image("ground", images.ground);
    this.load.image("dino_idle", images.dino_idle);
    this.load.image("dino_hurt", images.dino_hurt);
    this.load.image("restart", images.restart);
    this.load.image("game_over", images.game_over);
    this.load.image("cloud", images.cloud);

    this.load.spritesheet("star", images.stars, {
      frameWidth: 9,
      frameHeight: 9,
    });

    this.load.spritesheet("moon", images.moon, {
      frameWidth: 20,
      frameHeight: 40,
    });

    this.load.spritesheet("dino", images.dino_run, {
      frameWidth: 88,
      frameHeight: 94,
    });

    this.load.spritesheet("dino_down", images.dino_down, {
      frameWidth: 118,
      frameHeight: 94,
    });

    this.load.spritesheet("enemy_bird", images.enemy_bird, {
      frameWidth: 92,
      frameHeight: 77,
    });

    this.load.image("obsticle_1", images.cactuses_small_1);
    this.load.image("obsticle_2", images.cactuses_small_2);
    this.load.image("obsticle_3", images.cactuses_small_3);
    this.load.image("obsticle_4", images.cactuses_big_1);
    this.load.image("obsticle_5", images.cactuses_big_2);
    this.load.image("obsticle_6", images.cactuses_big_3);
  }

  create() {
    this.scene.start("PlayScene");
  }
}

export default PreloadScene;
