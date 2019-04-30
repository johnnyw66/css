import java.util.List ;
import java.util.ArrayList ;

public class Snake implements GameObjectInf {
  private Logger log = new Logger(Snake.class) ;

  private int DXSPEED = 16 ;
  private int DYSPEED = 16 ;
  

  private int snakeSize ;
  private float time ;
  private int currentKey = -1 ;
  private int currentDX = 0 ;
  private int currentDY = 0 ;
  
  private List<SnakeSegment> segments ;
  private float nextSegmentUpdate ;
  
  public Snake()
  {
  
  }
  
  public void restart() {
    
      time      = 0f ;
      nextSegmentUpdate = time + GameConstants.GENERATESNAKESEGMENTPERIOD ;
      snakeSize = 8 ;
      setCurrentKey(-1) ;
      segments = new ArrayList<SnakeSegment>() ;

      SnakeSegment prioSegment  = null;
      
      for (int i = 0 ; i < snakeSize ; i++)
      {
         SnakeSegment seg = new SnakeSegment(i) ;
         seg.setXY(16 * 8 + SnakeSegment.SNAKEWIDTH*i, 8 * 24) ;
         
         segments.add(seg) ;
         seg.restart() ;
         if (prioSegment != null) {
           prioSegment.addObserver(seg);
         }
         prioSegment = seg ;
      }
      
      
  }

  public void addNewSegement() {
    SnakeSegment seg = new SnakeSegment(snakeSize++) ;
    segments.add(seg) ;
    segments.get(snakeSize - 2).addObserver(seg) ;
  }
  
  public void setCurrentKey(int ky)
  {
      currentKey = ky ;
    
  }
  
  public void update(float dt) 
  {
      int dx, dy ;
      
      time = time + dt ;
      log.info("update " + time) ;
      
      
      if (time > nextSegmentUpdate) {
        addNewSegement() ;
        nextSegmentUpdate = time + GameConstants.GENERATESNAKESEGMENTPERIOD ; 
      }

      //
      for(SnakeSegment segment : segments ) {
             segment.update(dt) ;   
      }

      dx = currentDX ;
      dy = currentDY ;
      
      switch(currentKey)
      {
        case -1:
              dx = currentDX ;
              dy = currentDY ;
              break ;
        case LEFT:
              dx = -DXSPEED ;
              dy = 0 ;
              break ;
        case RIGHT:
              dx = DXSPEED ;
              dy = 0 ;
             break ;
        case UP:
              dx = 0 ;
              dy = -DYSPEED ;
              break ;
        case DOWN:
              dx = 0 ;
              dy = DYSPEED ;
              break ;        
        
      }
      
      // Move Head segment only - the rest are updated via observer pattern
      SnakeSegment head = segments.get(0) ;
      head.move(dx, dy) ;
      int currentHeadX = head.getX() ;
      int currentHeadY = head.getY() ;
      
      
 
  }
  
  public ObjectCollidableInf checkCollision(ObjectCollidableInf other){
    
      return other.checkCollision(segments.get(0)) ;
  }
  
  
  public void render(RenderHelper renderHelper) {
       
      log.info("render ") ;
      int segmentNumber = 0 ;

      for(SnakeSegment segment : segments ) {
          segment.render(renderHelper) ;   
      }
      
  }
  
  @Override
  public String toString() {
    return "snake " + snakeSize ; 
  }
  
}

