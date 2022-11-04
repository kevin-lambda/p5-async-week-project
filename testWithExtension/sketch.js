// setup once... like init
// setup and draw are called automatically
// only one setup and draw each

// INIT ZONE ==================================== //
let magicMouse = false
let shapeSize = 300
let sel
let sketchOption = "circle fractal"
let debugCounter = 0

let loop1Flag = false
let loop2Flag = false
let loop3Flag = false
let loop4Flag = false

const BPM = 100
const bpmToTimeConversion = BPM / 60

// setup is a fn that is called once when program starts
function setup() {
  createCanvas(600, 600)

  createSpan("Modifier 1").position(140, 600)
  createSpan("Modifier 2").position(140, 625)
  createSpan("Modify special (WARNING low values may be slow)").position(
    140,
    650
  )

  // createSlider(min, max, [value], [step])
  sliderX = createSlider(0, 5, 1, 0.1).position(0, 600)
  sliderY = createSlider(0, 1, 0, 0.01).position(0, 625)
  sliderSize = createSlider(1.75, 3.5, 2.0, 0.1).position(0, 650)

  checkbox = createCheckbox(
    "<<<<< ✧･ﾟ: *✧･ﾟ:* Enable Magic Mouse Mode *:･ﾟ✧*:･ﾟ✧",
    false
  ).position(0, 675)
  checkbox.changed(myCheckedEvent)

  // options select
  sel = createSelect()
  sel.position(0, 700)
  sel.option("circle fractal")
  sel.option("pyramid pulse")
  sel.option("dots")
  sel.option("music cycle")
  sel.changed(mySelectEvent)
}

function preload() {
  soundFormats("mp3")
  loop1 = loadSound("./assets/loop_1")
  loop2 = loadSound("./assets/loop_2")
  loop3 = loadSound("./assets/loop_3")
  loop4 = loadSound("./assets/loop_4")
}

function draw() {
  if (sketchOption === "circle fractal") {
    background(0)
    // removeButtons()
    shapeRecursion1(300, 300, circleRecursionMagicMouse(magicMouse))
  } else if (sketchOption === "pyramid pulse") {
    // removeButtons()
    pyramid(mouseX, mouseY)
  } else if (sketchOption === "dots") {
    // removeButtons()
    randomPainter()
  } else if (sketchOption === "music cycle") {
    if (debugCounter <= 0) {
      addButtons()
    }
    musicClocked()

    if (!loop2.isPlaying()) {
      loop2Flag = false
    }
    if (!loop3.isPlaying()) {
      loop3Flag = false
    }
    if (!loop4.isPlaying()) {
      loop4Flag = false
    }
  }
}

function addButtons() {
  debugCounter++
  button1 = createButton("play loop").position(65, 290).id("b1")
  button11 = createButton("stop loop").position(65, 315).id("b11")
  button2 = createButton("riff 1").position(200, 290).id("b2")
  button3 = createButton("riff 2").position(330, 290).id("b3")
  button4 = createButton("riff 3").position(450, 290).id("b4")

  button1.mousePressed(playSound1)
  button11.mousePressed(stopSound11)
  button2.mousePressed(playSound2)
  button3.mousePressed(playSound3)
  button4.mousePressed(playSound4)
}

function playSound1() {
  loop1Flag = true
  loop1.loop()
}
function stopSound11() {
  loop1Flag = false
  loop1.stop()
}
function playSound2() {
  loop2Flag = true
  // console.log(loop2.isPlaying())
  loop2.play()
  // console.log(loop2.isPlaying())
}
function playSound3() {
  loop3Flag = true
  loop3.play()
}
function playSound4() {
  loop4Flag = true
  loop4.play()
}

function removeButtons() {
  if (document.getElementById("b1")) {
    const element = document.getElementById("b1")
    element.remove()
  }
  if (document.getElementById("b2")) {
    const element = document.getElementById("b2")
    element.remove()
  }
  if (document.getElementById("b3")) {
    const element = document.getElementById("b3")
    element.remove()
  }
  if (document.getElementById("b4")) {
    const element = document.getElementById("b4")
    element.remove()
  }
  if (document.getElementById("b11")) {
    const element = document.getElementById("b11")
    element.remove()
  }
}

function shapeRecursion1(x, y, size) {
  if (magicMouse) {
    mappedMouseRecurY = map(mouseY, 0, height, 0, 255)
    stroke(mouseX, mappedMouseRecurY, mappedMouseRecurY / 10)
  } else {
    stroke(255)
  }

  noFill()
  let xMod = sliderX.value()
  let yMod = sliderY.value()
  let sizeMod = sliderSize.value()

  circle(x, y, size)

  if (size > 5) {
    shapeRecursion1(x + size / xMod, y, size / sizeMod)
    shapeRecursion1(x - size / xMod, y, size / sizeMod)
    shapeRecursion1(x, y + size / yMod, size / sizeMod)
    shapeRecursion1(x, y - size / yMod, size / sizeMod)
  }
}

function circleRecursionMagicMouse(magicMouse) {
  if (magicMouse) {
    return mouseX * 1.1
  } else {
    return 300
  }
}

function myCheckedEvent() {
  if (checkbox.checked()) {
    magicMouse = true
  } else {
    magicMouse = false
  }
}

// actions upon selection
function mySelectEvent() {
  sketchOption = sel.value()
  if (sketchOption === "pyramid pulse") {
    background(0)
  }
  if (sketchOption === "dots") {
    background(0)
  }
}

// ========================================================== //
// ===================== other functions ==================== //
// ========================================================== //

function musicClocked() {
  background(200)

  // debug city current stuff
  stroke(0)
  fill(0)
  strokeWeight(0.25)
  let s = second()
  textSize(12)
  text("Current second: " + s, 5, 15)
  text("DEBUG COUNTER: " + debugCounter, 5, 30)

  // UI
  textSize(30)
  text("NOTES ON A LOOPS", 200, 110)
  rect(25, 125, 525, 150)

  fill(50)
  rect(40, 140, 120, 120)
  rect(165, 140, 120, 120)
  rect(290, 140, 120, 120)
  rect(415, 140, 120, 120)

  // circles
  oneCirclePulse(100, 200, 90, 16 / bpmToTimeConversion, loop1Flag)
  oneCirclePulse(225, 200, 90, 8 / bpmToTimeConversion, loop2Flag)
  oneCirclePulse(350, 200, 90, 8 / bpmToTimeConversion, loop3Flag)
  oneCirclePulse(475, 200, 90, 16 / bpmToTimeConversion, loop4Flag)
}

// try islooping, loop, noloop?
function oneCirclePulse(x, y, radius, loopTime, Looping) {
  if (!Looping) {
    loopTime = 0
  }

  const time = millis() / 1000 //in seconds
  const timeCycle = (time / loopTime) % 1 // goes from 0 to 1 over duration (we are setting up for radians)
  let angleCircle = map(timeCycle, 0, 1, 0, 2 * PI) // to loop from 0 to 2PI radians

  stroke(0, 175, 150)
  strokeWeight(7.5)
  noFill()
  arc(x, y, radius, radius, 0 - PI / 2, angleCircle - PI / 2, OPEN)
  // arc(x, y, w, h, start, stop, [mode], [detail])
}

function oneSecond() {
  debugCounter++
}

function mouseClicked() {}

function randomPainter() {
  let cSize = 25
  let cColorR = 0
  let cColorG = 0
  let cColorB = 0

  let xMod = sliderX.value() // 0-5
  let yMod = sliderY.value() // 0-1
  let sizeMod = sliderSize.value() //1.75-3

  let mappedxMod = map(xMod, 0, 5, width + 200, 0)
  let mappedyMod = map(yMod, 0, 1, height, 0)
  let mappedsizeMod = map(sizeMod, 1.75, 3, 1, 30)

  let mappedMouseX = map(mouseX, 0, width, 150, 255)
  let mappedMouseY = map(mouseY, 0, height, 150, 255)

  let cX = random(0, mappedxMod)
  let cY = random(0, mappedyMod)

  cSize = random(20, 50)
  cColorR = random(50)
  cColorG = random(255)
  cColorB = random(200)

  frameRate(mappedsizeMod)

  noStroke()
  if (magicMouse) {
    fill(random(50, 255), random(50, 255), random(50, 255), 60)
    circle(mouseX, mouseY, random(50, 60))
  } else {
    fill(cColorR, cColorG, cColorB, 60)
  }

  circle(cX, cY, cSize)
}

let pyrSize = 100
let pyrStrokeVar = 5
function pyramid() {
  let xMod = sliderX.value() // 0-5
  let yMod = sliderY.value() // 0-5
  let sizeMod = sliderSize.value() //1.75-3

  let mappedxMod = map(xMod, 0, 5, 0, 600)
  let mappedyMod = map(yMod, 0, 1, 0.25, 3)
  let mappedsizeMod = map(sizeMod, 1.75, 3, 20, 60)
  let mappedMouseX = map(mouseX, 0, width, 50, 255)
  let mappedMouseY = map(mouseY, 0, height, 50, 255)

  frameRate(mappedsizeMod)

  pyrSize = random(0, mappedxMod)
  pyrStrokeVar = random(3, mappedyMod)
  stroke(0)
  strokeWeight(pyrStrokeVar)

  if (magicMouse) {
    fill(mappedMouseX, mappedMouseY, 1 / mappedMouseX + 1 / mappedMouseY, 10)
  } else {
    fill(255, 255, 255, 10)
  }

  rect(width / 2 - pyrSize / 2, height / 2 - pyrSize / 2, pyrSize)
}

function circleBounce() {
  let circleX = 50
  let circleY = 50
  let speedInit = 5
  let xSpeed = speedInit
  let ySpeed = speedInit
  // clear out old frames
  background(32)

  // draw current frame based on state
  circle(circleX, circleY, 50)

  // modify state
  circleY = circleY + ySpeed
  circleX = circleX + xSpeed

  // bounce off bottom
  if (circleY > height - 25 || circleY < 25) {
    ySpeed = ySpeed * -1
  }

  if (circleX - 25 < 0 || circleX > width - 25) {
    xSpeed = xSpeed * -1
  }
}
function drawFlower(offset) {
  let flowerX = offset
  let flowerY = offset
  let petalSize = 100
  let petalDistance = petalSize / 2
  noStroke()
  fill(200, 0, 0, 40)
  circle(flowerX - petalDistance, flowerY - petalDistance, petalSize)
  circle(flowerX + petalDistance, flowerY - petalDistance, petalSize)
  circle(flowerX - petalDistance, flowerY + petalDistance, petalSize)
  circle(flowerX + petalDistance, flowerY + petalDistance, petalSize)
  fill(200, 100, 0, 40)
  circle(flowerX, flowerY, petalSize)
}
function painter() {
  // noStroke()
  // fill(0, 0, 0, 60)
  // circle(mouseX, mouseY, width / 20)
}
function test1() {
  let x = 0
  let dirUp = true

  //
  if (x < 255 && dirUp) {
    x += 1
  } else {
    x -= 1
    dirUp = false
  }

  if (x < 0) {
    dirUp = true
  }

  background(x)
  setCenter(width / 2, height / 2)
  stroke(255, x / 8.8, x / 10)
  polarLines(x / 3, x / 3, x)
  polarLines(x / 3, x / 10, x / 2)
  polarLines(x / 3, x / 15, x / 8)
  polarLines(x / 3, x / 19, x / 15)
}

//set color before drawing things
// stroke, fill, etc RGB 0-255

// ordering matters. layers

//print()  //print to console
