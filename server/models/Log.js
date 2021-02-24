const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * This is the schema for any logs the user does in the screen
 *
 * ga_session_id: is the google analytics session string. Should be unique per user per session
 * ga_client_id: ga client id. Should be same for returning users from same device & browser
 * type: this tells what kind of log it is
 *      - "User Log": general data about the user location and gaze
 *      - "User Action": an action where the user clicks something
 * timestamp: the timestamp of the event
 * host_domain: the domain that the scene is embedded from
 * user: data that relates to the user
 * data: additional data such as furniture, furniture location, item selected
 *
 * @type {*|Mongoose.Schema}
 */

const logSchema = new Schema({
    ga_session_id: String,
    ga_client_id: String,
    type: String,
    timestamp: {type: Date, default: Date.now},
    host_domain: String,
    refer: String,
    user:{
        position:String,
        rotation:String
    },
    data: Object
});

mongoose.model('Log', logSchema);
mongoose.model('Log_dev', logSchema);

module.exports = types = {
    USER_LOG : "User Log",
    USER_ACTION : "User Action"
};
