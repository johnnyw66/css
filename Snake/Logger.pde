import java.util.HashMap ;
import java.util.Map ;

static public class Logger {
  
  private static final String INFO = "INFO" ;
  private static final String DEBUG = "DEBUG" ;
  private static final String WARN = "WARNING" ;
  private static final String ERROR = "ERROR" ;

  private Class cl ;
  private static Map<String,Class> filterList = new HashMap<String,Class>() ;
  
  public Logger(Class c) { cl = c ; }
  
  static public void addFilter(Class cls) {
        filterList.put(cls.getName(),cls) ;
  }
  static public void clearFilter() {
        filterList = new HashMap<String,Class>() ;
  }
  
  public void info(String s) {
      dbg(INFO,s) ;
  }
  
  private void dbg(String ty, String s)
  {
        if (filterList.size() == 0 || (filterList.containsKey(cl.getName()))) {
          System.out.println(""+ty+" "+cl.getName() + " : " + s) ;
        }
  }  
}

