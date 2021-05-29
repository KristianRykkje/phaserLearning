import Phaser from "phaser";

class PlayScene extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  create() {
    this.isGameRunning = false;
    this.gameSpeed = 10;
    this.respawnTime = 0;

    const { height, width } = this.game.config;

    this.startTrigger = this.physics.add.sprite(0, 10).setOrigin(0, 1).setImmovable();
    this.ground = this.add.tileSprite(0, height, 88, 26, "ground").setOrigin(0, 1);
    this.dino = this.physics.add.sprite(10, height, "dino_idle").setCollideWorldBounds(true).setGravityY(5000).setOrigin(0, 1);
    this.obsticles = this.physics.add.group();

    this.initAnims();
    this.initColliders();
    this.initStartTrigger();
    this.createControll();
    this.placeObsticle();
  }

  initColliders() {
    this.physics.add.collider(
      this.dino,
      this.obsticles,
      () => {
        this.physics.pause();
        this.isGameRunning = false;
        this.anims.pauseAll();
        this.dino.setTexture("dino_hurt");
        this.respawnTime = 0;
        this.gameSpeed = 10;
      },
      null,
      this
    );
  }

  initStartTrigger() {
    const { width, height } = this.game.config;

    this.physics.add.overlap(
      this.startTrigger,
      this.dino,
      () => {
        if (this.startTrigger.y === 10) {
          this.startTrigger.body.reset(0, height);
          return;
        }

        this.startTrigger.disableBody(true, true);

        const startEvent = this.time.addEvent({
          delay: 1000 / 60,
          loop: true,
          callbackScope: this,
          callback: () => {
            this.dino.setVelocityX(80);
            this.dino.play("dino_run", 1);

            if (this.ground.width < width) {
              this.ground.width += 17 * 2;
            }

            if (this.ground.width >= width) {
              this.ground.width = width;
              this.isGameRunning = true;
              this.dino.setVelocity(0);
              startEvent.remove();
            }
          },
        });
      },
      null,
      null
    );
  }

  createControll() {
    this.input.keyboard.on("keydown-SPACE", () => {
      if (!this.dino.body.onFloor()) {
        return;
      }

      this.dino.body.height = 92;
      this.dino.body.offset.y = 0;

      this.dino.setTexture("dino", 0);
      this.dino.setVelocityY(-1600);
    });
    this.input.keyboard.on("keydown-DOWN", () => {
      if (!this.dino.body.onFloor()) {
        return;
      }
      this.dino.body.height = 58;
      this.dino.body.offset.y = 34;
    });
    this.input.keyboard.on("keyup-DOWN", () => {
      this.dino.body.height = 92;
      this.dino.body.offset.y = 0;
    });
  }

  initAnims() {
    this.anims.create({
      key: "dino_run",
      frames: this.anims.generateFrameNumbers("dino", { start: 2, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "dino_down_anim",
      frames: this.anims.generateFrameNumbers("dino_down", { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "enemy_bird_anim",
      frames: this.anims.generateFrameNumbers("enemy_bird", { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  placeObsticle() {
    const { width, height } = this.game.config;

    const obsticleNum = Math.floor(Math.random() * 7) + 1;
    const distance = Phaser.Math.Between(600, 900);
    let obsticle;

    if (obsticleNum > 6) {
      const enemyHeight = [22, 50];
      obsticle = this.obsticles.create(width + distance, height - enemyHeight[Math.floor(Math.random() * 2)], "enemy_bird");
      obsticle.play("enemy_bird_anim", 1);
      obsticle.body.height = obsticle.body.height / 1.5;
    } else {
      obsticle = this.obsticles.create(width + distance, height, `obsticle_${obsticleNum}`);
      obsticle.body.offset.y = +10;
    }

    obsticle.setOrigin(0, 1).setImmovable();
  }

  update(time, delta) {
    if (!this.isGameRunning) {
      return;
    }
    this.ground.tilePositionX += this.gameSpeed;
    Phaser.Actions.IncX(this.obsticles.getChildren(), -this.gameSpeed);

    this.respawnTime += delta * this.gameSpeed * 0.08;

    if (this.respawnTime >= 1500) {
      this.placeObsticle();
      this.respawnTime = 0;
    }

    this.obsticles.getChildren().forEach(obsticle => {
      if (obsticle.getBounds().right < 0) {
        this.obsticles.killAndHide(obsticle);
      }
    });

    if (this.dino.body.deltaAbsY() > 0) {
      this.dino.anims.stop();
      this.dino.setTexture("dino", 0);
    } else {
      this.dino.body.height <= 58 ? this.dino.play("dino_down_anim", true) : this.dino.play("dino_run", true);
    }
  }
}

export default PlayScene;
