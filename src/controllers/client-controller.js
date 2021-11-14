const Client = require('../models/client-model');

// const { isAuthenticated } = require('../helpers/auth');

const controller = {};

// controller.isAuthenticated = isAuthenticated;

controller.getAllClients = async (req, res) => {
    const all_clients = await Client.find({ client: req.client_id }).sort({ date: 'desc' }).lean();
    res.render('clients/admin/admin-all-clients', { all_clients,
        css: '<link rel="stylesheet" href="/css/client/admin-all-clients.css">'});
};

controller.add_client = (req, res) => {
    res.render('clients/admin/admin-insert-client', { css: '<link rel="stylesheet" href="/css/client/admin-insert-client.css">' })
};

controller.create_client = async (req, res) => {
    const { full_name, email, phone, identification_number } = req.body;
    const errors = [];

    if (full_name.length <= 0) {
        errors.push({ text: 'Please insert a full name' });
    }
    if (phone.length <= 0) {
        errors.push({ text: 'Please insert a phone number' });
    }
    if (email.length <= 0) {
        errors.push({ text: 'Please insert an email' });
    }
    if (identification_number.length <= 0) {
        errors.push({ text: 'Please insert an ID number' });
    }
    if (errors.length > 0) {
        res.render('clients/admin/admin-insert-client', {
            errors,
            full_name,
            identification_number,
            email,
            phone,
            css: '<link rel="stylesheet" href="/css/user/admin-insert-client.css">'
        });
    } else {
        const newClient = new Client({
            full_name,
            identification_number,
            email,
            phone
        });
        // newUser.user = req.user._id;
        await newClient.save();
        req.flash('success_msg', 'Client inserted successfully');
        res.redirect('/admin/all-clients');
    }
};

controller.edit = async(req, res) => {
    const client = await Client.findById( req.params.id ).lean();
    res.render('clients/admin/admin-edit-client', { 
        client,
        css: '<link rel="stylesheet" href="/css/client/admin-edit-client.css">'
     } );
};

controller.edit_client = async(req, res) => {
    const { full_name, identification_number, email, phone } = req.body;
    
    await Client.findByIdAndUpdate( req.params.id, { 
        full_name, 
        identification_number,
        email, 
        phone
     });

    req.flash('success_msg', 'Client updated Successfully');
    res.redirect('/admin/all-clients');
};

controller.delete = async(req, res) => {
    await Client.findByIdAndDelete( req.params.id );
    req.flash('success_msg', 'Client deleted Successfully');
    res.redirect('/admin/all-clients');
};

module.exports = controller;