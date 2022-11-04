console.log("do i run top")
const p = require("p5")

// console.log(p.setup)

function setup() {
  p.createCanvas(600, 400)
  console.log(width)
  console.log(height)
}

function draw() {
  p.background(300, 100, 100)
}

setup()
draw()
