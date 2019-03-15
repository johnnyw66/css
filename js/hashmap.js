class Integer {

  constructor(iValue) {
    this.value = iValue;
  }

  getValue() {
    return this.value;
  }

  equals(iValue) {
    return this.value === iValue;
  }

  hashCode() {
    return this.value;
  }

  toString() {
    return "Integer: " + this.value;
  }

}

class StringWrapper {

  constructor(value) {
    this.value = value;
  }
  getValue() {
    return this.value;
  }

  equals(value) {
    // console.log("String equals <" + this.value + ">  [" + value + "] equals: " + (this.value === value)) ;
    return this.value === value;
  }
  // hashing function
  hashCode() {

    let sum = 0;
    let n = this.value.length;
    let value = this.value;

    for (var i = 0; i < n; i++) {
      let ch = value.charCodeAt(i);
      sum = sum * 31 + ch;
    }
    //console.log(`calc hash (${key}) ${sum}`) ;
    return sum;
  }

  toString() {
    return "String: " + this.value;
  }

}

class Node {

  constructor(data) {
    this.data = data;
    this.next = null;
  }

  getData() {
    return this.data;
  }

  toString() {
    return "Node: " + this.data.toString() + " next: " + next;
  }

}

class MapEntry {

  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  getKey() {
    return this.key;
  }

  setValue(value) {
    this.value = value;
  }

  isKeyEqual(key) {
    return this.key.equals(key);
  }

  toString() {
    return "MapEntry: " + this.key.toString() + " " + this.value.toString();
  }
}

class HashMap {

  constructor() {
    this.buckets = [];
    this.numbuckets = 16;
    this.numelements = 0;
  }

  // Debug routine descriping internal mechanisim - number of buckets used
  //
  bucketsUsed() {
    let count = 0;
    for (let i = 0; i < this.numbuckets; i++) {
      if (typeof(this.buckets[i]) != 'undefined') {
        count++;
      }
    }
    return count;
  }

  // return number of elements in total
  size() {
    return this.numelements;
  }

  // given a particular bucket attempt to find
  // the mapEntry with a matching key
  find(bucket, key) {

    // console.log("find: key [" + key.getValue() + "]") ;

    let head = bucket;
    while (head != null) {

      let mapEntry = head.getData();

      // ************EQUALS ***************
      // mapEntry.equals(key)
      // ************EQUALS ***************
      if (mapEntry.isKeyEqual(key.getValue())) {
        return mapEntry;
      }
      head = head.next;
    }

    return null;
  }

  // Increase number of buckets and recalculate hash keys for current
  // MapEntry's in the current bucket list.

  increaseAndRedistributeBuckets() {

    let newbuckets = [];
    let newbucketsize = this.numbuckets * 2;

    for (let i = 0; i < this.numbuckets; i++) {
      // for each defined bucket walk through the list of 'MapEntry's
      // and create new Node wrappers for each one
      if (typeof(this.buckets[i]) != 'undefined') {

        let head = this.buckets[i];

        while (head != null) {

          let mapEntry = head.getData();
          this._place(mapEntry.getKey(), mapEntry.getValue(), newbuckets, newbucketsize);

          head = head.next;
        }

      }
    }

    return newbuckets;

  }


  // Using a particular key/value pair (MapEntry)- wrap up our value
  // in a Node object and place in a particular
  // bucket - based on the hashing value of the key
  // Allow number and string primitives for a key - but wrap
  // with an appropriate class (that implements getValue(), hashCode(), equals())

  put(key, value) {

    if (typeof key === 'string') {
      key = new StringWrapper(key);
    } else if (typeof key === 'number') {
      key = new Integer(key);
    }

    if (this.numelements > (32 * this.numbuckets)) {

      this.buckets = this.increaseAndRedistributeBuckets();
      this.numbuckets *= 2;
      // console.log('>>>Redistribute bucket list ' + this.numbuckets);

    }

    let index = key.hashCode() % this.numbuckets;
    let bucket = this.buckets[index];

    if (typeof(bucket) === 'undefined') {
      this.buckets[index] = new Node(new MapEntry(key, value));
      this.numelements++;
    } else {
      let mapEntry = this.find(bucket, key);
      if (mapEntry != null) {
        mapEntry.setValue(value);

      } else {
        let node = new Node(new MapEntry(key, value));
        node.next = this.buckets[index];
        this.buckets[index] = node;
        this.numelements++;
      }
    }

  }

  // Used to place a key/value pair in a new
  // bucket list. (without the need to check for existing entries)

  _place(key, value, buckets, numbuckets) {

    let index = key.hashCode() % numbuckets;
    let bucket = buckets[index];

    if (typeof(bucket) === 'undefined') {
      buckets[index] = new Node(new MapEntry(key, value));
    } else {
      let node = new Node(new MapEntry(key, value));
      node.next = buckets[index];
      buckets[index] = node;
    }

  }

  // returns true if key exists
  keyExists(key) {

    let index = key.hashCode() % this.numbuckets;
    let bucket = this.buckets[index];

    let mapEntry = this.find(bucket, key);

    if (mapEntry != null) {
      return true;
    }

    return false;
  }

  // Allow primitive number and string - but wrap
  // with appropriate class
  get(key) {

    if (typeof key === 'string') {
      key = new StringWrapper(key);
    } else if (typeof key === 'number') {
      key = new Integer(key);
    }

    let index = key.hashCode() % this.numbuckets;
    let bucket = this.buckets[index];

    let mapEntry = this.find(bucket, key);
    if (mapEntry != null) {
      return mapEntry.getValue();
    }
    return null;
  }


  // Iterate through bucket list and linked-lists
  //
  debug() {

    for (let i = 0; i < this.numbuckets; i++) {
      // for each defined bucket walk through the list of 'MapEntry's
      // and create new Node wrappers for each one
      if (typeof(this.buckets[i]) != 'undefined') {

        let head = this.buckets[i];

        while (head != null) {

          let mapEntry = head.getData();
          console.log(mapEntry.toString());
          head = head.next;
        }

      }
    }

  }
}

function testHashMap(testSize) {
  console.log("testHashMap size: " + testSize) ;

  hMap = new HashMap();

  console.time("Populate");
  for (let i = 0; i < testSize; i++) {
    hMap.put("someKey" + i, new Integer(i));
  }
  console.timeEnd("Populate");


  console.time("Search");
  for (let i = 0; i < testSize; i++) {
    var iv = hMap.get("someKey" + i);
    if (iv != null && iv.getValue() === i) {} else {
      alert("COULD NOT FIND " + i);
    }
  }
  console.timeEnd("Search");
}
