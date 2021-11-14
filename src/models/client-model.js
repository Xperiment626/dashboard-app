const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientSchema = new Schema({
    full_name: { type: String, require: true },
    identification_number: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: String, require: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Client', clientSchema);