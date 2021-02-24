const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientSchema = new Schema({
    id: String,
    name: String,
    full_name: String,
    phone: String,
    email: String
});

mongoose.model('Client', clientSchema);
