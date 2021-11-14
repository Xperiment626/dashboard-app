const mongoose = require('mongoose');
const { Schema } = mongoose;

const expensesSchema = new Schema({
    description: { type: String, requiere: true},
    cost: { type: String, requiere: true },
    expense_date: { type: String, requiere: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expenses', expensesSchema);