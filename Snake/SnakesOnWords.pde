

private Logger log = new Logger(Object.class) ;

private int currentKey = -1 ;
private Snake snake ;
private WordChoice words ;
private Board board ;
private RenderHelper renderHelper ;

void setup()
{
  size(GameConstants.BOARDWIDTH,GameConstants.BOARDHEIGHT);
  textAlign(CENTER);
  initGame() ;
}

boolean sketchFullScreen() {
  return GameConstants.FULLSCREEN;
}

void initGame() 
{
  
  renderHelper = new RenderHelper() ;
  snake = new Snake() ;
  words =  new WordChoice() ;
  board = new Board() ;
  restart() ;

}


void restart() {
    snake.restart() ;
    words.restart() ;
    
    currentKey = -1 ;
}

int cnt = 0 ;
void draw()
{
   cnt++ ;
   if (cnt % 5 == 0) {
     updateGame() ;
     drawGame() ;
   }

}


void updateGame()
{
    Logger.addFilter(Object.class) ;
    float dt = getDeltaTime() ;
    snake.setCurrentKey(currentKey) ;    
    snake.update(dt) ;
    words.update(dt) ;
    board.update(dt) ;
    
    ObjectCollidableInf collide = snake.checkCollision(words) ;
    if ((collide != null) && (collide instanceof CharacterBox))
    {
      log.info("COLLISION  WITH CHAR BOX!!!! " + collide) ;    
      words.foundCharacter((CharacterBox)collide) ; 
    }
    
//    particleManager.update(dt) ;
}

void drawGame() {
  
    board.render(renderHelper) ;

    snake.render(renderHelper) ;
    
    words.render(renderHelper) ;
    renderHelper.drawText(900,GameConstants.YBANNER,260,16,"PRESS SHIFT FOR NEW WORDS",0xffffff00) ;
    
//  particleManager.render(renderHelper) ;

}



//controls:
void keyPressed()
{
  if (key == CODED)
  {
    currentKey = keyCode ;
    
    if (keyCode == UP)
    {

    }
    if (keyCode == DOWN){
      

    }if (keyCode == LEFT)
    {
      
    }if (keyCode == RIGHT)
    {
    }
    if (keyCode == SHIFT)
    {
      restart() ;
    }
  }
}

void keyReleased() {
    currentKey = -1 ;
}


float getDeltaTime() {
  return 0.1f ;
}


