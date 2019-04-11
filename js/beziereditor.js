// Advanced Bezier curve editor with Animation
// Shows how the Bezier point is calculated on a quadratic curve
// by displaying the recursive line segments which make up the
// curve.
// Using your mouse - click on either the end points (drawn as squares) or
// the control points (drawn as circles) and drag it to its new position.
// Releasing the mouse will set the new position for the selected point.
// You can reset the Bezier curve to its default definition and position by pressing the
// 'R' key.
// You can also set the animation of curve by selecting :-
// 'P' to Pause/Restart Animation
// 'A' to hide/show Animation
// '+'/'-' to increase/decrease Animation speed

// EditPoint. Support class to represent edit point type
// This currently replaces a Java 'Enum' which, at the time of writing
// is not yet supported on Processing 2.

// Based on my own code from the Open University 'Mass Collaboration' Book
// on Computer Art using Java Processing (c) 2013 and 2019
// 'Beginning Graphics Programming with Processing 3'
// ISBN-10: 1790413001 ISBN-13: 978-1790413003

// John Wilson, Sussex.


// Needs p5.js(https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.js), opensimplexnoise.js
//


// EditPoint. Support class to represent edit point type
// This currently replaces a Java 'Enum' which, at the time of writing
// is not yet supported on Processing 2.

class EditPoint
{
  static NullPoint     = 0;
  static StartPoint    = 1;
  static EndPoint      = 2;
  static ControlPoint1 = 3;
  static ControlPoint2 = 4;
}

const kFrameRate = 24 ;
const SIZEOFPOINT = 4.0 ;


// Start and End Points of our Bezier Curve
let startPt, endPt ;

// Control Points of our Cubic Bezier Curve
let ctlPt1, ctlPt2 ;

let editMode  = false;
let currentEditPoint ;

// parametric value 't'
let tV ;
let speed = 1 ;
let animate = true ;
let lastSpeedValue = 1 ;



let sWidth ;
let sHeight ;


function setup() {

  const pv = new PVector() ;
  PVector.mult(pv,22) ;

  sWidth = 640 ;
  sHeight = 480 ;

  startPt    =  new PVector() ;
  endPt      =  new PVector() ;
  ctlPt1     =  new PVector() ;
  ctlPt2     =  new PVector() ;

  let cnv = createCanvas(sWidth, sHeight, P2D);
  cnv.parent("sketch-holder")

  stroke(255);
  ellipseMode(CENTER);
  rectMode(CENTER);

  resetPointsAndEditMode() ;


}

//function windowResized() {
//  resizeCanvas(windowWidth, windowHeight);
//}

function draws() {
  fill(255,0,255) ;
  stroke(1)
  strokeWeight(1.2);

  rect(200, 200, 60,60);


}
function draw() {

  smooth();
  background(255);
  noFill() ;
  strokeWeight(0.2);
  rect(width/2, height/2, width - 1 ,height - 1);

  let dt = 1 / kFrameRate; // We should calculate dt - time  passed since last update-draw

  drawLabel("P - Pause/Restart Animation, A - Show/Hide Animation, +/- Increase/Decrease Speed, R - Reset",
  new PVector(70,20)) ;


  noFill() ;
  stroke(1);

  strokeWeight(0.8);


  /**
 * The first two parameters for the bezier() function specify the
 * first point in the curve and the last two parameters specify
 * the last point. The remaining four middle parameters set the control points
 * that define the shape of the curve.
 */

  bezier(startPt.x, startPt.y, ctlPt1.x, ctlPt1.y, ctlPt2.x, ctlPt2.y, endPt.x, endPt.y);
  strokeWeight(1);


  if (!editMode)
  {

    // Draw start and end Markers
    drawEditPoint(EditPoint.StartPoint) ;
    drawEditPoint(EditPoint.EndPoint) ;

  // Draw Control Points
    drawEditPoint(EditPoint.ControlPoint1) ;
    drawEditPoint(EditPoint.ControlPoint2) ;
  }

  if (animate)
  {

    drawControlLines() ;
    drawBezierT(tV) ;

    drawLabel("t = "+((int)(tV*100))/100.0, new PVector(70,40));

    tV += (dt * speed * 0.01) ;

    if (tV > 1)
    {
      tV = 0.0 ;
    }
    drawLabels() ;

  }

}


function resetPointsAndEditMode()
{
  stopEditing() ;
  const fract = 8 ;
  startPt.x  =    width / fract  ;
  startPt.y  =    height/ fract ;
  endPt.x    =  (fract - 1) * width / fract ;
  endPt.y    =  (fract - 1) * height / fract ;


  ctlPt2.x    =  endPt.x ;
  ctlPt2.y    =  startPt.y ;

  ctlPt1.x    =  (fract - 4) * width / fract ;
  ctlPt1.y    =  endPt.y ;
  animate     =  true ;
  speed       =  5 ;
  tV          =  0 ;
  showCursor() ;          // Force a cursor redraw.

}

// Set editMode flag to false and clear current edit point global.

function stopEditing() {
   editMode  =  false ;
   currentEditPoint =  EditPoint.NullPoint ;
}


// returns true if our current mouse position
// is within 10 pixels of a given x and y position.
function isMouseNear( x,  y)
{
  const dx = (mouseX - x)  ;
  const dy = (mouseY - y) ;
  return ((dx * dx + dy * dy)  < 10*10);
}


// Support function to find if any of our points used to define
// our bezier curve are near to our current mouse position
// Returns the EditPoint 'type' near to our mouse - if any.
// EditPoint.NullPoint will be returned if there is no
// point 'near' to our current mouse position.

function searchEditPoint()
{
  console.log(startPt) ;
  if (isMouseNear(startPt.x,startPt.y))
  {
    return EditPoint.StartPoint ;
  }
  if (isMouseNear(endPt.x,endPt.y))
  {
    return EditPoint.EndPoint ;
  }

  if (isMouseNear(ctlPt1.x,ctlPt1.y))
  {
    return EditPoint.ControlPoint1 ;
  }

  if (isMouseNear(ctlPt2.x,ctlPt2.y))
  {
    return EditPoint.ControlPoint2 ;
  }

  return EditPoint.NullPoint ;
}



// colourEditPoint
// The parameter 'currentPoint' is the point which we attempting to draw.
// Support function for drawing Start,End and our two control points.
// If we are currently editing a point, we fill that shape representing
// our point with a red (fill(255,0,0)) colour.

function drawEditPoint( currentPoint) {
     noFill() ;
     stroke(128) ;
     if (currentPoint == currentEditPoint) {
        fill(255,0,0) ;
     }

    // Draw one of the edit points (Control or Start/End points)

    switch(currentPoint) {

      case EditPoint.StartPoint:
          rect(startPt.x,startPt.y,SIZEOFPOINT,SIZEOFPOINT) ;
          break ;

      case EditPoint.EndPoint:
          rect(endPt.x,endPt.y,SIZEOFPOINT,SIZEOFPOINT) ;
          break ;

      case EditPoint.ControlPoint1:
          ellipse(ctlPt1.x,ctlPt1.y,SIZEOFPOINT,SIZEOFPOINT) ;
          break ;

      case EditPoint.ControlPoint2:
          ellipse(ctlPt2.x,ctlPt2.y,SIZEOFPOINT,SIZEOFPOINT) ;
          break ;

      default:
           break ;
    }

}

function drawControlLines()
{
   // Draw 'control' lines in a light grey colour
  noFill() ;
  stroke(196) ;
  line(startPt.x,startPt.y,ctlPt1.x,ctlPt1.y);
  line(ctlPt1.x,ctlPt1.y,ctlPt2.x,ctlPt2.y) ;
  line(ctlPt2.x,ctlPt2.y,endPt.x,endPt.y) ;

}

// Returns Bezier PVector based on cubic equation
// b(bt) =  P0 * (1 - t)^3 + P1 * 3 * t * (1 -t)^2 + P2 * 3 * t^2 * (1 - t) + P3 * t^3
function calcBezierT( tValue,  p0,  p1,  p2,  p3)
{
  const tsq = tValue * tValue;
  const tcb = tsq * tValue;
  const u = 1 - tValue ;

  const usq = u*u;
  const ucb = usq * u;

  let bt = PVector.mult(p0,ucb);  // b(t) = P0 * (1 - t)^3
  bt.add(PVector.mult(p1,3 * usq * tValue));  // + P1 * 3 * t * (1 -t)^2
  bt.add(PVector.mult(p2,3 * u * tsq));  // + P2 * 3 * t^2 * (1 - t)
  bt.add(PVector.mult(p3,tcb));   // P3 * t^3

  return bt;
}

// Calculate and Draw Bezier point at value tValue, geometrically
// Drawing intermediate lines needed to make this calculation.
// Label all points plotted.

function drawBezierT( tValue)
{

  const q0 = calcTLine(tValue,startPt,ctlPt1) ;
  const q1 = calcTLine(tValue,ctlPt1,ctlPt2) ;
  const q2 = calcTLine(tValue,ctlPt2,endPt) ;
  drawLabel("Q0",q0) ;
  drawLabel("Q1",q1) ;
  drawLabel("Q2",q2) ;

  drawBezLine(q0,q1, color(0,200,0)) ;
  drawBezLine(q1,q2, color(0,200,0)) ;

  const r0 = calcTLine(tValue,q0,q1) ;
  const r1 = calcTLine(tValue,q1,q2) ;
  drawLabel("R0",r0) ;
  drawLabel("R1",r1) ;

  drawBezLine(r0,r1, color(200,0,0)) ;

  const bezPt = calcTLine(tValue, r0, r1) ;
  stroke(0,0,0) ;
  fill(0,0,0) ;
  ellipse(bezPt.x, bezPt.y, 6, 6);
  drawLabel("B(t)",bezPt) ;

}

function calcTLine( tValue, startPoint,  endPoint)
{
  const dx = endPoint.x - startPoint.x ;
  const dy = endPoint.y - startPoint.y ;
  let v = new PVector() ;
  v.x = (dx * tValue)   + startPoint.x ;
  v.y = (dy * tValue)   + startPoint.y ;
  return v ;
}

function calcTLineAlternative( tValue, startPoint,  endPoint)
{
  let v = PVector.sub(endPoint, startPoint);
  const len = v.mag() ;
  v.normalize() ;
  v.mult(tValue * len) ;
  v.add(startPoint) ;
  return v ;
}



function drawPointText( txt,  x,  y)
{
  const textOffset = SIZEOFPOINT * 3 ;
  textFont(fnt,10);
  fill(0) ;
  text(txt + " (" + x + "," + y + ")",x + textOffset,y) ;
}

function drawBezLine( a,  b,  col)
{
    strokeWeight(2);
    stroke(col);
    line(a.x,a.y,b.x,b.y);
    strokeWeight(1);
    fill(col) ;
    ellipse(a.x, a.y, 4, 4);
    ellipse(b.x, b.y, 4, 4);
}

function drawLabels()
{
  drawLabel("P0",startPt) ;
  drawLabel("P1",ctlPt1) ;
  drawLabel("P2",ctlPt2) ;
  drawLabel("P3",endPt) ;
}

function drawLabel( lbl, p)
{
  fill(0) ;
  text(lbl, p.x + 4, p.y - 4) ;
}


function showMode()
{
  fill(0) ;
  textFont(fnt,10);
  text((editMode ? "edit" : ""),4,10) ;
}



function showCursor()
{
  // Using the new 'cursor' Processing 2 function
  // draw a HAND pointer if our cursor is
  // near any of the editable points.

  if (searchEditPoint() != EditPoint.NullPoint)
  {
    cursor(HAND) ;
  } else
  {
    cursor(ARROW) ;
  }

}

// moveEditPoint is called when editMode is true and we are
// dragging our mouse. Move the currentEditPoint to the same
// position as our mouse (mouseX,mouseY)

function moveEditPoint() {

    switch(currentEditPoint) {

      case EditPoint.StartPoint:
          startPt.x  =  mouseX ;
          startPt.y  =  mouseY ;
          break ;

      case EditPoint.EndPoint:
          endPt.x  =  mouseX ;
          endPt.y  =  mouseY ;
          break ;

      case EditPoint.ControlPoint1:
          ctlPt1.x  =  mouseX ;
          ctlPt1.y  =  mouseY ;
          break ;

      case EditPoint.ControlPoint2:
          ctlPt2.x  =  mouseX ;
          ctlPt2.y  =  mouseY ;
          break ;

      default:
           break ;

    }
}


// Keyboard and Mouse Event handlers
// The following functions:
// (keyPressed,mousePressed,mouseReleased,mouseDragged)
// are standard callback event handler functions
// defined in Processing, for keyboard and mouse events.


// Key Pressed Event Handler
function keyPressed()
{
  // Pressing R key resets edit mode and all points defining
  // our bezier curve.

  if (key == 'r' || key == 'R')
  {
    resetPointsAndEditMode() ;
  }

  if (key == '+' || key == '=')
  {
    speed = speed + 1 ;
    if (speed > 100)
    {
       speed  = 100 ;
    }
  }

  if (key == '-')
  {
    speed = speed - 1 ;
    if (speed < 0)
    {
       speed  = 0 ;
    }
  }

  if (key == 'A' || key == 'a')
  {
      animate = !animate ;
      if (!animate) {
        speed = 0 ;
      } else {
         speed = 1 ;
      }

  }
  if (key == 'P' || key == 'p')
  {
    if (speed == 0)
    {
       speed = lastSpeedValue ;
    } else
    {
      lastSpeedValue = speed ;
      speed = 0 ;
    }

  }

}


// Mouse events
// Mouse Pressed event handler
function mousePressed() {
    // if we are currently not editing a point -
    // search to see if we are 'near' anyone of our set of four points
    // and if found, start editing.
    console.log("mouse Pressed") ;

    if (!editMode)
    {
      currentEditPoint = searchEditPoint() ;
      if (currentEditPoint != EditPoint.NullPoint)
      {
        editMode = true ;
      }
    }
}
// Mouse Released Event Handler
function mouseReleased() {
      console.log("mouse Released") ;

      // Stop editing if we are in edit mode.
      if (editMode)
      {
        stopEditing() ;
      }
}

// Mouse Moved Event Handler
function mouseMoved()
{
  console.log("mouseMoved") ;
  showCursor() ;
}

// Mouse Dragged Event Handler
function mouseDragged()
{
    // If we are editing a control or end point
    // move that particular point to the same position
    // as our mouse.
    console.log("mouseDragged") ;

    if (editMode && currentEditPoint != EditPoint.NullPoint )
    {
          moveEditPoint() ;
    }
}

//


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
