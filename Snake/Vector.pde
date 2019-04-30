public class Vector implements PositionInf
{

  public int x ;
  public int y ;

  public Vector(int x, int y) { setXY(x,y) ; }
  public void setXY(int x, int y)  { this.x = x ; this.y = y ; }  
  public int getX() { return x ; }
  public int getY() { return y ; }

  public String toString() { return "vector (" + x + ", " + y + ")" ; }
  
 
}

