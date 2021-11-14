const mongoose = require('mongoose');
const { Schema } = mongoose;

const treatmentSchema = new Schema({
    identification_number: { type: String, require: true },
    description: { type: String, require: true },
    cost: { type: String, require: true },
    start_date: { type: String, require: true },
    end_date: { type: String, require: true },
    duration: { type: String, require: true },
    treatment_time: { type: String, require: true },
    number_scheduled_appointments: { type: String, require: true},
    scheduled_appointments_attended: { type: String, require: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Treatment', treatmentSchema);