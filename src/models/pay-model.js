const mongoose = require('mongoose');
const { Schema } = mongoose;

const paySchema = new Schema({
    id_cliente: { type: String, require: true },
    cobrado: { type: String, require: true },
    collected: { type: String, require: true },
    pending: { type: String, require: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pay', paySchema);