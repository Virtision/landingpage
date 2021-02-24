const mongoose =require('mongoose');
const { Schema } = mongoose;

const furnitureSchema = new Schema({
    id:String,
    name: String,
    type: String,
    model: String,
    material: String,
});

mongoose.model('Furniture', furnitureSchema);
