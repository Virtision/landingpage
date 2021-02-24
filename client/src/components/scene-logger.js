/*
 * Logs pulse and action data to mLab
 */

import * as consts from '../aframe/component/click-drag-component' /* For emit() event names */

const axios = require('axios');

const TYPE_LOG = "log";
const TYPE_ACT = "action";
const ACTION_MOVE = "Move";
const ACTION_ROTATE = "Rotate";
const START = "START";
const END = "END";
const ENDPOINT = process.env.NODE_ENV == "development" ? '/api/log_dev' : '/api/log';

AFRAME.registerComponent('scene-logger', {
  schema: {
    enabled: {default: true}, /* Turn on/off this component */
    logging: {default: true}, /* Turn on/off POSTs to endpoint for debugging*/
    position: {type: 'vec3'},
    rotation: {type: 'vec3'},
    host_domain: {type: 'string'},
    refer: {type: 'string'},
    client_id: {type: 'string'},
    dragging_obj: {default: false}, /* Mutex for emit() start/end events from click-drag. */
    session: {default: false}
  },

  init: function () {
    /* Grab client ID from GA:
     * https://stackoverflow.com/questions/20053949/how-to-get-the-google-analytics-client-id */
    let clientId;
    ga(function(tracker) {
      clientId = tracker.get('clientId');
    });
    this.data.client_id = clientId;

    /* Throttle tick to every second */
    this.tick = AFRAME.utils.throttle(this.tick, 1000, this);

    /* Assign Domain and iframe host, if exists */
    this.data.host_domain = window.location.hostname;
    this.data.refer = document.referrer; // for iframe

    /* Init position and rotation */
    this.data.position = this.el.getAttribute('position');
    this.data.rotation = this.el.getAttribute('rotation');

    /* Add event listeners for user actions */
    let scene = this.el.sceneEl;
    scene.addEventListener(consts.DRAG_START_EVENT, this.logDragStart.bind(this));
    scene.addEventListener(consts.DRAG_END_EVENT, this.logDragEnd.bind(this));
  },

  tick: function (time, timeDelta) {
    let pre_pos = this.data.position;
    let pre_rot = this.data.rotation;
    let cur_pos = this.el.getAttribute('position');
    let cur_rot = this.el.getAttribute('rotation');

    /* Update user position and rotation only if changed */
    if (!AFRAME.utils.deepEqual(pre_pos, cur_pos) || !AFRAME.utils.deepEqual(pre_rot, cur_rot)) {
      this.data.position = cur_pos;
      this.data.rotation = cur_rot;

      /* Log the start of the session, but otherwise keep logging */
      if (!this.data.session) {
        this.logData(TYPE_LOG, {session: START});
        this.data.session = true;
      } else {
        this.logData(TYPE_LOG, {});
      }
    }
  },

  /**
   * logData - Catches DRAG_END_EVENT and logs end of user action
   */
  logDragStart: function(event) {
    /* Toggle logging mutex */
    this.dragging_obj = true;

    /* Find the corr. HTML element. Note `.detail` has extra info emitted by the `click-drag` events */
    this.logData(TYPE_ACT, this.prepareFurnitureData(START, event));
  },

  /**
   * logData - Catches DRAG_END_EVENT and logs end of user action
   */
  logDragEnd: function(event) {
    /* Check mutex so only catch one DRAG_END_EVENT. --GH#79 */
    if (this.dragging_obj) {
      this.logData(TYPE_ACT, this.prepareFurnitureData(END, event));

      /* Reset for next object */
      this.dragging_obj = false;
    }
  },

  /**
   * logData - Create Log object and POST to endpoint
   *
   * @param  {String} log_type     Pulse/Action log
   * @param  {String} data         Additional data
   */
  logData: function(log_type, data) {
    if (this.data.logging) {
      let log = {
          ga_client_id: this.data.client_id,
          host_domain: this.data.host_domain,
          refer: this.data.referrer,
          user: {
            position: AFRAME.utils.coordinates.stringify(this.data.position),
            rotation: AFRAME.utils.coordinates.stringify(this.data.rotation)
          },
          type: log_type,
          data: data
      };

      axios.post(ENDPOINT, log)
        .then(function(res) {
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },

  /**
   * prepareFurnitureData - Returns object describing furniture action
   *
   * @param  {String} action_status   START ^ END
   * @param  {Object} event           DRAG_START_EVENT ^ DRAG_END_EVENT object
   * @return {Object}                 Action details
   */
  prepareFurnitureData: function(action_status, event) {
    let furniture_id;
    let action_type;
    let element = event.detail.target;

    /* Determine if MOVE or ROTATE action. --GH#79 */
    if (!element.id) {
      action_type = ACTION_MOVE;
      furniture_id = element.children[0].id;
    } else {
      action_type = ACTION_ROTATE;
      furniture_id = element.id;
    }

    return {
      action_status: action_status,
      action_type: action_type,
      furniture_id: furniture_id,
      furniture_position: element.object3D.position,
      furniture_rotation: element.object3D.rotation
    };
  },

  /* A-frame components awaiting implementation */
  // update: function (oldData) {},
  // remove: function () {},
  // pause: function () {},
  // play: function () {}
});
