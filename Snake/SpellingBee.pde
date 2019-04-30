import org.apache.commons.lang3.ArrayUtils ;
public class SpellingBee
{
  
  private Logger log = new Logger(SpellingBee.class) ;

  private String wordRequired ;
  private List<Character> gathered = new ArrayList<Character>() ;
  
  public SpellingBee(String required) {
     wordRequired = required ; 
  }
  
  public void gather(Character ch) {
     gathered.add(ch) ;
     log.info("Current Spelling " + getCurrentSpelling()) ;
  } 
  
  public boolean speltIncorrectly() {
     return getCurrentSpelling().equals(wordRequired) ;
  }
  
  public String getCurrentSpelling() { 
    Character [] cList = (Character[]) gathered.toArray(new Character[gathered.size()]) ;
   return new String(ArrayUtils.toPrimitive(cList)) ;
  }
  
}
