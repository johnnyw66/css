
public class SnakeSegment extends Observable implements  Observer,GameObjectInf,PositionInf,ObjectCollidableInf 
{
  public static final int SNAKEWIDTH  = 16 ;
  public static final int SNAKEHEIGHT = 16 ;
  
  private Logger log = new Logger(SnakeSegment.class) ;
  private int x,y ;
  private float time ;
  private int segmentNumber ;
  
  
  public  SnakeSegment(int segNum) {
    this.segmentNumber = segNum ;  
  }
  
  public void setXY(int x, int y) {
    this.x = x ;
    this.y = y ;  
  }
  
  public int getX() { return x ; }
  public int getY() { return y ; }
  
  
  public void restart()
  {
        this.time = 0f ;

  }
  
  public void update(float dt) 
  {
    time = time + dt ;
  }
  
  
  @Override
  public void update(Observable obj, Object arg) {
    log.info("We (segment " +  segmentNumber + ") have observed somefink! arg = " + arg) ;
    if (arg instanceof Vector) {
            Vector pos = (Vector) arg;
            move(pos.getX() - x, pos.getY() - y) ;
            
     }
   }
    
  public void move(int dx, int dy) {
      
      notifyObservers(new Vector(x,y)) ; // tell observers of our old place
      x = x + dx ;
      y = y + dy ;
  }
  
  public ObjectCollidableInf checkCollision(ObjectCollidableInf other){
      return other.checkCollision(this) ;
  }

  
  public void render(RenderHelper renderHelper)
  {
        log.info("render " + segmentNumber + " x " + x + ", " + y) ;
        renderHelper.drawBox(x,y,SNAKEWIDTH,SNAKEHEIGHT) ;
        

  }
  
  @Override
  public String toString() {
    return "SnakeSegement seg:" + segmentNumber  + "@ " + x + " , " + y; 
  }

}

