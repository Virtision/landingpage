var DPAD_ICON = 'https://s3.amazonaws.com/virtision-tech-assets/images/navigation_pad.png';
var DPAD;

var _margin = 5; // pixel
var _height = 40; // initialized as vh or vw

// var QUARTER = _height / 4, HALF = _height / 2, TENTH = _height / 10;
// var FOUR = 4 * TENTH, SIX = 6 * TENTH;
var TENTH, FOUR, SIX;
var win_x, win_y, touch_x, touch_y;
module.exports = AFRAME.registerComponent('touch-controls', {
  schema: {
    enabled: { default: true },
    // Since we are overriding but extending 'aframe-extras's 'touch-controls',
    // create a flag initialized by the client that only renders the DPAD on mobile
    mobileDpad: { default: AFRAME.utils.device.isMobile() }
  },

  init: function () {
    this.dVelocity = new THREE.Vector3();
    this.bindMethods();
    //window.numTouches = 0;
    if (this.data.mobileDpad) {
      win_x = window.innerWidth;
      win_y = window.innerHeight;

      var smaller = win_x < win_y ? win_x : win_y;
      _margin = (_margin/100) * smaller;
      _height = (_height/100) * smaller;
      TENTH = _height / 10;
      FOUR = 4 * TENTH;
      SIX = 6 * TENTH;
      console.log('height: ' + _height + ' margin: ' + _margin);
      this.makeDpad();
    }
  },

  play: function () {
    this.addEventListeners();
  },

  pause: function () {
    this.removeEventListeners();
    this.dVelocity.set(0, 0, 0); // does this work?
  },

  remove: function () {
    this.pause();
  },

  addEventListeners: function () {
    var sceneEl = this.el.sceneEl;
    var canvasEl = sceneEl.canvas ;

    if (!canvasEl) {
      sceneEl.addEventListener('render-target-loaded', this.addEventListeners.bind(this));
      return;
    }

    // Swap the 'canvas' with our dpad
    if (this.data.mobileDpad) {
      canvasEl = DPAD;
    }
    // Standard touch to move forward
    canvasEl.addEventListener('touchstart', this.onTouchStart);
    canvasEl.addEventListener('touchmove', this.onTouchMove);
    canvasEl.addEventListener('touchend', this.onTouchEnd);

  },

  removeEventListeners: function () {
    var canvasEl = this.el.sceneEl && this.el.sceneEl.canvas;
    if (!canvasEl) { return; }

    canvasEl.removeEventListener('touchstart', this.onTouchStart);
    canvasEl.removeEventListener('touchmove', this.onTouchMove);
    canvasEl.removeEventListener('touchend', this.onTouchEnd);
  },

  isVelocityActive: function () {
    return this.data.enabled && this.isMoving;
  },

  getVelocityDelta: function (event) {

    // move user forward default
    if (!this.data.mobileDpad) {
      this.dVelocity.z = this.isMoving ? -1 : 0;
      return this.dVelocity.clone();
    }

    var x = touch_x - _margin;
    var y = win_y - touch_y - _margin;
    // console.log('tx: ' + touch_x + ' ty: ' + touch_y);
    // console.log('x: ' + x + ' y: ' + y);

    if (y < FOUR && (x > FOUR) && (x < SIX)) { this.dVelocity.z = 1; } // down
    if (x < FOUR && (y > FOUR) && (y < SIX)) { this.dVelocity.x = -1; } // left
    if ((y > SIX) && (x > FOUR) && (x < SIX)) { this.dVelocity.z = -1; } // up
    if ((x > SIX) && (y > FOUR) && (y < SIX)) { this.dVelocity.x = 1; } // right


    return this.dVelocity.clone();
  },

  makeDpad: function() {
    // console.log("mobile device detected; draw Dpad");
    DPAD = document.querySelector('#dpad');

    // Create HTML elements to hook into
    if (!DPAD) {
        DPAD = document.createElement('button');
        DPAD.id = 'dpad';

        var container = document.querySelector("div.a-mobile-dpad");

        if (!container) {
          container = document.createElement('div');
          container.className = 'a-mobile-dpad';
          container.appendChild(DPAD);

          var main = document.getElementsByTagName("a-scene")[0];
          main.appendChild(container);

        }
    }

    DPAD.style.position = 'absolute';
    DPAD.style.zIndex = 9999;
    DPAD.style.bottom = 0;
    DPAD.style.left = _margin + 'px';
    DPAD.style.bottom = _margin + 'px';
    DPAD.style.display = 'block';
    DPAD.style.width = _height + 'px';
    DPAD.style.height = _height + 'px';
    DPAD.style.border = 0;
    DPAD.style.background = 'url(' + DPAD_ICON + ')';
    DPAD.style.backgroundRepeat = 'no-repeat';
    DPAD.style.backgroundSize = 'contain';

  },

  bindMethods: function () {
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.makeDpad = this.makeDpad.bind(this);
  },

  onTouchStart: function (e) {
    e.preventDefault();
    this.isMoving = true;
    touch_x = e.touches[0].clientX;
    touch_y = e.touches[0].clientY;
    //window.numTouches += 1;
  },

  onTouchMove: function(e) {
    e.preventDefault();
    touch_x = e.changedTouches[0].clientX;
    touch_y = e.changedTouches[0].clientY;
  },

  onTouchEnd: function (e) {
    e.preventDefault();
    this.isMoving = false;
    this.dVelocity.set(0, 0, 0);
    //window.numTouches -= 1;
  }
});
