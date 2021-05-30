const DIRECTION_VECTOR_LENGTH = 20 ;
const DIRECTION_VECTOR_ROTATE = 3.14159/2.0 ;
const PRELOAD = false ;

let numControlPoints = 16 ;
const controlPointWidth = 60 ;
const controlPointHeight = 0 ;

const controlPointStartX = 80 ;
const controlPointStartY = 200 ;

const controlPointRadius = 16 ;
const pointsPerSegment = 1000 ;

let mouseIsDragged = false ;
let editObject = null ;
let hide = false ;
let rotate = false ;

class ControlPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = controlPointRadius;
  }
  
  draw() {
      stroke(0);          // Setting the outline (stroke) to black
      fill(255);          
      ellipse(this.x, this.y, this.r, this.r);

  }  
  
  drawColour(col) {
      stroke(0);          // Setting the outline (stroke) to black
      fill(col);          
      ellipse(this.x, this.y, this.r, this.r);

  }  
 
 drawColourRGB(r,g,b) {
      stroke(0);          // Setting the outline (stroke) to black
      fill(r, g, b);          
      ellipse(this.x, this.y, this.r, this.r);

  }  
  isInside(px, py) {
    let dx = this.x - px ;
    let dy = this.y - py ;
    
    return (dx * dx + dy * dy) < (this.r * this.r) ; 
  }
  
} 


let controlPoints = [] ;
let centrePoint = new ControlPoint(400,400) ;


function setup() {
  initCanvas() ;
  if (PRELOAD) {
    loadControlPoints();
  } else {
    initControlPoints() ;
  }

}



function preload() {
  if (PRELOAD) {
    jsonData = loadJSON('points.json');
  }
}

function loadControlPoints() {
  let pointsData = jsonData.points;
  for (let i = 0; i < pointsData.length; i++) {
    let position = pointsData[i];
    // Get a position object
    // Get x,y from position
    let x = position.x;
    let y = position.y;

    // Put object in array
    controlPoints.push(new ControlPoint(x, y));
  }
  numControlPoints = controlPoints.length ;
  
  let centrePointData = jsonData.centre;
  centrePoint = new ControlPoint(centrePointData.x,centrePointData.y) ;
}

function initControlPoints() {
    initControlPointsCIRCLE() ;
}

function resetRoutePoints() {
  controlPoints =  [] ;
}

function addRoutePoint(x, y) {
    controlPoints.push(new ControlPoint(x, y)) ;
  
}


function initControlPointsLINE() {
  resetRoutePoints() ;
  

  for (let index = 0; index < numControlPoints; index++) {
    addRoutePoint(controlPointStartX + index * controlPointWidth, controlPointStartY + index * controlPointHeight) ;
  }
  
}

function initControlPointsCIRCLE() {
  
  resetRoutePoints() ;
  
  let angle = 0 ;
  let diff = 2 * PI / numControlPoints ;
  let r = 240 ;
  
  centrePoint = new ControlPoint(400, 400) ;

  for (let index = 0; index < numControlPoints; index++) {
    
    let x = r * sin(angle)  + centrePoint.x;
    let y = r * cos(angle) + centrePoint.y ;

    addRoutePoint(x, y) ;
    
    angle += diff ;
    
  }
  
}


function initCanvas() {
  createCanvas(1024, 800);
}


function rotatePointsThroughAngleAroundPoint(points, angle, cpoint) {
    

    let s = sin(angle);
    let c = cos(angle);
    let cx = cpoint.x ;
    let cy = cpoint.y ;

    let newpoints = [] ;
    for (let index = 0; index < points.length; index++) {
          let x = points[index].x ;
          let y = points[index].y ;
          x = points[index].x - cx ;
          y = points[index].y - cy ;
          newpoints[index] = new ControlPoint(x * c - y * s + cx, x * s + y * c + cy);
    }
    return newpoints ;
}

function colinearPoints(diff = 10) {
  let controlPointWidth = 20;
  
  let dx = controlPoints[2].x - controlPoints[1].x ;
  let dy = controlPoints[2].y - controlPoints[1].y ;
  let m = (dy * 1.0) / dx ;
  
  let c =  controlPoints[1].y - m * controlPoints[1].x  ;
  let sgn = (controlPoints[1].x < controlPoints[2].x) ? -1 : 1 ;
  controlPoints[0].x = (controlPoints[1].x + sgn * controlPointWidth)  ;
  controlPoints[0].y = m * controlPoints[0].x + c  ;
  
  
  let clen = controlPoints.length ;
  console.log(clen) ;
  
  dx = controlPoints[clen - 2].x - controlPoints[clen - 3].x ;
  dy = controlPoints[clen - 2].y - controlPoints[clen - 3].y ;
  m = (dy * 1.0) / dx ;
  
  c =  controlPoints[clen - 2].y - m * controlPoints[clen - 2].x  ;
  sgn = (controlPoints[clen - 2].x < controlPoints[clen - 3].x) ? -1 : 1 ;
  controlPoints[clen - 1].x = (controlPoints[clen - 2].x + sgn * controlPointWidth)  ;
  controlPoints[clen - 1].y = m * controlPoints[clen - 1].x + c  ;
  
  
}



function getSplinePoint(t, cPoints) {
  
    let p1 = int(t) + 1 ;
    let p2 = p1 + 1 ;
    let p3 = p2 + 1 ;
    let p0 = p1 - 1 ;
    
    t = t - int(t) ;
      
    let ts = t * t ;
    let tc = ts * t ;
    let q1 = (-tc + 2.0 * ts - t)/2 ;
    let q2 = (3.0 * tc - 5.0 * ts + 2.0)/2 ;
    let q3 =(-3.0 * tc + 4.0 * ts + t)/2 ;
    let q4 = (tc - ts)/2 ;
    
    let tx = controlPoints[p0].x * q1 + controlPoints[p1].x * q2 + controlPoints[p2].x * q3 +  controlPoints[p3].x * q4 ;
    let ty = controlPoints[p0].y * q1 + controlPoints[p1].y * q2 + controlPoints[p2].y * q3 +  controlPoints[p3].y * q4 ;
    
    return { x : tx, y : ty } ;
}

function getSplinePointOld(t) {
  
    let p1 = int(t) + 1 ;
    let p2 = p1 + 1 ;
    let p3 = p2 + 1 ;
    let p0 = p1 - 1 ;
    
    t = t - int(t) ;
      
    let ts = t * t ;
    let tc = ts * t ;
    let q1 = -tc + 2.0 * ts - t ;
    let q2 = 3.0 * tc - 5.0 * ts + 2.0 ;
    let q3 =-3.0 * tc + 4.0 * ts + t ;
    let q4 = tc - ts ;
    
    let tx = controlPoints[p0].x * q1 + controlPoints[p1].x * q2 + controlPoints[p2].x * q3 +  controlPoints[p3].x * q4 ;
    let ty = controlPoints[p0].y * q1 + controlPoints[p1].y * q2 + controlPoints[p2].y * q3 +  controlPoints[p3].y * q4 ;
    
    return { x : tx * 0.5, y : ty * 0.5} ;
}

function getIntergral(t) {
  
    let p1 = int(t) + 1 ;
    let p2 = p1 + 1 ;
    let p3 = p2 + 1 ;
    let p0 = p1 - 1 ;
    
    t = t - int(t) ;
      
    let ts = t * t ;
    let tc = ts * t ;
    //let q1 = -tc + 2.0 * ts - t ;
    //let q2 = 3.0 * tc - 5.0 * ts + 2.0 ;
    //let q3 =-3.0 * tc + 4.0 * ts + t ;
    //let q4 = tc - ts ;
    
    let q_1 = -3.0 * ts + 4.0 * t - 1 ;
    let q_2 = 9 * ts - 10.0 * t  ;
    let q_3 = -9 * ts + 8.0 * t   + 1;
    let q_4 = 3.0 * ts - 2.0 * t ;
    
    
    let tx = controlPoints[p0].x * q_1 + controlPoints[p1].x * q_2 + controlPoints[p2].x * q_3 +  controlPoints[p3].x * q_4 ;
    let ty = controlPoints[p0].y * q_1 + controlPoints[p1].y * q_2 + controlPoints[p2].y * q_3 +  controlPoints[p3].y * q_4 ;
    
    
    return { x : tx * 0.5, y : ty * 0.5} ;
}
 
 
 function getGradient(t) {
  
    let p1 = int(t) + 1 ;
    let p2 = p1 + 1 ;
    let p3 = p2 + 1 ;
    let p0 = p1 - 1 ;
    
    t = t - int(t) ;
      
    let ts = t * t ;
    let tc = ts * t ;
    //let q1 = -tc + 2.0 * ts - t ;
    //let q2 = 3.0 * tc - 5.0 * ts + 2.0 ;
    //let q3 =-3.0 * tc + 4.0 * ts + t ;
    //let q4 = tc - ts ;
    
    let q_1 = -3.0 * ts + 4.0 * t - 1 ;
    let q_2 = 9 * ts - 10.0 * t  ;
    let q_3 = -9 * ts + 8.0 * t   + 1;
    let q_4 = 3.0 * ts - 2.0 * t ;
    
    
    let tx = controlPoints[p0].x * q_1 + controlPoints[p1].x * q_2 + controlPoints[p2].x * q_3 +  controlPoints[p3].x * q_4 ;
    let ty = controlPoints[p0].y * q_1 + controlPoints[p1].y * q_2 + controlPoints[p2].y * q_3 +  controlPoints[p3].y * q_4 ;    
    
    return atan2(ty,tx) ;
}

 function getGradientVector(t) {
  
    let p1 = int(t) + 1 ;
    let p2 = p1 + 1 ;
    let p3 = p2 + 1 ;
    let p0 = p1 - 1 ;
    
    t = t - int(t) ;
      
    let ts = t * t ;
    let tc = ts * t ;

    let q_1 = -3.0 * ts + 4.0 * t - 1 ;
    let q_2 = 9 * ts - 10.0 * t  ;
    let q_3 = -9 * ts + 8.0 * t   + 1;
    let q_4 = 3.0 * ts - 2.0 * t ;
    
    
    let tx = controlPoints[p0].x * q_1 + controlPoints[p1].x * q_2 + controlPoints[p2].x * q_3 +  controlPoints[p3].x * q_4 ;
    let ty = controlPoints[p0].y * q_1 + controlPoints[p1].y * q_2 + controlPoints[p2].y * q_3 +  controlPoints[p3].y * q_4 ;    
    let len = sqrt(tx * tx + ty * ty) ;
    return { x: tx/len, y : ty/len} ;
}


function drawPoint(x, y, r = 8) {
  ellipse(x, y, r, r);

}

function drawControlPoints() {
  if (!hide) {
    controlPoints.forEach((cpt, index)=> {
      if (cpt.isInside(mouseX, mouseY)) {
        cpt.drawColour(200) ;
      } else {
        cpt.drawColour(160) ;
      }
    }) ;
    
    
    centrePoint.drawColourRGB(200,0,0) ;
  }
  
  
  
}

function drawSpline() {
  
  stepSize = (mouseIsDragged || editObject != null ? 8.0 : (hide ? 128 :1.0))/ pointsPerSegment ;
  for (let t = 0.0 ; t < controlPoints.length - 3.0 ; t += stepSize) {
    let pt = getSplinePoint(t) ;
      //ellipse(pt.x, pt.y, 2, 2);
      point(pt.x, pt.y) ;
  }
  
  
}

function clearCanvas() {
  background(220);
  
}

function drawEndPointControlLines() {
  let clen = controlPoints.length ;
  line(controlPoints[0].x, controlPoints[0].y, controlPoints[2].x, controlPoints[2].y) ;
  line(controlPoints[clen - 1].x, controlPoints[clen - 1].y, controlPoints[clen - 3].x, controlPoints[clen - 3].y) ;
}


function drawEditPoint() {
  if (editObject != null) {
    fill(0,200,0) ;
    ellipse(editObject.x, editObject.y, controlPointRadius * 1.5) ;
  }
  
}

let tPathFP = 0 ;
let speed = 64 ;

function rotateLine(r, ang) {
  return { x: r * cos(ang), y: r * sin(ang)} ;
}

function draw() {
  clearCanvas() ; 
  drawControlPoints() ;
  drawSpline() ;
  drawEditPoint() ;
  
//  drawEndPointControlLines() ;
//  point(30, 75);
  tPathFP = tPathFP + (1 * speed) ;
  tPathFP %= 1024 * (numControlPoints - 3) ;
  let t  = (tPathFP / 1024) ;
  
  let pt = getSplinePoint(t) ;
  let grad = getGradient(t) ;
    
  fill(200,200,0) ;
  ellipse(pt.x, pt.y, 10,10) ;
  
    
  // 
  //let rptf = rotateLine(DIRECTION_VECTOR_LENGTH, grad + PI/2.0) ;
  //let rptb = rotateLine(-DIRECTION_VECTOR_LENGTH, grad + PI/2.0) ;
  //line(pt.x + rptb.x, pt.y + rptb.y, pt.x + rptf.x, pt.y + rptf.y) ;
 
  
  let HALF_ROADWIDTH = 20 ;
  
  let v = getGradientVector(t) ;
  let dxLength = v.x * DIRECTION_VECTOR_LENGTH ;
  let dyLength = v.y * DIRECTION_VECTOR_LENGTH ;
  
  line(pt.x, pt.y, pt.x - dyLength, pt.y + dxLength) ;
  line(pt.x, pt.y, pt.x + dyLength, pt.y - dxLength) ;
 
  if (rotate) {
    controlPoints = rotatePointsThroughAngleAroundPoint(controlPoints, PI/512, centrePoint) ;
  }
  
  
}



function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    value = 255;
  } else if (keyCode === RIGHT_ARROW) {
    value = 0;
  }

//  return false ;
}


function keyTyped() {
  console.log("KEY TYPED ") ;
  
  if (key === 'r' || key == 'R') {
    initControlPoints() ;
  } else if (key === 'c' || key === 'C') {
    colinearPoints() ;
  } else if (key === 'e' || key === 'E') {
    editPoint() ;
  } else if (key == 'h' || key === 'H') {
    hide = !hide ;  
  } else if (key == 's' || key === 'S') {
    hide = false ;  
  } else if (key == 'a' || key === 'A') {
    rotate = !rotate ;  
  } 
  
  
  // uncomment to prevent any default behavior
  return false;
}

function editPoint() {
    controlPoints.forEach((cpt, index)=> {
      if (editObject == null && cpt.isInside(mouseX, mouseY)) {
        editObject = cpt ;
        console.log("FOUND CONTROL POINT") ;
      } 
      
    }) ;  
    
    if (editObject == null && centrePoint.isInside(mouseX, mouseY)) {
        editObject = centrePoint ;
    }
    
}

function mouseMoved(event) {
//  console.log(mouseX) ;
  console.log(editObject);
  
  if (editObject != null) {
    editObject.x = mouseX ;
    editObject.y = mouseY ;
  }
  
//  return false ;
}


function mouseDragged() {
    mouseIsDragged = true ;
    
    controlPoints.forEach((cpt, index)=> {
    if (cpt.isInside(mouseX, mouseY)) {
      cpt.x = mouseX ;
      cpt.y = mouseY ;
    }
    
    if (centrePoint.isInside(mouseX, mouseY)) {
      centrePoint.x = mouseX ;
      centrePoint.y = mouseY ;
    }
    
  }) ;
  
  // prevent default
  return false;
}


function mousePressed() {
  console.log("Mouse  Pressed") ;
}

function mouseReleased() {
  console.log("Mouse Released") ;
  mouseIsDragged = false ;
  editObject = null ;

}
