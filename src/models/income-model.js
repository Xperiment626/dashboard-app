const mongoose = require('mongoose');
const { Schema } = mongoose;

const incomeSchema = new Schema({
    id_pay: { type: String, require: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Income', incomeSchema);