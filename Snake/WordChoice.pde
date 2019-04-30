public class WordChoice implements GameObjectInf,ObjectCollidableInf
{
  
  private Logger log = new Logger(WordChoice.class) ;

  private float time ; 
  
  public String [] dictionary = {
    "COX",
    "HEN",
    "APPLE",
    "SUSSEX",
    "BRIGHTON"  
  } ;
  
  
  private List<CharacterBox> characters ;
  private String currentWord = " " ;
  private SpellingBee currentSpelling ;
  
  public void restart() {
      time = 0f ;
      characters = new ArrayList<CharacterBox>() ;
      currentWord = dictionary[(int)random(dictionary.length)] ;
      
      currentSpelling = new SpellingBee(currentWord) ;
      
      for (char ch : currentWord.toCharArray()) {
        CharacterBox cb = new CharacterBox(ch) ;
        characters.add(cb) ;

        int xChoice =  (int)random((GameConstants.BOARDWIDTH / GameConstants.CHARACTERWIDTH)  - 20)  + 10;
        int yChoice =  (int)random((GameConstants.BOARDHEIGHT / GameConstants.CHARACTERHEIGHT)  - 20) + 10;
        
        cb.setXY(GameConstants.CHARACTERWIDTH * xChoice,GameConstants.CHARACTERWIDTH * yChoice) ;
        
      }
      
     // Now add some random letters
     
     
  }
  public ObjectCollidableInf checkCollision(ObjectCollidableInf obj)
  {  
       for(CharacterBox charBox : characters) {
         // 
          log.info("Check Collision " + obj + " with " + charBox) ;
          
          if (obj.checkCollision(charBox) != null) {
             return charBox ;
          }         
      }
       return null ; 
  }
  
  
  public void foundCharacter(CharacterBox cbox)
  {
    cbox.hide() ;  
    currentSpelling.gather(cbox.getChar()) ;
  }
  
  public void update(float dt)  
  {
      time = time + dt ;
      for(CharacterBox charBox : characters) {
          charBox.update(dt) ;          
      }
      
  }  
  
  public void render(RenderHelper renderHelper)
  {
      for(CharacterBox charBox : characters) {
          charBox.render(renderHelper) ;          
      }
      
      
      renderHelper.drawTextBox( width / 2, GameConstants.YBANNER, 140, 16, currentWord, 0xffff0000) ;
      renderHelper.drawTextBox(0,GameConstants.YBANNER,140,16,currentSpelling.getCurrentSpelling(),255) ;
  }
  
  @Override
  public String toString() {
    return "WordChoice currentWord:" + currentWord ; 
  }
 
}

