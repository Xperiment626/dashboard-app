const Treatment = require('../models/treatment-model');

// const { isAuthenticated } = require('../helpers/auth');

const controller = {};

// controller.isAuthenticated = isAuthenticated;

controller.getAllTreatments = async(req, res) => {
    const all_treatments = await Treatment.find({ treatment: req.treatment_id }).sort({ date: 'desc' }).lean();
    res.render('treatments/admin/admin-all-treatments', {
        all_treatments,
        css: '<link rel="stylesheet" href="/css/Treatment/admin-all-treatments.css">'
    });
};

controller.add_treatment = (req, res) => {
    res.render('treatments/admin/admin-create-treatment', { css: '<link rel="stylesheet" href="/css/treatment/admin-create-treatment.css">' })
};

controller.create_treatment = async(req, res) => {
    const { identification_number, description, cost, start_date, end_date, duration, treatment_time, number_scheduled_appointments, scheduled_appointments_attended } = req.body;
    const errors = [];

    if (description.length <= 0) {
        errors.push({ text: 'Please insert a full name' });
    }
    if (cost.length <= 0) {
        errors.push({ text: 'Please insert treatment cost' });
    }
    if (start_date.length <= 0) {
        errors.push({ text: 'Please insert treatment start date' });
    }
    if (end_date.length <= 0) {
        errors.push({ text: 'Please insert treatment end date' });
    }
    if (duration.length <= 0) {
        errors.push({ text: 'Please insert treatment duration' });
    }
    if (treatment_time.length <= 0) {
        errors.push({ text: 'Please insert treatment time' });
    }
    if (number_scheduled_appointments.length <= 0) {
        errors.push({ text: 'Please insert number of scheduled appointments' });
    }
    if (scheduled_appointments_attended.length <= 0) {
        errors.push({ text: 'Please insert number of scheduled appointments attended' });
    }
    if (errors.length > 0) {
        res.render('treatments/admin/admin-insert-treatment', {
            errors,
            identification_number,
            description,
            cost,
            start_date,
            end_date,
            duration,
            treatment_time,
            number_scheduled_appointments,
            scheduled_appointments_attended,
            css: '<link rel="stylesheet" href="/css/user/admin-create-treatment.css">'
        });
    } else {
        const newTreatment = new Treatment({
            identification_number,
            description,
            cost,
            start_date,
            end_date,
            duration,
            treatment_time,
            number_scheduled_appointments,
            scheduled_appointments_attended
        });
        // newUser.user = req.user._id;
        await newTreatment.save();
        req.flash('success_msg', 'Treatment created successfully');
        res.redirect('/admin/all-treatments');
    }
};

controller.edit = async(req, res) => {
    const treatment = await Treatment.findById(req.params.id).lean();
    res.render('treatments/admin/admin-edit-treatment', {
        treatment,
        css: '<link rel="stylesheet" href="/css/treatment/admin-edit-treatment.css">'
    });
};

controller.edit_treatment = async(req, res) => {
    const {
        identification_number,
        description,
        cost,
        start_date,
        end_date,
        duration,
        treatment_time,
        number_scheduled_appointments,
        scheduled_appointments_attended
    } = req.body;

    await Treatment.findByIdAndUpdate(req.params.id, {
        identification_number,
        description,
        cost,
        start_date,
        end_date,
        duration,
        treatment_time,
        number_scheduled_appointments,
        scheduled_appointments_attended
    });

    req.flash('success_msg', 'Treatment updated Successfully');
    res.redirect('/admin/all-treatments');
};

controller.delete = async(req, res) => {
    await Treatment.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Treatment deleted Successfully');
    res.redirect('/admin/all-treatments');
};

module.exports = controller;