
  // Radians - 
   float degreesToRadians(float th)
   {
     return PI * th /180.0f ;
   }



   PVector [] calcControlPoints(float angle,float ro,float  radius,float tilt,float petalLength)
   {

     PVector [] bezControlPoints = new PVector[4] ;

     float halfRo = ro / 2.0f ;

     PVector[] cPoints = calcPetalPointPair(angle- halfRo,tilt,petalLength) ;
     PVector startPt = cPoints[0] ;
     PVector fPoint = cPoints[1] ;


     bezControlPoints[0] = new PVector(startPt.x * radius,startPt.y *  radius) ;
     bezControlPoints[1] = new PVector(startPt.x * radius +  fPoint.x,startPt.y * radius + fPoint.y) ;



     PVector [] cPoints2 = calcPetalPointPair(angle+halfRo,- tilt,petalLength) ;
     startPt = cPoints2[0] ;
     fPoint = cPoints2[1] ;

     bezControlPoints[3] = new PVector(startPt.x * radius,startPt.y *  radius) ;
     bezControlPoints[2] = new PVector(startPt.x * radius +  fPoint.x,startPt.y * radius + fPoint.y) ;


     return bezControlPoints ;

   }


   // This function calculates the control point line (Pair of 2D Vectors)
   // 
   PVector[] calcPetalPointPair(float angle,float tilt,float petalLength)
   {


     PVector startPt = new PVector(sin(degreesToRadians(angle)),cos(degreesToRadians(angle)));

     PVector vert = new PVector(0,0,1.0f) ;      // Unit Vector Perp  to XY Plane
     PVector nCPc = startPt.cross(vert) ;        // Calculate Tangent to Circle at startPt.x,startPt.y


     PMatrix2D iMat = new PMatrix2D() ;

     iMat.rotate(degreesToRadians(tilt < 0 ? 180+tilt : tilt)) ;    //  Petal Tilt

     PMatrix2D cMat = new PMatrix2D(nCPc.x,startPt.x,0.0f,nCPc.y,startPt.y,0.0f) ;

   // Matrix
   // | nCPc.x  startx |
   // | nCPc.y  starty |


     cMat.preApply(iMat) ;      // Apply our othog axis to the  rotation matrix


     PVector fPoint = new PVector() ;
     PVector sPoint = new PVector(petalLength,0) ;    // Petal Length

     cMat.mult(sPoint,fPoint) ;            // Apply Full transformation to petal Vector

     PVector [] points = new PVector[2] ;
     points[0] = startPt ;
     points[1] = fPoint ;

     return points;

  }


float border = 0;
float border2 = -25;


void push() {
  pushMatrix();
  pushStyle();
}

void pop() {
  popStyle();
  popMatrix();
}

void draw() {

    draw_();
  
}

interface ShapeInf {
   

  PVector getPos(float tValue) ;
    
}

class SineShape implements ShapeInf {
  float x ;
  float y ;
  PVector pos = new PVector() ;
  
  float getX(float p) {
    return (width/2)  + 120 * cos(p * TWO_PI)  ;
  }
  
  float getY(float p) {
    return map(p,0,1,border2,height-border2);
     //return (height/2) + 120 * sin( p * TWO_PI)  ;
  }

  PVector getPos(float t) {
      pos.x = getX(t) ;
      pos.y = getY(t) ;
      return pos ;
  }

}

class CircleShape implements ShapeInf {
  float x ;
  float y ;
  PVector pos = new PVector() ;

  float getX(float p) {
    return (40+ width/2)  + 120 * cos(p * TWO_PI)  ;
  }
  
  float getY(float p) {
    return (height/2) + 120 * sin( p * TWO_PI)  ;
  }
  
  PVector getPos(float t) {
      pos.x = getX(t) ;
      pos.y = getY(t) ;
      return pos ;
  }


}


class BezierShape implements ShapeInf {
   PVector [] cp = new PVector[4];
    
    BezierShape(PVector[] cp) {
      this(cp[0], cp[1], cp[2], cp[3]) ;
    }
     
    // start, p1, p2, end
   BezierShape(PVector cp0, PVector cp1, PVector cp2, PVector cp3) {

     cp[0] = new PVector() ;
     cp[0].x = cp0.x ;
     cp[0].y = cp0.y ;
     

     cp[1] = new PVector() ;
     cp[1].x = cp1.x ;
     cp[1].y = cp1.y ;

     cp[2] = new PVector() ;
     cp[2].x = cp2.x ;
     cp[2].y = cp2.y ;

     cp[3] = new PVector() ;
     cp[3].x = cp3.x ;
     cp[3].y = cp3.y ;

  
   }
  
  PVector getPos(float tValue) {
      PVector   pv = calcBezierT(tValue, cp[0], cp[1], cp[2], cp[3]) ;  
      return pv ;
  }
  
   
  // Returns Bezier PVector based on cubic equation
  // b(bt) =  P0 * (1 - t)^3 + P1 * 3 * t * (1 -t)^2 + P2 * 3 * t^2 * (1 - t) + P3 * t^3
  PVector calcBezierT(float tValue, PVector p0, PVector p1, PVector p2, PVector p3)
  {
    float tsq = tValue * tValue;
    float tcb = tsq * tValue;
    float u = 1 - tValue ;

    float usq = u*u;
    float ucb = usq * u;

    PVector bt = PVector.mult(p0,ucb);  // b(t) = P0 * (1 - t)^3 
    bt.add(PVector.mult(p1,3 * usq * tValue));  // + P1 * 3 * t * (1 -t)^2 
    bt.add(PVector.mult(p2,3 * u * tsq));  // + P2 * 3 * t^2 * (1 - t) 
    bt.add(PVector.mult(p3,tcb));   // P3 * t^3

    return bt;
  }  

  
}

OpenSimplexNoise noise;


class Curve {
  float seed = random(10,1000);
  int numPts = 4000;
  
  float amp = 15;        // 15
  float rad = 2;   // 2
  float freq = 40/3;
  float phaseRate = 12;
  float phaseTime = 0 ;
  ShapeInf shape ;
  int id = 0 ;
  
  Curve(int id, ShapeInf shape){
    this.id = id ;
    this.shape = shape ;
  }

  void draw(){
    
    for(int pixel=0 ; pixel < numPts; pixel++){

      float parTime = 1.0 * pixel / numPts;

      float intensity = pow(2,-64*(parTime - 0.5)*(parTime - 0.5)) ;  // bell curve
      float anglePhase =  TWO_PI*freq*parTime - phaseRate*phaseTime ;
      float cAngle = rad * cos(anglePhase) ;
      float sAngle = rad * sin(anglePhase) ;

      float dx = intensity*amp*(float)noise.eval(2*seed + cAngle, sAngle,17*parTime,id);
      float dy = intensity*amp*(float)noise.eval(3*seed + cAngle, sAngle,17*parTime,id);

      stroke(255,70);
      strokeWeight(2.0);
      PVector pos = shape.getPos(parTime) ;
      
      point(pos.x + dx,pos.y + 3*dy);
    }
  }
  
  
  void update(float dt) {
    phaseTime += dt ;
  }
  
  
}



abstract class CurveShape {
    Curve [] curves ;

    CurveShape() {

    }
    
    public void update(float dt) {
        for(int curveNum = 0 ; curveNum < curves.length ; curveNum++) {
              curves[curveNum].update(dt) ;
        }
    }
    
    public void draw() {
        for(int curveNum = 0 ; curveNum < curves.length ; curveNum++) {
            curves[curveNum].draw() ;
        }
    } 
  
}

class Flower extends CurveShape {
    
    Flower(int numPetals) {
      curves = new Curve[numPetals] ;
      
      for(int petal = 0 ; petal < curves.length ; petal++) {
        
          float petalLength = 260 ;
          float angle = petal*360.0/numPetals ;
          float radius = 40 ;
          PVector [] cps = calcControlPoints(angle,12,radius,120,petalLength);
          ShapeInf bezs = new BezierShape(cps) ;
          Curve curve = new Curve(petal,bezs) ;
          curves[petal] = curve ;
       }
      
    }
    
}

class Heart extends CurveShape {
   PVector [] cps = new PVector[4] ;
   PVector [] rcps = new PVector[4] ;

  Heart(float height, float bottomAngle, float bottomLength, float topAngle, float topLength) {
      
    curves = new Curve[2] ;
      
    
      cps[0] = new PVector(0,height/2) ;
      cps[3] = new PVector(0,-height/2) ;
      
      cps[1] = new PVector(bottomLength,0) ;
      cps[1].rotate(degreesToRadians(-bottomAngle)) ;
      cps[1].y += -cps[3].y ;

      cps[2] = new PVector(topLength,0) ;
      cps[2].rotate(degreesToRadians(-topAngle)) ;
      cps[2].y += cps[3].y;
      
      curves[0] = new Curve(0,new BezierShape(cps)) ;
      
      

      rcps[0] = new PVector(0,height/2) ;
      rcps[3] = new PVector(0,-height/2) ;
      
      rcps[1] = new PVector(-bottomLength,0) ;
      rcps[1].rotate(degreesToRadians(bottomAngle)) ;
      rcps[1].y += height/2 ;

      rcps[2] = new PVector(-topLength,0) ;
      rcps[2].rotate(degreesToRadians(topAngle)) ;
      rcps[2].y += rcps[3].y;
      
      curves[1] = new Curve(1,new BezierShape(rcps)) ;

    }
    
    
    private void drawControlPoints() {

      ellipse(cps[0].x, cps[0].y,4,4) ;
      ellipse(cps[1].x, cps[1].y,4,4) ;
      ellipse(cps[2].x, cps[2].y,4,4) ;
      ellipse(cps[3].x, cps[3].y,4,4) ;
      

      ellipse(rcps[0].x, rcps[0].y,4,4) ;
      ellipse(rcps[1].x, rcps[1].y,4,4) ;
      ellipse(rcps[2].x, rcps[2].y,4,4) ;
      ellipse(rcps[3].x, rcps[3].y,4,4) ;
      
    }
    
    public void draw() {

      super.draw() ;  
  //    drawControlPoints() ;
    }
    
}


class Spline extends CurveShape {
   PVector [] cps = new PVector[4] ;

  Spline(float height, float bottomAngle, float bottomLength, float topAngle, float topLength) {
      
      curves = new Curve[1] ;
      
    
      cps[0] = new PVector(0,height/2) ;
      cps[3] = new PVector(0,-height/2) ;
      
      cps[1] = new PVector(bottomLength,0) ;
      cps[1].rotate(degreesToRadians(-bottomAngle)) ;
      cps[1].y += -cps[3].y;

      cps[2] = new PVector(topLength,0) ;
      cps[2].rotate(degreesToRadians(-topAngle)) ;
      cps[2].y += cps[3].y;
      
      recalculate();
    }

    private void recalculate() {
       curves[0] = new Curve(0,new BezierShape(cps)) ;
    }
    
    
    private void drawControlPoints() {

      ellipse(cps[0].x, cps[0].y,4,4) ;
      ellipse(cps[1].x, cps[1].y,4,4) ;
      ellipse(cps[2].x, cps[2].y,4,4) ;
      ellipse(cps[3].x, cps[3].y,4,4) ;
      
    }
    
    public void draw() {

      super.draw() ;  
  //    drawControlPoints() ;
    }
    float time = 0 ;
    
    public void update(float dt) {
      time += dt ;
      
      float anglePhase =  TWO_PI*time  ;
      float cAngle = 1* cos(anglePhase) ;
      float sAngle = 1 * sin(anglePhase) ;

      float dx = 1*(float)noise.eval(cAngle, sAngle); 
      float dy = 1*(float)noise.eval(cAngle, sAngle) ;
      cps[3] = new PVector(0,-height/2) ;
      println(dx,dy) ;
      recalculate() ;
      
      super.update(dt) ;
    }
    
    
}
Flower flower  ;
Heart heart,heart2,heart3 ;
Spline spline ;

void setup(){

   
   size(1600,800,P3D);

   noise = new OpenSimplexNoise();
   float heartHeight = 340;
   
   flower = new Flower(12) ;
   
   heart = new Heart(heartHeight,15,200,65,420) ;
   heart2 = new Heart(heartHeight,15,260,65,420) ;
   heart3 = new Heart(heartHeight,15,360,65,420) ;
   spline = new Spline(400,20,200,40,400) ;
   

}
float theta = 0 ;

void draw_(){
  background(255,0,0);
  push();
  translate(600,400) ;
  //theta+=0.1 ;
  //rotate(theta) ;
  //scale(1) ;

 // ellipse(0,0,10,10) ;
//  stroke(255) ;
  //flower.draw() ;
  //flower.update(0.1) ;
  
  heart.update(0.1) ;
  heart2.update(0.1) ;
  heart3.update(2) ;
  spline.update(0.01) ;
  
  heart.draw() ;
  //heart2.draw() ;
  heart3.draw() ;

  //spline.draw();
  
  
  pop();
}
