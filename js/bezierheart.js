// Constants
const kSimplexMode = true;
const simplexNoise = new openSimplexNoise(100);
let noiseAmp = 120; //random(10,120) ;


const kFrameRate = 24;
const heartHeight = 340;

let time = 0;
let heart2, heart3;

function setup() {

  displayWidth = 700;
  displayHeight = 600;
  const f = 0.75;

  heart2 = new Heart(heartHeight, 15, 380, 65, 420);
  heart3 = new Heart(f * heartHeight, 15, f * 380, 65, 420);

  let cnv = createCanvas(displayWidth, displayHeight, P2D);
  cnv.parent("sketch-holder")

}


function draw() {
  let dt = 1 / kFrameRate; // We should calculate dt - time  passed since last update-draw
  time += dt;


  heart2.update(0.15);
  heart3.update(0.15);

  push();
  translate(displayWidth/2,displayHeight/2) ;
  scale(0.5) ;

  heart2.draw();
  heart3.draw();
  pop();

}


function degreesToRadians(th) {
  return PI * th / 180.0;
}


class ShapeInf {

   getPos(tValue) {
     throw Error("Abstract") ;
   }

}

class BezierShape extends ShapeInf {
  cp;

  constructor(cpa) {
    super() ;
    this.cp = [];

    this.create(cpa[0], cpa[1], cpa[2], cpa[3]);
  }

  // start, p1, p2, end
  create(cp0, cp1, cp2, cp3) {

    const cp = this.cp;

    cp[0] = new PVector();
    cp[0].x = cp0.x;
    cp[0].y = cp0.y;


    cp[1] = new PVector();
    cp[1].x = cp1.x;
    cp[1].y = cp1.y;

    cp[2] = new PVector();
    cp[2].x = cp2.x;
    cp[2].y = cp2.y;

    cp[3] = new PVector();
    cp[3].x = cp3.x;
    cp[3].y = cp3.y;


  }

  getPos(tValue) {
    let pv = this.calcBezierT(tValue, this.cp[0], this.cp[1], this.cp[2], this.cp[3]);
    return pv;
  }


  calcBezierT(tValue, p0, p1, p2, p3) {

    let p = new PVector();
    p.x = bezierPoint(p0.x, p1.x, p2.x, p3.x, tValue);
    p.y = bezierPoint(p0.y, p1.y, p2.y, p3.y, tValue);
    return p;
  }

}

class NoiseyCurve {

  seed = random(1, 1000);

  numPts = 3000;

  amp = 15; // 15
  maginfy = 1.5; // 2
  freq = 40 / 3; // 40/3
  phaseRate = 12;
  phaseTime = 0;
  shape;
  id = 0;
  simplex = true;

  constructor(id, shape) {
    this.id = id;
    this.shape = shape;
  }

  noiseEval(x, y, z, t) {
    // return kSimplexMode ? simplexNoise.noise4D(x, y, z, t) : noise(x, y, z * (t + 1));
    return simplexNoise.noise4D(x, y, z, t) ;

  }

  ndraw() {

    let u = 0.5;
    const spreadFactor = 32; // determines the range of the two min values (higher gives lower spread)
    const rad = this.maginfy;
    for (let pixel = 0; pixel < this.numPts; pixel++) {

      const parTime = 1.0 * pixel / this.numPts;

      const intensity = pow(2, -spreadFactor * (this.parTime - u) * (this.parTime - u)); // bell curve around 'u'
      const sineEase = 0.5 * (1 + cos(PI * (this.parTime - 1)));

      const anglePhase = TWO_PI * this.freq * this.parTime - this.phaseRate * this.phaseTime;
      const cAngle = rad * cos(anglePhase);
      const sAngle = rad * sin(anglePhase);
      const nx = this.noiseEval(2 * this.seed + cAngle, sAngle, 17 * this.parTime, this.id);
      const ny = this.noiseEval(3 * this.seed + cAngle, sAngle, 17 * this.parTime, this.id);
      const dx = intensity * this.amp * nx;
      const dy = intensity * this.amp * ny;

      //stroke(255, (1 - sineEase) * 255);
      //strokeWeight(2.0);
      let pos = this.shape.getPos(parTime);
      console.log("NoiseyCurve:draw",pos.x, pos.y) ;

      point(pos.x + dx, pos.y + 3 * dy);
    }
  }

  draw() {
    const u = 0.5;
    const spreadFactor = 32; // determines the range of the two min values (higher gives lower spread)
    const rad = this.maginfy;

    for (let pixel = 0; pixel < this.numPts; pixel++) {

      const parTime = 1.0 * pixel / this.numPts;
      const intensity = 1 ; //pow(2, -spreadFactor * (this.parTime - u) * (this.parTime - u)); // bell curve around 'u'
      const sineEase = 0.5 * (1 + cos(PI * (this.parTime - 1)));

      const anglePhase = TWO_PI * this.freq * this.parTime - this.phaseRate * this.phaseTime;
      const cAngle = rad * cos(anglePhase);
      const sAngle = rad * sin(anglePhase);
      const nx = this.noiseEval(2 * this.seed + cAngle, sAngle, 17 * this.parTime, this.id);
      const ny = this.noiseEval(3 * this.seed + cAngle, sAngle, 17 * this.parTime, this.id);
      const dx =  intensity * this.amp * nx;
      const dy =  intensity * this.amp * ny;


      stroke(0);
      strokeWeight(2.0);
      let pos = this.shape.getPos(parTime);
      //point(pos.x, pos.y);
      point(pos.x + dx, pos.y + 3 * dy);

    }
  }



  update(dt) {
    this.phaseTime += dt;
  }


}

class CurveShape {
  curves;

  constructor() {
    this.curves = [];

  }

  update(dt) {
    for (let curveNum = 0; curveNum < this.curves.length; curveNum++) {
      this.curves[curveNum].update(dt);
    }
  }

  draw() {
    for (let curveNum = 0; curveNum < this.curves.length; curveNum++) {
      this.curves[curveNum].draw();
    }
  }

}



class Heart extends CurveShape {


  cps;
  rcps;



  constructor(hheight, bottomAngle, bottomLength, topAngle, topLength) {

    super();
    this.cps = [];
    this.rcps = [];

    const cps = this.cps;
    const rcps = this.rcps;
    const curves = this.curves;

    cps[0] = new PVector(0, hheight / 2);
    cps[3] = new PVector(0, -hheight / 2);

    cps[1] = new PVector(bottomLength, 0);
    cps[1].rotate(degreesToRadians(-bottomAngle));
    cps[1].y += -cps[3].y;

    cps[2] = new PVector(topLength, 0);
    cps[2].rotate(degreesToRadians(-topAngle));
    cps[2].y += cps[3].y;

    curves[0] = new NoiseyCurve(0, new BezierShape(cps));

    rcps[0] = new PVector(0, hheight / 2);
    rcps[3] = new PVector(0, -hheight / 2);

    rcps[1] = new PVector(-bottomLength, 0);
    rcps[1].rotate(degreesToRadians(bottomAngle));
    rcps[1].y += -rcps[3].y;

    rcps[2] = new PVector(-topLength, 0);
    rcps[2].rotate(degreesToRadians(topAngle));
    rcps[2].y += rcps[3].y;


    curves[1] = new NoiseyCurve(1, new BezierShape(rcps));

  }


  drawControlPoints() {
    const cps = this.cps;
    const rcps = this.rcps;

    ellipse(cps[0].x, cps[0].y, 4, 4);
    ellipse(cps[1].x, cps[1].y, 4, 4);
    ellipse(cps[2].x, cps[2].y, 4, 4);
    ellipse(cps[3].x, cps[3].y, 4, 4);


    ellipse(rcps[0].x, rcps[0].y, 4, 4);
    ellipse(rcps[1].x, rcps[1].y, 4, 4);
    ellipse(rcps[2].x, rcps[2].y, 4, 4);
    ellipse(rcps[3].x, rcps[3].y, 4, 4);

  }

  draw() {

    super.draw();
    this.drawControlPoints() ;
  }

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

  static mult(v, k) {
    let nv = new PVector(v.x, v.y, v.z);

    nv.x *= k;
    nv.y *= k;
    nv.z *= k;
    return nv;
  }

  static mag(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  }

  rotate(theta) {
    const temp = this.x;
    const sn = Math.sin(theta);
    const cs = Math.cos(theta);
    this.x = this.x * cs - this.y * sn
    this.y = temp * sn + this.y * cs;
    return this;
  }


  add(v2) {
    this.x += v2.x;
    this.y += v2.y;
    this.z += v2.z;
  }

  sub(v2) {
    this.x -= v2.x;
    this.y -= v2.y;
    this.z -= v2.z;
  }

  debug() {
    console.log('PVector x:' + this.x + ", y:" + this.y + ", z:" + this.z);
  }

  cross(v2) {
    return this.crossTarget(v2, new PVector());
  }
  /**
   * Return a vector composed of the cross product between this and another.
   */

  /**
   * Perform cross product between this and another vector, and store the
   * result in 'target'. If target is null, a new vector is created.
   */
  crossTarget(v, target) {
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

  rotate(angle) {
    let s = Math.sin(angle);
    let c = Math.cos(angle);

    let temp1 = this.m00;
    let temp2 = this.m01;
    this.m00 = c * temp1 + s * temp2;
    this.m01 = -s * temp1 + c * temp2;
    temp1 = this.m10;
    temp2 = this.m11;
    this.m10 = c * temp1 + s * temp2;
    this.m11 = -s * temp1 + c * temp2;
  }


  //PVector mult(PVector source, PVector target) {
  /**
   * Apply another matrix to the left of this one.
   */
  preApply(left) {
    this.preApplyValues(left.m00, left.m01, left.m02,
      left.m10, left.m11, left.m12);
  }


  preApplyValues(n00, n01, n02,
    n10, n11, n12) {
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




  mult(source, target) {
    if (target == null) {
      target = new PVector();
    }
    target.x = this.m00 * source.x + this.m01 * source.y + this.m02;
    target.y = this.m10 * source.x + this.m11 * source.y + this.m12;
    return target;
  }

  multX(x, y) {
    return this.m00 * x + this.m01 * y + this.m02;
  }


  multY(x, y) {
    return this.m10 * x + this.m11 * y + this.m12;
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

    this.m00 = t11 / determinant;
    this.m10 = -t10 / determinant;
    this.m01 = -t01 / determinant;
    this.m11 = t00 / determinant;
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
