const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientfreqSchema = new Schema({
    id_client: { type: String, require: true },
    frequency: { type: String, requere: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Clientfreq', clientfreqSchema);