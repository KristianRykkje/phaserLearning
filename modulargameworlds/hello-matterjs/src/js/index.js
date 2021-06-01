import { Engine, Render, World, Bodies, Body } from "matter-js";

// A few random helper functions
const randomInRange = (min, max) => Math.random() * (max - min) + min;
const randomIntInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const engine = Engine.create();
const render = Render.create({
  element: document.getElementById("game-container"),
  engine: engine,
  options: {
    width: 800,
    height: 600,
    wireframes: false, // Draw the shapes as solid colors
    background: "#f4f4f8",
  },
});

// Create a rectangle centered at the top of the screen, (400, 0), with 120px width and 80px height
const DEGREES_TO_RADIANS = Math.PI / 180; // Helper to convert from degrees to radians

// Create some simple physics bodies, horizontally centered & above the top edge of the canvas
const rectangle = Bodies.rectangle(400, -300, 120, 80, {
  friction: 1,
  restitution: 0.25,
});
const circle = Bodies.circle(400, -150, 50, { friction: 0, restitution: 1 });
// Polygon parameters: x, y, number of sides, radius of the shape, body options. A three-sided
// polygon will give us a triangle.
const triangle = Bodies.polygon(400, 0, 3, 50, {
  friction: 0,
  restitution: 0.5,
});

// Create an immovable rectangle at the bottom of the screen that will act as the floor
const floor = Bodies.rectangle(400, 575, 800, 50, { isStatic: true });

// Create some vertical walls that are positioned just off screen.
const leftWall = Bodies.rectangle(-25, 400, 50, 800, {
  isStatic: true,
  friction: 0,
});
const rightWall = Bodies.rectangle(825, 400, 50, 800, {
  isStatic: true,
  friction: 0,
});

// Create some bouncy, static obstacles in the world for our bodies to ricochet off of
const obstacle1 = Bodies.circle(150, 200, 85, {
  isStatic: true,
  friction: 0,
  restitution: 1,
});
const obstacle2 = Bodies.polygon(400, 400, 3, 75, {
  isStatic: true,
  angle: 90 * DEGREES_TO_RADIANS,
  friction: 0,
  restitution: 1,
});
const obstacle3 = Bodies.circle(650, 200, 85, {
  isStatic: true,
  friction: 0,
  restitution: 1,
});

const verticalPart = Bodies.rectangle(400, 150, 100, 50);
const horizontalPart = Bodies.rectangle(400, 150, 50, 100);
const cross = Body.create({
  parts: [verticalPart, horizontalPart],
  friction: 0,
  restitution: 1,
});

// Add the newly minted bodies to our physics simulation
World.add(engine.world, [
  rectangle,
  triangle,
  circle,
  floor,
  leftWall,
  rightWall,
  obstacle1,
  obstacle2,
  obstacle3,
  cross,
]);

// Listen for mouse presses on the canvas and add a bunch of new bodies to the world
document.querySelector("canvas").addEventListener("mousedown", () => {
  for (let i = 0; i < 5; i++) {
    const x = randomInRange(50, 750);
    const y = randomInRange(0, 50);
    const radius = randomInRange(25, 50);
    const sides = randomIntInRange(3, 6);
    const body = Bodies.polygon(x, y, sides, radius, {
      friction: 0,
      restitution: 0.5,
    });
    World.add(engine.world, body);
  }
});

// Kick off the simulation and the render loops
Engine.run(engine);
Render.run(render);
