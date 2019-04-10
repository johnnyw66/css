
  var msgResource = new Image();
  msgResource.src = "assets/demogame/gfx/messagebackground.png";

  // add two new functions to localStorage - allowing us to
  // serialize stored 'objects'

  Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
  }

  Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
  }

  var lplayed = localStorage.getObject("lastplayed");


  var storePlayInfo = function(gameid) {
    // Update and Store info on play time.

    var nTime = new Date().getTime();

    if (lplayed) {
      lplayed.plays = lplayed.plays + 1;
      lplayed.date = nTime;
    } else {
      lplayed = {
        plays: 0,
        date: nTime
      }
    }

    localStorage.setObject("lastplayed", lplayed);
  }

  // Create requestAnimFrame function callback - depending
  // on the browser we are using.

  var requestAnimFrame =
    (function() {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
    })();

  var preLoadAndRun = function() {

    var games = [
      executeGameDemo,
    ];


    //alert("Preload Test")
    if (ImageResource.isLoaded()) {
      games[lplayed.plays % games.length](KeyBoardHandlerSetup(), -1);

    } else {

      window.setTimeout(preLoadAndRun, 10);
    }

  }


  window.onload = function() {

    storePlayInfo();


    new ImageResource("enemy_missile__1", "assets/demogame/gfx/enemy_missile__1.png");
    new ImageResource("enemy_missile__2", "assets/demogame/gfx/enemy_missile__2.png");
    new ImageResource("enemy_missile__3", "assets/demogame/gfx/enemy_missile__3.png");

    new ImageResource("arrow", "assets/demogame/gfx/arrow.png");


    new ImageResource("radarbase2", "assets/demogame/gfx/radarbase2.png");
    new ImageResource("radar6", "assets/demogame/gfx/radar6.png");

    new ImageResource("house3", "assets/demogame/gfx/house3.png");
    new ImageResource("outhouse4", "assets/demogame/gfx/outhouse4.png");
    new ImageResource("hut5", "assets/demogame/gfx/hut5.png");

    new ImageResource("tankbottom6", "assets/demogame/gfx/tankbottom6.png");
    new ImageResource("tanktop6", "assets/demogame/gfx/tanktop6.png");

    new ImageResource("smalljeep6", "assets/demogame/gfx/smalljeep6.png");
    new ImageResource("smalljeepgun6", "assets/demogame/gfx/smalljeepgun6.png");

    new ImageResource("largejeep2", "assets/demogame/gfx/largejeep2.png");
    new ImageResource("largejeeptop2", "assets/demogame/gfx/largejeeptop2.png");


    new ImageResource("bullethits", "assets/demogame/gfx/bullethits.png");
    new ImageResource("bullets_land", "assets/demogame/gfx/bullets_land.png");
    new ImageResource("bullets", "assets/demogame/gfx/bullets.png");

    new ImageResource("enemy_helishadow", "assets/demogame/gfx/helishadow.png");
    new ImageResource("enemy_helibody", "assets/demogame/gfx/helibody.png");
    new ImageResource("enemy_heliblades", "assets/demogame/gfx/heliblades.png");

    new ImageResource("helibody", "assets/demogame/gfx/helibody.png");
    new ImageResource("heliblades", "assets/demogame/gfx/heliblades.png");
    new ImageResource("helishadow", "assets/demogame/gfx/helishadow.png");
    new ImageResource("messagebackground", "assets/demogame/gfx/messagebackground.png");

    new ImageResource("enemyflyingbody", "assets/demogame/gfx/enemy_helibody.png");
    new ImageResource("enemyflyingblades", "assets/demogame/gfx/enemy_heliblades.png");
    new ImageResource("HeliLand01.png", "assets/demogame/gfx/HeliLand01.png");
    new ImageResource("cute.png", "assets/demogame/gfx/cute.png");
    new ImageResource("explosionuv64.png", "assets/demogame/gfx/explosionuv64.png");
    new ImageResource("jeep.png", "assets/demogame/gfx/jeep.png");
    new ImageResource("messagebackground.png", "assets/demogame/gfx/messagebackground.png");

    new ImageResource("person.png", "assets/demogame/gfx/person.png");
    new ImageResource("smoke8x4.png", "assets/demogame/gfx/smoke8x4.png");
    new ImageResource("smoke_loop.png", "assets/demogame/gfx/smoke_loop.png");
    new ImageResource("tileset1.png", "assets/demogame/gfx/tileset1.png");
    new ImageResource("tileset.png", "assets/demogame/gfx/tileset.png");

    preLoadAndRun();

  };



    var mousex = 0;
    var mousey = 0;
    var lastKey = 0;



    function KeyBoardHandlerSetup(filterset, bndings) {
      var buffer = new Array();
      var keyState = new Array();
      var kevent = "";
      var bindings = {};


      return {

        bindKey: function(realKey, keyID) {

          if (!bindings[keyID]) {
            bindings[keyID] = new Array();
          }
          bindings[keyID].push(realKey);
        },
        _wasJustPressed: function(realKey) {
          var state = keyState[realKey];
          keyState[realKey] = null
          return state;
        },

        isPressed: function(keyID) {
          return this.isPressedKeyID(keyID); // || this._isPressed(keyID) ;
        },

        isPressedKeyID: function(keyID) {
          var realKeys = bindings[keyID];
          for (var bnd in realKeys) {

            var realKey = realKeys[bnd];
            if (this._isPressed(realKey)) {
              return true;
            }
          }
          return false;
        },

        _isPressed: function(realKey) {
          var state = keyState[realKey];
          return state && state == 'keydown';
        },

        getLastEvent: function() {
          return kevent;
        },
        handler: function(evt) {
          var realKey = evt.keyCode;
          var type = evt.type;
          kevent = "KEY " + realKey + " TYPE " + type;
          keyState[realKey] = type;
        }

      }
    }
    // define game callback
    var setMouseValues = function(evt) {
      mousex = evt.clientX
      mousey = evt.clientY
      return true;
    }

    var setKeyValues = function(evt) {
      var keyID = evt.keyCode;
      lastKey = keyID;
      _keyEvent(evt);
      return true;
    }
