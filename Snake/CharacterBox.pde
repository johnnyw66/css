public class CharacterBox implements GameObjectInf,PositionInf,ObjectCollidableInf
{
  private Logger log = new Logger(CharacterBox.class) ;
  
  private float time ; 
  private char ch ;
  private int x, y ;
  private boolean displayable ;
  
  public CharacterBox(char ch)
  {
    this.ch = ch ;
    this.displayable = true ;
   
  }
  public void setXY(int x, int y) {
    this.x = x ;
    this.y = y ;  
  }
  
  public int getX() { return x ; }
  public int getY() { return y ; }
  
  public void restart() {
    time = 0f ;
    
  }
  
  public void update(float dt)  {
      time = time + dt ;
      
  }  
  
  
  ObjectCollidableInf checkCollision(ObjectCollidableInf other) {
    if (displayable) {

      int otherX = ((PositionInf)other).getX()  ;
      int otherY = ((PositionInf)other).getY()  ;
      return  (x == otherX && y == otherY ? this : null) ;
    } else {
       return null ; 
    }
    
  }
  public void hide() {
    displayable = false ;
  }
  public char getChar() {
     return ch ; 
  }
  public void render(RenderHelper renderHelper)
  {
      log.info("Render Char Box " + ch + " @ " + x + ", " + y) ;
      if (displayable) {
        renderHelper.drawTextBox(x, y,GameConstants.CHARACTERWIDTH,GameConstants.CHARACTERHEIGHT, "" + ch, 0xffff0000) ;
      }
      
    
  }
  @Override
  public String toString() {
    return "CharacterBox Char:" + ch + " @ " + x + " , " + y ; 
  }

  
}

