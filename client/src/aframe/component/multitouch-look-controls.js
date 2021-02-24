/*
 * Original author: https://github.com/morandd/aframe-multitouch-look-controls
 * Demo site: https://morandd.github.io/aframe-multitouch-look-controls/example/
 * This is a free-look camera controller, designed for phone/tablet usage. It only supports touch gestures.
 *
 * One finger: pitch and yaw camera
 * Two finger drag: dolly camera left/right (orthogonal to current view) or up/down
 * Pinch: zoom

 * A bounding box and bounded pitch angles prevent the user from getting totally lost
 */

AFRAME.registerComponent('multitouch-look-controls', {
  dependencies: ['position', 'rotation'],

  schema: {
    enabled: {default: true},
    maxPitch: { type: 'number', default: 15},
    minPitch: { type: 'number', default: -20}
  },

  init: function () {

      this.universalControls = null;
      if (this.el.components["universal-controls"]) {
        this.universalControls = this.el.components["universal-controls"];
      } else {
        this.el.setAttribute('universal-controls','');
        this.universalControls = this.el.components["universal-controls"];
      }
      this.universalControls.pause();
      this.removeEventListeners();

      /*
       On desktop mode, just downgrade ourselves to a normal look-control
       */
      if (!AFRAME.utils.device.isMobile()){
        this.data.enabled = false;
        this.setEnabled(false);
        this.universalControls.play();
        this.pause();
      } else {
        /*
         * On mobile, we behave normally, except we also set up listeners so we morph to/from normal look-controsl on enter-vr/exit-vr event
         */
        var sceneEl = this.el.sceneEl;
        this.data.maxPitchRad = THREE.Math.degToRad( this.data.maxPitch );
        this.data.minPitchRad = THREE.Math.degToRad( this.data.minPitch );

        this.touchStart = {
          x: NaN,
          y: NaN
        };

        this.pitchObject = new THREE.Object3D();
        this.yawObject = new THREE.Object3D();
        this.yawObject.position.y = 10;
        this.yawObject.add(this.pitchObject);

        this.dollyObject = new THREE.Object3D();

        this.setEnabled(this.data.enabled);

        /* Add listeners to turn on and off accordingly */
        this.el.sceneEl.addEventListener('enter-vr', this.handleEnterVRMobile.bind(this));
        this.el.sceneEl.addEventListener('exit-vr', this.handleExitVRMobile.bind(this));
      }

  },

  handleEnterVRMobile: function(e) {
    this.setEnabled(false);
    this.pause();
    // Ocassionally the initial view in VR does not point towards 0,0,0. I am not sure how to change the intial orientation of VR mode.
    this.el.setAttribute('rotation','0 0 0');
    this.universalControls.play();
  },
  handleExitVRMobile: function(e){
    this.setEnabled(true);
    this.universalControls.pause();

    // Resume the orientation we had before entering VR:
    this.el.setAttribute('rotation','0 0 0'); // undo the rotations from VR mode
    this.updateRotationAndPosition();

    this.play();
  },

  play: function () {
    this.addEventListeners();
  },

  pause: function () {
    this.removeEventListeners();
  },

  update: function (oldData) {
    var data = this.data;

    // Toggle enable/disabled
    if (oldData && data.enabled !== oldData.enabled) {
      this.setEnabled(data.enabled);
    }
    if (!data.enabled) return;


    if (oldData && this.pitchObject && this.yawObject) {
      this.pitchObject.rotation.set(0, 0, 0);
      this.yawObject.rotation.set(0, 0, 0);
    }

    this.updateRotationAndPosition();
  },

  /*
   * setEnabled just turns on the hand grab cursor.
   */
  setEnabled: function (enabled) {
    var sceneEl = this.el.sceneEl;

    function enableGrabCursor () {
      sceneEl.canvas.classList.add('a-grab-cursor');
    }
    function disableGrabCursor () {
      sceneEl.canvas.classList.remove('a-grab-cursor');
    }

    if (!sceneEl.canvas) {
      if (enabled) {
        sceneEl.addEventListener('render-target-loaded', enableGrabCursor);
      } else {
        sceneEl.addEventListener('render-target-loaded', disableGrabCursor);
      }
    } else {
      if (enabled) {
        enableGrabCursor();
      } else {
        disableGrabCursor();
      }
    }
  },

  tick: function (t) {
    if (this.data.enabled) this.update();
  },

  remove: function () {
    this.pause();
  },

  addEventListeners: function () {
    var sceneEl = this.el.sceneEl;
    var canvasEl = sceneEl.canvas;

    // I think this is a more intuitive order to apply rotations for the look camera
    this.el.object3D.rotation.order = 'YXZ';

    // listen for canvas to load.
    if (!canvasEl) {
      sceneEl.addEventListener('render-target-loaded', this.addEventListeners.bind(this));
      return;
    }

    // Touch events
    canvasEl.addEventListener('touchstart', this.onTouchStart.bind(this));
    window.addEventListener('touchmove', this.onTouchMove.bind(this));
    window.addEventListener('touchend', this.onTouchEnd.bind(this));
  },

  removeEventListeners: function () {

    var sceneEl = this.el.sceneEl;
    var canvasEl = sceneEl && sceneEl.canvas;
    if (!canvasEl) { return; }

    // Touch events
    canvasEl.removeEventListener('touchstart', this.onTouchStart.bind(this));
    canvasEl.removeEventListener('touchmove', this.onTouchMove.bind(this));
    canvasEl.removeEventListener('touchend', this.onTouchEnd.bind(this));

    this.el.object3D.rotation.order = 'XYZ';

  },

  /* This component seems to do nothing relating to rotation. Commented out the relevant snippets for now */
  updateRotationAndPosition: function () {
    if (!this.pitchObject || !this.yawObject || !this.dollyObject) return;

    var currentRotation = this.el.getAttribute('rotation');
    var currentPosition = this.el.getAttribute('position');

    var deltaRotation = this.calculateDeltaRotation();
    var deltaDolly = this.calculateDeltaDolly();

    /* Dolly rotation update */
    var rotation = {
        x: currentRotation.x - deltaRotation.x,
        y: currentRotation.y - deltaRotation.y,
        z: currentRotation.z
      };
    if (deltaRotation.x!==0 || deltaRotation.y !== 0) {
      this.el.setAttribute('rotation', rotation);
    }

    /* Dolly movement update */
    if (deltaDolly.x!==0 || deltaDolly.z !== 0) {
      var leftrightAmount = deltaDolly.x;
      var inoutAmount = deltaDolly.z;
      deltaDolly.z = leftrightAmount * Math.cos(  THREE.Math.degToRad( rotation.y -90 ));
      deltaDolly.x = leftrightAmount * Math.sin(  THREE.Math.degToRad( rotation.y -90 ));
      deltaDolly.z -= inoutAmount * Math.cos(  THREE.Math.degToRad( rotation.y ));
      deltaDolly.x -= inoutAmount * Math.sin(  THREE.Math.degToRad( rotation.y ));

      var position = {
        x: currentPosition.x + deltaDolly.x,
        y: currentPosition.y + deltaDolly.y,
        z: currentPosition.z + deltaDolly.z,
      };

      this.el.setAttribute('position', position);
    }

  },

  /* This helper function for the calculation seems awfully redundant */
  calculateDeltaRotation: function () {
    var currentRotationX = THREE.Math.radToDeg(this.pitchObject.rotation.x);
    var currentRotationY = THREE.Math.radToDeg(this.yawObject.rotation.y);
    var deltaRotation;
    this.previousRotationX = this.previousRotationX || currentRotationX;
    this.previousRotationY = this.previousRotationY || currentRotationY;
    deltaRotation = {
      x: currentRotationX - this.previousRotationX,
      y: currentRotationY - this.previousRotationY
    };
    this.previousRotationX = currentRotationX;
    this.previousRotationY = currentRotationY;
    return deltaRotation;
  },

  calculateDeltaDolly: function () {
    var currentDollyX = this.dollyObject.position.x;
    var currentDollyY = this.dollyObject.position.y;
    var currentDollyZ = this.dollyObject.position.z;
    var deltaDolly;
    this.previousDollyX = this.previousDollyX || currentDollyX;
    this.previousDollyY = this.previousDollyY || currentDollyY;
    this.previousDollyZ = this.previousDollyZ || currentDollyZ;
    deltaDolly = {
      x: currentDollyX - this.previousDollyX,
      y: currentDollyY - this.previousDollyY,
      z: currentDollyZ - this.previousDollyZ
    };
    this.previousDollyX = currentDollyX;
    this.previousDollyY = currentDollyY;
    this.previousDollyZ = currentDollyZ;
    return deltaDolly;
  },

  onTouchStart: function (e) {
    if (e.touches.length == 1) {
      this.touchStart.x = e.touches[0].pageX;
      this.touchStart.y = e.touches[0].pageY;

    }
  },

  onTouchMove: function (e) {

    if (e.touches.length == 1 ) {
      var thisX = this.touchStart.x;
      var thisY = this.touchStart.y;

      var deltaY = 2 * Math.PI * (e.touches[0].pageY - thisY) / this.el.sceneEl.canvas.clientHeight;
      var deltaX = 2 * Math.PI * (e.touches[0].pageX - thisX) / this.el.sceneEl.canvas.clientWidth;

      // Read the values calculated, update position always if anything
      if (Math.abs(deltaX) > 0 && Math.abs(deltaX) < 0.5) {
        deltaY = (deltaY > 1) ? 1 : (deltaY < -1) ? -1 : deltaY;
        this.dollyObject.position.z -= deltaY * 0.02;
      }
      else if (Math.abs(deltaY) > 0 && Math.abs(deltaY) < 0.5) {
        deltaX = (deltaX > 1) ? 1 : (deltaX < -1) ? -1 : deltaX;
        this.yawObject.rotation.y += deltaX * 0.02; // += -- pan towards direction; -= -- pan inverted from dir
      }
      // var currentPosition = this.el.getAttribute('position');
      // console.log(currentPosition);
    }
  },

  onTouchEnd: function (e) {

    // this event also fires when we drop from multiple finers down to just 1 finger remaining.
    // In this case, lets' update touchStart to that finger pos, intead of the mipoint between two fingers.
    if (e.touches.length == 1) {
      this.touchStart = {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY
      };
    }
  },

});
