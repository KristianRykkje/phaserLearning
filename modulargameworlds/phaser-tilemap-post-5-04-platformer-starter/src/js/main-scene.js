import Phaser from "phaser";
import Player from "./player.js";
import createRotatingPlatform from "./create-rotating-platform.js";
import levelJson from "../assets/tilemaps/level.json";
import kenneyTilset64pxExtruded from "../assets/tilesets/kenney-tileset-64px-extruded.png";
import images from "../assets/images/*.png";
import emojiPng from "../assets/atlases/emoji.png";
import emojiJson from "../assets/atlases/emoji.json";
import industrialPlayer from "../assets/spritesheets/0x72-industrial-player-32px-extruded.png";

export default class MainScene extends Phaser.Scene {
  preload() {
    this.load.tilemapTiledJSON("map", levelJson);
    this.load.image("kenney-tileset-64px-extruded", kenneyTilset64pxExtruded);

    this.load.image("wooden-plank", images.wooden_plank);
    this.load.image("block", images.block);

    this.load.spritesheet("player", industrialPlayer, {
      frameWidth: 32,
      frameHeight: 32,
      margin: 1,
      spacing: 2,
    });

    this.load.atlas("emoji", emojiPng, emojiJson);
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("kenney-tileset-64px-extruded");
    const groundLayer = map.createDynamicLayer("Ground", tileset, 0, 0);
    const lavaLayer = map.createDynamicLayer("Lava", tileset, 0, 0);
    map.createDynamicLayer("Background", tileset, 0, 0);
    map.createDynamicLayer("Foreground", tileset, 0, 0).setDepth(10);

    // Set colliding tiles before converting the layer to Matter bodies
    groundLayer.setCollisionByProperty({ collides: true });
    lavaLayer.setCollisionByProperty({ collides: true });

    // Get the layers registered with Matter. Any colliding tiles will be given a Matter body. We
    // haven't mapped our collision shapes in Tiled so each colliding tile will get a default
    // rectangle body (similar to AP).
    this.matter.world.convertTilemapLayer(groundLayer);
    this.matter.world.convertTilemapLayer(lavaLayer);

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // The spawn point is set using a point object inside of Tiled (within the "Spawn" object layer)
    const { x, y } = map.findObject("Spawn", obj => obj.name === "Spawn Point");
    this.player = new Player(this, x, y);

    // Smoothly follow the player
    this.cameras.main.startFollow(this.player.sprite, false, 0.5, 0.5);

    const help = this.add.text(16, 16, "Arrows/WASD to move the player.", {
      fontSize: "18px",
      padding: { x: 10, y: 5 },
      backgroundColor: "#ffffff",
      fill: "#000000",
    });
    help.setScrollFactor(0).setDepth(1000);
  }
}
