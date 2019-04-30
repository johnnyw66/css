public class Observable {
  private List<Observer> observers = new ArrayList<Observer>() ;
  
  public void addObserver(Observer observer) {
      observers.add(observer) ;  
  }
  
  public void notifyObservers(Object event) 
  {
      for(Observer obs : observers)
      {
          obs.update(this,event) ;
      }  
  }

  
}

