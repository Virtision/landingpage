const mongoose =require('mongoose');
const { Schema } = mongoose;

const sceneSchema = new Schema({
    id:String,
    info:{
      client_id: mongoose.Schema.ObjectId,
      name: String,
      description: String,
      address: String,
      layout_type: String
    },
    user:{
        position: String,
        rotation: String,
        height: Number
    },
    exterior:{
        landscape_uri: String,
        sky_uri: String
    },
    rooms:{
        ceiling_uri: String,
        floor_uri: String,
        height: Number,
        width: Number,
        position: String,
        rotation: String,
        model_obj_uri: String,
        model_mtl_uri: String,
        layout:{}
    }
});

mongoose.model('Scene', sceneSchema);
