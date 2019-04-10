// Drawing of a simple flower using Bezier Curves.
// Based on my own code from the Open University 'Mass Collaboration' Book
// on Computer Art using Java Processing (c) 2013 and 2019
// 'Beginning Graphics Programming with Processing 3'
// ISBN-10: 1790413001 ISBN-13: 978-1790413003

// John Wilson, Sussex.


// Needs p5.js(https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.js), opensimplexnoise.js
//
// if opensimplexnoise is not available, simply use
// p5.js own perlin Noise generator by setting
// 'kSimplexMode' to false and setting 'simplexNoise' to null

// Constants
const kSimplexMode = true ;
const simplexNoise = new openSimplexNoise(100);
let noiseAmp = 120; //random(10,120) ;

const demoTimeOut = 120;

const kFrameRate = 24;

const kRadius = 20.0;
const kTilt = 60.0;
const kPetalLength = 220.0; // try 250 and 1024.0f as a starter
const kRo = 25.0;
const kStep = 10.0;
const kShowCP = false;
const kRotationSpeed = 0.0625; // Revs per second
const kAnimate = true;
const kMovement = true;
const kStemFlower = true;
const kInterpColours = true;
const kMotionBlur = false;
const kHideInstructions = true;
const kShowInstructions = false;
const kNoStrokeFlag = false;

// Auto Animation Constants
const kTiltPeriod = 10.0;
const kLowestTilt = 40.0;
const kHighestTilt = 96.0;

const kPetalPeriod = 30.0;
const kLowestPetals = 4.0;
const kHighestPetals = 40.0;



// Display On-Screen Text instructions
let hideInstructions = kHideInstructions;
let instructionXPOS = 6;
let instructionYPOS = 30;
let instructionFontHeight = 16;
let font;



// Flower Colour
let flowerCol;
let petalCol;
let stemCol;
let noiseyPetalCol;



// Screen Constants - initialised
// in the 'setup' function

let displayWidth;
let displayHeight;
let movementAmplitude;

// Centre point for our flower's transformations.
let CX;
let CY;


let radius;
let tilt;
let petalLength;
let ro;
let step;
let numpetals;
let tht = 0;
let rotSpeed;
let showControlPoints = kShowCP;
let animation = kAnimate;
let movement = kMovement;
let stemFlower = kStemFlower;
let interpColours = kInterpColours;
let motionBlur = kMotionBlur;
let noStrk = kNoStrokeFlag;
let noiseyMode = false;

let moveTime = 0;
let animTime = 0;
let phaseTime = 0;
let time = 0;

let dMode = 0;

function setup() {
  textFont('Georgia');

  flowerCol = color(255, 0, 0, 40);
  petalCol = color(200, 200, 25, 40);
  noiseyPetalCol = color(255, 255, 0, 40);
  stemCol = color(255, 255, 0, 40);

  tht = 0;

  resetPetalParameters();

  displayWidth = 700;
  displayHeight = 600;

  CX = displayWidth / 2;
  CY = displayHeight / 2;

  // One off starting values
  animation = kAnimate;
  movement = kMovement;
  interpColours = kInterpColours;
  motionBlur = kMotionBlur;


  movementAmplitude = petalLength / 4;

  createCanvas(displayWidth, displayHeight, P2D);

}


function draw() {
  let dt = 1 / kFrameRate; // We should calculate dt - time  passed since last update-draw
  //dt = 0.01 ;

  //  console.log(" moveTime = " + moveTime + ' AnimationTime '+animTime + ' animation ' + animation) ;
  time += dt;

  if (movement) {
    moveTime += dt;
  } else {
    moveTime = 0;
  }

  drawFlowers();
  drawInstructions();
  drawInfoHud();

  tht = tht + dt * 360 * rotSpeed;

  if (animation) {
    animTime += dt;
    tilt = (sinFunction(kLowestTilt, kHighestTilt, animTime, kTiltPeriod, 0.0));
    numpetals = sinFunction(kLowestPetals, kHighestPetals, animTime, kPetalPeriod, 0.0);
    numpetals = (Math.max(1, numpetals));
    step = 360.0 / numpetals;
    //petalLength = sinFunction(40.0f,260.0f,animTime,kPetalPeriod,0.0f) ;
  }

  noiseAmp = sinFunction(10, 20, phaseTime, 30, 0.0);
  phaseTime += (dt);

  if (time > demoTimeOut) {
    demoMode();
  }

}



class NoiseShape {

  simplex = kSimplexMode;
  id = random(10, 1000);
  rad = 1.3;
  freq = 2;
  numPixels = 500;
  seed = random(10, 1000);


  //abstract PVector getVectorFromT( t) ;
  //abstract void drawPoint(float x, float y) ;

  constructor(smode = kSimplexMode) {
    this.setSimplexMode(smode);
  }

  setSimplexMode(simplex) {
    this.simplex = simplex;
  }

  noiseEval(x, y, z, t) {
    return this.simplex ? simplexNoise.noise4D(x, y, z, t) : noise(x, y, z);
  }

  draw() {
    this.drawShape();
  }

  drawShape() {
    fill(noiseyPetalCol);

    beginShape();
    for (let pixel = 0; pixel < this.numPixels; pixel++) {

      let t = 1.0 * pixel / (this.numPixels - 1);


      let wt = TWO_PI * (this.freq * t - phaseTime);
      let cs = this.rad * Math.cos(wt);
      let sn = this.rad * Math.sin(wt);

      let pos = this.getVectorFromT(t);

      pos.x += noiseAmp * this.noiseEval(this.seed + cs, sn, this.id, 0);
      pos.y += noiseAmp * this.noiseEval(2 * this.seed + cs, sn, this.id, 0);

      this.drawPoint(pos.x, pos.y);
    }
    endShape();

  }

  drawSinglePoint() {

    for (let pixel = 0; pixel < this.numPixels; pixel++) {

      let t = 1.0 * pixel / (this.numPixels - 1);


      let wt = TWO_PI * (this.freq * t - phaseTime);
      let cs = rad * Math.cos(wt);
      let sn = rad * Math.sin(wt);

      let pos = getVectorFromT(t);
      pos.x += noiseAmp * this.noiseEval(this.seed + cs, sn, this.id, 0);
      pos.y += noiseAmp * this.noiseEval(2 * this.seed + cs, sn, this.id, 0);

      this.drawSinglePoint(pos.x, pos.y);
    }

  }

}


class PetalThing extends NoiseShape {

  cps = [];

  constructor() {
    super();
  }

  setControlPoints(cps) {
    this.cps = cps;
  }

  getVectorFromT(t) {
    let pVector = new PVector();
    pVector.x = bezierPoint(this.cps[0].x, this.cps[1].x, this.cps[2].x, this.cps[3].x, t);
    pVector.y = bezierPoint(this.cps[0].y, this.cps[1].y, this.cps[2].y, this.cps[3].y, t);
    return pVector;
  }

  drawPoint(x, y) {
    strokeWeight(0.25);
    vertex(x, y);
  }

  drawSinglePoint(x, y) {
    strokeWeight(0.25);
    stroke(0);
    point(x, y);
  }

}

// Support functions

function interpolate(startValue, endValue, nTime) {
  return (endValue - startValue) * nTime + startValue;
}


function interpolateColour(startcol, endcol, nTime) {
  const rCol = interpolate(red(startcol), red(endcol), nTime);
  const gCol = interpolate(green(startcol), green(endcol), nTime);
  const bCol = interpolate(blue(startcol), blue(endcol), nTime);
  const aCol = interpolate(alpha(startcol), alpha(endcol), nTime);
  return color(rCol, gCol, bCol, aCol);


}


function degreesToRadians(th) {
  return PI * th / 180.0;
}


// Draw Noisey version of a petal

const noiseypetals = [];

function drawPetalNoisey(cps, col, number) {
  let pt;
  if (noiseypetals[number] === undefined) {
    pt = new PetalThing();
    noiseypetals[number] = pt;
  }

  pt = noiseypetals[number];
  pt.setControlPoints(cps);

  pt.draw();
}


// Draw a Cubic Bezier Petal from
// four Vector points
// PVector, colour

function drawPetal(cps, col) {
  fill(col);

  if (noStrk) {
    noStroke();
  } else {
    stroke(0, 0, 0);
  }

  bezier(cps[0].x, cps[0].y, cps[1].x, cps[1].y, cps[2].x, cps[2].y, cps[3].x, cps[3].y);
}



// Draw Control Point lines
// from our four Vector points

//void drawControlPoints(PVector[] cps)
function drawControlPoints(cps) {
  stroke(255, 0, 0);
  line(cps[0].x, cps[0].y, cps[1].x, cps[1].y);
  stroke(0, 255, 0);
  line(cps[2].x, cps[2].y, cps[3].x, cps[3].y);
}

// PVector [] calcControlPoints(float angle,float ro,float  radius,float tilt,float petalLength)
function calcControlPoints(angle, ro, radius, tilt, petalLength) {
  //console.log('calcControlPoints angle ' + angle + ' ro: ' + ro + ' ' + radius + ' tilt ' + tilt + ' ' + petalLength) ;

  //PVector [] bezControlPoints = new PVector[4] ;
  let bezControlPoints = new Array(4);

  let halfRo = ro / 2.0;

  let cPoints = calcPetalPointPair(angle - halfRo, tilt, petalLength);
  let startPt = cPoints[0];
  let fPoint = cPoints[1];


  bezControlPoints[0] = new PVector(startPt.x * radius, startPt.y * radius);
  bezControlPoints[1] = new PVector(startPt.x * radius + fPoint.x, startPt.y * radius + fPoint.y);



  let cPoints2 = calcPetalPointPair(angle + halfRo, -tilt, petalLength);
  startPt = cPoints2[0];
  fPoint = cPoints2[1];

  bezControlPoints[3] = new PVector(startPt.x * radius, startPt.y * radius);
  bezControlPoints[2] = new PVector(startPt.x * radius + fPoint.x, startPt.y * radius + fPoint.y);


  return bezControlPoints;

}

// Calculates the control point line (Pair of 2D Vectors)
//
//PVector[] calcPetalPointPair(float angle,float tilt,float petalLength)
function calcPetalPointPair(angle, tilt, petalLength) {
  //console.log('>>>>>>calcPetalPointPair angle = ' + angle + ' tilt ' + tilt + ' petalLength ' + petalLength) ;

  let cMatTest = new PMatrix2D(0, 0, 0.0, 0, 0, 0.0);

  let startPt = new PVector(Math.sin(degreesToRadians(angle)), Math.cos(degreesToRadians(angle)));

  let vert = new PVector(0, 0, 1.0); // Unit Vector Perp  to XY Plane
  let nCPc = startPt.cross(vert); // Calculate Tangent to Circle at startPt.x,startPt.y


  //PMatrix2D iMat = new PMatrix2D() ;
  let iMat = new PMatrix2D();
  iMat.rotate(degreesToRadians(tilt < 0 ? 180 + tilt : tilt)); //  Petal Tilt

  //PMatrix2D cMat = new PMatrix2D(nCPc.x,startPt.x,0.0f,nCPc.y,startPt.y,0.0f) ;
  let cMat = new PMatrix2D(nCPc.x, startPt.x, 0.0, nCPc.y, startPt.y, 0.0);

  // Matrix
  // | nCPc.x  startx |
  // | nCPc.y  starty |


  cMat.preApply(iMat); // Apply our othog axis to the  rotation matrix


  let fPoint = new PVector();
  let sPoint = new PVector(petalLength, 0); // Petal Length

  cMat.mult(sPoint, fPoint); // Apply Full transformation to petal Vector

  let points = new Array(2);
  points[0] = startPt;
  points[1] = fPoint;

  //console.log('<<<<<<<calcPetalPointPair Complete')

  return points;

}


// sinFunction,cosFunction - Helper functions for auto animation of Parameter values
// Parameters are changed over a 'period' of time (in seconds)
// From startValue to endValue - optional phase
// timeF is the current Time in seconds

function cosFunction(startValue, endValue, timeF, period, phase) {
  return sinFunction(startValue, endValue, timeF, period, phase + HALF_PI);
}

function sinFunction(startValue, endValue, timeF, period, phase) {
  const yI = (startValue + endValue) / 2;
  const freq = 1.0 / period;
  const amp = endValue - yI;
  return yI + amp * Math.sin(TWO_PI * timeF * freq + phase);
}


function drawFlower(stemRadius, stepSize, numPetals, roAng, tiltAng, thtAng, petalLen, col) {

  //draw circle at 0,0 size stemRadius ;
  //console.log('>>>>>drawFlower thtAng ' + thtAng ) ;
  fill(stemCol);
  ellipseMode(RADIUS);

  if (noStrk) {
    noStroke();

  } else {
    stroke(0, 0, 0.40);
  }
  if (noiseyMode) {
    strokeWeight(0.0);
  } else {
    strokeWeight(0.6);
  }
  ellipse(0, 0, stemRadius, stemRadius);
  strokeWeight(0.4);



  let petalNum = 0;

  for (let angle = 0.0; angle < stepSize * numPetals; angle += stepSize) {
    //console.log('Angle ' + angle) ;

    let cps = calcControlPoints(angle + thtAng, roAng, stemRadius, tiltAng, petalLen);

    let iCol;
    if (interpColours) {
      const endcol = color(blue(col), green(col), red(col), alpha(col));
      iCol = interpolateColour(col, endcol, petalNum / numPetals);
    } else {
      iCol = col;
    }


    if (noiseyMode) {
      drawPetalNoisey(cps, iCol, petalNum);
    } else {
      drawPetal(cps, iCol);
    }

    petalNum++;

    if (showControlPoints) {
      drawControlPoints(cps);
    }
  }

}

// Main draw functions
function drawFlowers() {

  smooth();
  fill(255, 255, 255, motionBlur ? 40 : 255);
  rect(0, 0, width - 1, height - 1);


  // drawMiniFlowers() ;


  push();

  translate(CX + sinFunction(-movementAmplitude, movementAmplitude, moveTime, 10.0, 0.0),
    CY + sinFunction(movementAmplitude, -movementAmplitude, moveTime, 20.0, 0.0));

  drawFlower(radius, step, numpetals, ro, tilt, tht, petalLength, flowerCol);

  if (stemFlower) {
    drawFlower(radius, 720.0 / numpetals,
      numpetals / 2, ro,
      tilt, tht + 20.0, petalLength / 4, petalCol);
  }

  pop();


}

// Display Mini Random Background flowers

function drawMiniFlowers() {

  for (let i = 0; i < 6; i++) {
    push();
    let pLen = 60.0;
    let xpos = random(pLen, displayWidth - pLen);
    let ypos = random(pLen, displayHeight - pLen);
    translate(xpos, ypos);
    drawFlower(2.0, step, numpetals, ro, tilt, tht + i * 20, pLen, flowerCol);
    pop();
  }
}

// Reset Parameters to Default Values

function resetPetalParameters() {

  radius = kRadius;
  tilt = kTilt;
  petalLength = kPetalLength;
  ro = kRo;
  step = kStep;
  numpetals = 360.0 / kStep;
  rotSpeed = kRotationSpeed;
  showControlPoints = kShowCP;
  animation = kAnimate; //;
  movement = kMovement; //;
  stemFlower = kStemFlower;
  interpColours = kInterpColours;
  motionBlur = kMotionBlur;
  hideInstructions = kHideInstructions;
  noStrk = kNoStrokeFlag;
  noiseyMode = false;
  time = 0;


}





// Handle keyboard input which
// allows the user to set
// various paramters
// namely -
// petalLength,petal Tilt
// and number of petals
//
// We can also toggle the
// display of control point lines


function keyPressed() {
  time = 0;

  if (keyCode == UP_ARROW) {
    tilt = tilt + 2;
  } else if (keyCode == DOWN_ARROW) {
    tilt = tilt - 2;
  } else if (keyCode == LEFT_ARROW) {
    petalLength = petalLength - 8;
  } else if (keyCode == RIGHT_ARROW) {
    petalLength = petalLength + 8;
  } else if ((key == '=') || (key == '+')) {

    numpetals = numpetals + 1;
    numpetals = Math.max(1, numpetals);
    step = 360.0 / numpetals;

  } else if ((key == '-') || (key == '_')) {

    numpetals = numpetals - 1;
    numpetals = Math.max(1, numpetals);
    step = 360.0 / numpetals;

  } else if ((key == 'c') || (key == 'C')) {
    showControlPoints = !showControlPoints;
  } else if ((key == 'r') || (key == 'R')) {
    resetPetalParameters();
  } else if ((key == 'd') || (key == 'D')) {
    demoMode();
  } else if ((key == 'a') || (key == 'A')) {
    animation = !animation;
    if (!animation) {
      numpetals = numpetals;
    }
  } else if ((key == 'm') || (key == 'M')) {
    movement = !movement;
  } else if ((key == 's') || (key == 'S')) {
    stemFlower = !stemFlower;

  } else if ((key == 'i') || (key == 'I')) {
    interpColours = !interpColours;
  } else if ((key == 'b') || (key == 'B')) {
    motionBlur = !motionBlur;
  } else if ((key == 'n') || (key == 'N')) {
    noStrk = !noStrk;
  } else if ((key == 'h') || (key == 'H')) {
    hideInstructions = !hideInstructions;
  } else if ((key == 'o') || (key == 'O')) {
    noiseyMode = !noiseyMode;
  }


}


let demonstrations = [demoMode1, demoMode2, demoMode3, demoMode4];

function demoMode() {
  return demonstrations[dMode++ % demonstrations.length]();
}


function demoMode1() {
  console.log("DEMO MODE 1");

  hideInstructions = true;
  rotation = true;
  movement = true;
  animation = true;
  numpetals = 4;
  animTime = 0;
  phaseTime = 0;
  moveTime = 0;
  noStrk = true;
  noiseyMode = true;
  motionBlur = false;
  stemFlower = true;
  time = 0;

}

function demoMode2() {
  console.log("DEMO MODE 2");

  hideInstructions = true;
  rotation = true;
  movement = true;
  animation = true;
  numpetals = 4;
  animTime = 0;
  phaseTime = 0;
  moveTime = 0;
  noStrk = false;
  noiseyMode = true;
  motionBlur = true;
  stemFlower = true;
  time = 0;

}

function demoMode3() {
  console.log("DEMO MODE 3");

  hideInstructions = true;
  rotation = true;
  movement = true;
  animation = true;
  numpetals = 4;
  animTime = 0;
  phaseTime = 0;
  moveTime = 0;
  noStrk = true;
  noiseyMode = false;
  motionBlur = false;
  stemFlower = true;
  time = 0;

}


function demoMode4() {
  console.log("DEMO MODE 4");

  hideInstructions = true;
  rotation = true;
  movement = true;
  animation = true;
  numpetals = 4;
  animTime = 0;
  phaseTime = 0;
  moveTime = 0;
  noStrk = false;
  noiseyMode = false;
  motionBlur = false;
  stemFlower = true;
  time = 0;

}

// Display On-Screen Parameter Values

function drawInfoHud() {
  const hudXPOS = 16;
  const hudYPOS = 320;
  const hudFontHeight = 16;

  textSize(hudFontHeight);
  fill(0, 0, 255);

  if (!hideInstructions) {

    text("Petals: " + Math.round(numpetals), hudXPOS, hudYPOS);
    text("Length: " + petalLength, hudXPOS, hudYPOS + 1 * hudFontHeight);
    text("Tilt: " + Math.round(tilt), hudXPOS, hudYPOS + 2 * hudFontHeight);
    text("Animation: " + animation, hudXPOS, hudYPOS + 4 * hudFontHeight);
    text("Movement: " + movement, hudXPOS, hudYPOS + 5 * hudFontHeight);

  }

}

function drawInstructions() {
  textSize(instructionFontHeight);

  fill(0, 0, 0);
  if (!hideInstructions) {
    text("Number of Petals: '+' '-' keys", instructionXPOS, instructionYPOS + 1 * instructionFontHeight);
    text("Petal Length: LEFT/RIGHT arrow keys", instructionXPOS, instructionYPOS + 2 * instructionFontHeight);
    text("Petal Tilt: UP/DOWN arrow keys", instructionXPOS, instructionYPOS + 3 * instructionFontHeight);
    text("Show/Hide Control Point Lines: 'C' key", instructionXPOS, instructionYPOS + 4 * instructionFontHeight);
    text("Animate Petals and Tilt: 'A' key", instructionXPOS, instructionYPOS + 5 * instructionFontHeight);
    text("Move Flower: 'M' key", instructionXPOS, instructionYPOS + 6 * instructionFontHeight);
    text("Show/Hide Stem Flower: 'S' key", instructionXPOS, instructionYPOS + 7 * instructionFontHeight);
    text("Toggle Interpolate Colours: 'I' key", instructionXPOS, instructionYPOS + 8 * instructionFontHeight);
    text("Motion Blur: 'B' key", instructionXPOS, instructionYPOS + 9 * instructionFontHeight);
    text("Stroke/NoStroke: 'N' key", instructionXPOS, instructionYPOS + 10 * instructionFontHeight);
    text("Noise/No Noise: 'O' key", instructionXPOS, instructionYPOS + 11 * instructionFontHeight);

    text("Reset: 'R' key", instructionXPOS, instructionYPOS + 12 * instructionFontHeight);
  }
  if (hideInstructions) {
    textSize(12);
  }

  text("Show/Hide HELP: 'H' key", instructionXPOS, instructionYPOS);


}

// Conversion of Processing Java code - Johnny
// As of Spring 2019 - p5.js was not supporting the PVector and PMatrix2D classes
// What follows is a direct port of these two classes.

class PVector {

  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static mult(v,k) {
      let nv = new PVector(v.x, v.y, v.z) ;

      nv.x *= k ;
      nv.y *= k ;
      nv.z *= k ;
      return nv ;
  }

  static mag(v) {
      return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z) ;
  }

  add(v2) {
      this.x += v2.x ;
      this.y += v2.y ;
      this.z += v2.z ;
  }

  sub(v2) {
      this.x -= v2.x ;
      this.y -= v2.y ;
      this.z -= v2.z ;
  }

  debug() {
    console.log('PVector x:' + this.x + ", y:" + this.y + ", z:" + this.z);
  }

  cross(v2) {
    return this.crossTarget(v2,new PVector());
  }
  /**
     * Return a vector composed of the cross product between this and another.
     */

    /**
     * Perform cross product between this and another vector, and store the
     * result in 'target'. If target is null, a new vector is created.
     */
     crossTarget( v,  target) {
      let crossX = this.y * v.z - v.y * this.z;
      let crossY = this.z * v.x - v.z * this.x;
      let crossZ = this.x * v.y - v.x * this.y;

      target.x = crossX;
      target.y = crossY;
      target.z = crossZ;

      return target;
    }
}



// Conversion of Processing Java code
class PMatrix2D {

  constructor(m00 = 1, m01 = 0, m02 = 0, m10 = 0, m11 = 1, m12 = 0) {

    this.set(m00, m01, m02, m10, m11, m12);

  }

  reset() {
    this.set(1, 0, 0, 0, 1, 0);
  }

  set(m00, m01, m02, m10, m11, m12) {
    this.m00 = m00;
    this.m01 = m01;
    this.m02 = m02;

    this.m10 = m10;
    this.m11 = m11;
    this.m12 = m12;
  }

  debug() {
    console.log('m00:' + this.m00 + ", m01:" + this.m01 + ", m02:" + this.m02);
    console.log('m10:' + this.m10 + ", m11:" + this.m11 + ", m12:" + this.m12);
  }

  get() {
    let outgoing = new PMatrix2D();
    outgoing.set(this.m00, this.m01, this.m02, this.m10, this.m11, this.m12);
    return outgoing;
  }

  setMatrix(srcmatrix) {
    if (srcmatrix instanceof PMatrix2D) {
      this.set(srcmatrix.m00, srcmatrix.m01, srcmatrix.m02,
        srcmatrix.m10, srcmatrix.m11, srcmatrix.m12);
    } else {
      throw new Error("PMatrix2D.set() only accepts PMatrix2D objects.");
    }
  }

 isIdentity() {
  return ((this.m00 == 1) && (this.m01 == 0) && (this.m02 == 0) &&
          (this.m10 == 0) && (this.m11 == 1) && (this.m12 == 0));
 }

rotate( angle) {
  let s = Math.sin(angle);
  let c = Math.cos(angle);

  let temp1 = this.m00;
  let temp2 = this.m01;
  this.m00 =  c * temp1 + s * temp2;
  this.m01 = -s * temp1 + c * temp2;
  temp1 = this.m10;
  temp2 = this.m11;
  this.m10 =  c * temp1 + s * temp2;
  this.m11 = -s * temp1 + c * temp2;
}


//PVector mult(PVector source, PVector target) {
/**
  * Apply another matrix to the left of this one.
  */
  preApply( left) {
   this.preApplyValues(left.m00, left.m01, left.m02,
            left.m10, left.m11, left.m12);
  }


  preApplyValues( n00,  n01,  n02,
                      n10,  n11,  n12) {
  let t0 = this.m02;
  let t1 = this.m12;
  n02 += t0 * n00 + t1 * n01;
  n12 += t0 * n10 + t1 * n11;

  this.m02 = n02;
  this.m12 = n12;

  t0 = this.m00;
  t1 = this.m10;
  this.m00 = t0 * n00 + t1 * n01;
  this.m10 = t0 * n10 + t1 * n11;

  t0 = this.m01;
  t1 = this.m11;
  this.m01 = t0 * n00 + t1 * n01;
  this.m11 = t0 * n10 + t1 * n11;
}




mult( source,  target) {
   if (target == null) {
     target = new PVector();
   }
   target.x = this.m00*source.x + this.m01*source.y + this.m02;
   target.y = this.m10*source.x + this.m11*source.y + this.m12;
   return target;
 }

  multX( x,  y) {
   return this.m00*x + this.m01*y + this.m02;
 }


  multY( x,  y) {
   return this.m10*x + this.m11*y + this.m12;
 }

  invert() {
    determinant = this.determinant();
   if (Math.abs(determinant) <= 0.0000001) {
     return false;
   }

   const t00 = m00;
   const t01 = m01;
   const t02 = m02;
   const t10 = m10;
   const t11 = m11;
   const t12 = m12;

   this.m00 =  t11 / determinant;
   this.m10 = -t10 / determinant;
   this.m01 = -t01 / determinant;
   this.m11 =  t00 / determinant;
   this.m02 = (t01 * t12 - t11 * t02) / determinant;
   this.m12 = (t10 * t02 - t00 * t12) / determinant;

   return true;
 }

 transpose() {
   throw new Error("PMatrix2D.transpose not yet supported");

 }

 determinant() {
   return this.m00 * this.m11 - this.m01 * this.m10;
 }

}
