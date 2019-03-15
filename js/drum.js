class Node {

  constructor(data) {
      this.data = data ;
      this.next = null ;
  }

  getData() {
    return this.data ;
  }

}

class MapEntry {

    constructor(key,value) {
        this.key = key ;
        this.value = value ;
    }

    getValue() {
      return this.value ;
    }
    getKey() {
      return this.key ;
    }
    setValue(value) {
      this.value = value ;
    }

}

class HashMap {

  constructor() {
      this.buckets = [] ;
      this.numbuckets = 4 ;
      this.numelements = 0 ;
  }

  // Debug routine descriping internal mechanisim - number of buckets used
  //
  bucketsUsed() {
    let count = 0 ;
    for(let i = 0 ; i < this.numbuckets; i++) {
      if (typeof(this.buckets[i]) != 'undefined') {
          count++ ;
      }
    }
    return count ;
  }

  // return number of elements in total
  size() {
    return this.numelements ;
  }

  // hashing function
  hash(key) {

    let sum = 0 ;
    let n = key.length ;

    for(var i = 0 ; i < key.length ; i++) {
        let ch = key.charCodeAt(i);
        sum = sum * 31 + ch ;
    }
    //console.log(`calc hash (${key}) ${sum}`) ;
    return sum;
  }

  // given a particular bucket
  find(bucket,key) {

      let head = bucket ;
      while(head != null) {

        // ************EQUALS ***************
        // head.getKey().equals(key)
        // ************EQUALS ***************

        if (head.getData().getKey() === key) {
          return head.getData() ;
        }
        head = head.next ;
      }

      return null ;
  }

  increaseAndRedistributeBuckets() {

    let newbuckets = [] ;
    let newbucketsize = this.numbuckets * 2 ;

    for(let i = 0 ; i < this.numbuckets; i++) {
      // for each defined bucket walk through the list of 'MapEntry's
      if (typeof(this.buckets[i]) != 'undefined') {

        let head = this.buckets[i] ;

        while(head != null) {

          let mapEntry = head.getData() ;
          this._put(mapEntry.getKey(),mapEntry.getValue(),newbuckets,newbucketsize) ;

          head = head.next ;
        }

      }
    }

    return newbuckets ;

  }
  // using a particular key/value pair - wrap up our value
  // in a Node object and place in a particular
  // bucket - (which is based on the hashing value of the key

  put(key,value) {

      if (this.numelements > (32*this.numbuckets)) {
         this.buckets = this.increaseAndRedistributeBuckets() ;
         this.numbuckets *= 2 ;
         console.log('>>>Redistribute ' + this.numbuckets) ;

      }
      if(this._put(key,value,this.buckets,this.numbuckets)) {
          this.numelements++ ;
      }
   }

  _put(key,value,buckets,numbuckets) {
      let index = this.hash(key) % numbuckets ;
      let bucket = buckets[index] ;

      if (typeof(bucket) === 'undefined') {
          buckets[index] = new Node(new MapEntry(key,value))  ;
          return true ;
      } else {
          let mapEntry = this.find(bucket,key) ;
          if (mapEntry != null) {
              mapEntry.setValue(value) ;
              return false ;
          } else {
              let node = new Node(new MapEntry(key,value)) ;
              node.next = buckets[index] ;
              buckets[index] = node ;
              return true ;
          }
      }

   }

   keyExists(key) {
     let index = this.hash(key) % this.numbuckets ;
     let bucket = this.buckets[index] ;

     let mapEntry = this.find(bucket,key) ;
     if (mapEntry != null) {
       return true ;
     }
     return false ;

   }

   get(key) {
     let index = this.hash(key) % this.numbuckets ;
     let bucket = this.buckets[index] ;

     let mapEntry = this.find(bucket,key) ;
     if (mapEntry != null) {
       return mapEntry.getValue() ;
     }
     return null ;
   }

}

class Integer {

  constructor(iValue) {
      this.iValue = iValue;
  }
  getIntValue() {
    return this.iValue ;
  }
  equals(iValue) {
    return this.iValue === iValue ;
  }

}
hMap = new HashMap() ;
for(let i = 0 ; i < 1000 ; i++) {
  hMap.put("someKey" + i,new Integer(i));
}

alert(hMap.get("someKey999").getIntValue()) ;
alert(hMap.bucketsUsed() + " buckets used. Num of elements in hMap " + hMap.size() + " numbuckets " + hMap.numbuckets) ;


function initCallBacks() {

  // initialise one callback for clicking on drum icons.

  for (let button of document.querySelectorAll(".drum")) {

    button.addEventListener("click",
      function() {
        var clst = this.classList;
        var audioAsset ;

        // we are only allowing to play one sound at a time!

        if (clst.contains('w')) {
          audioAsset = "sounds/tom-1.mp3";
      } else if (clst.contains('a')) {
          audioAsset = "sounds/tom-2.mp3";
        } else if (clst.contains('s')) {
          audioAsset = "sounds/tom-3.mp3";
        } else if (clst.contains('d')) {
          audioAsset = "sounds/tom-4.mp3";
        } else if (clst.contains('j')) {
          audioAsset = "sounds/snare.mp3";
        } else if (clst.contains('k')) {
          audioAsset = "sounds/kick-bass.mp3";
        } else if (clst.contains('l')) {
          audioAsset = "sounds/crash.mp3";
        }

        var audio = new Audio(audioAsset);
        audio.play();


      }
    );
  }

}
window.onload = function() {
  initCallBacks();
};
