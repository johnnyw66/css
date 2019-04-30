public class Board implements GameObjectInf {

  public static final int edgeSize   = 4 ;
  public static final int edgeColour = 128 ;
  private float time ;
  
  public void restart() {
    time = 0f ;
  }
  
  void update(float dt) {  
  
  }

  void render(RenderHelper renderHelper)
  {
    clear() ;
    fill(255,0,0);
    stroke(0);
    fill(edgeColour);
    stroke(edgeColour);
    rect(0,0,width, edgeSize);
    rect(0,height - edgeSize,width, edgeSize);
    rect(0,0,edgeSize,height);
    rect(width - edgeSize,0, edgeSize,height);
  }

  
}

