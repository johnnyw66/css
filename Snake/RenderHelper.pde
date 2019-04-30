public class RenderHelper 
{
  private Logger log = new Logger(Object.class) ;
  
  public int getWidth() {
    return width ;  
  }
  
  public int getHeight() {
    return height ;  
  }
  

  public void drawBox(int x,int y, int w, int h) {
    drawBox(x, y, w, h, 0xff00ffff) ;
  }
  
  public void drawBox(int x,int y, int w, int h, int col) {
    stroke(col);
    fill(col) ;
    rect(x,y,w, h);
  }
  
  public void drawTextBox(int x, int y, int w, int h,String s, int boxcol) {
          drawBox(x, y, w, h, boxcol) ;
          drawText(x, y, w, h, s,0) ;
  }
  
  public void drawText(int x, int y, int w, int h,String s, int textCol) 
  {
          PFont f = createFont("Arial",16,true); // STEP 3 Create Font
          textFont(f,16);           
          fill(textCol);          
          int sw = (int)textWidth(s) ;
          textAlign(LEFT, TOP);
          text(s,x + (w - sw) * 0.5 ,y );  // STEP 6 Display Text
  }
}

