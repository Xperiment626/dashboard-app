const User = require('../models/user-model');
// const { isAuthenticated } = require('../helpers/auth');

const controller = {};

// controller.isAuthenticated = isAuthenticated;

controller.getAllUsers = async (req, res) => {
    const all_users = await User.find({ user: req.user_id }).sort({ date: 'desc' }).lean();
    res.render('users/admin/admin-all-users', { all_users,
        css: '<link rel="stylesheet" href="/css/user/admin-all-users.css">'});
};

controller.add_user = (req, res) => {
    res.render('users/admin/admin-create-user', { css: '<link rel="stylesheet" href="/css/user/admin-create-user.css">' })
};

controller.create_user = async (req, res) => {
    const { full_name, identification_number, email, role, password, confirm_password } = req.body;
    const errors = [];

    if (full_name.length <= 0) {
        errors.push({ text: 'Please insert a full name' });
    }
    if (identification_number.length <= 0) {
        errors.push({ text: 'Please insert an ID number' });
    }
    if (email.length <= 0) {
        errors.push({ text: 'Please insert an email' });
    }
    if(role.length <= 0){
        errors.push({ text: 'Please add a role' });
    }
    if (password.length <= 0) {
        errors.push({ text: 'Please insert a password' });
    } else {
        if (password.length < 3) {
            errors.push({ text: 'Password must be at least 3 characters' });
        }
    }
    if (confirm_password.length <= 0) {
        errors.push({ text: 'Please insert confirmation password' });
    }
    if (confirm_password != password) {
        errors.push({ text: 'Confirm password do not match password' });
    }
    if (errors.length > 0) {
        res.render('users/admin/admin-create-user', {
            errors,
            full_name,
            identification_number,
            email,
            role,
            password,
            confirm_password,
            css: '<link rel="stylesheet" href="/css/user/admin-create-user.css">'
        });
    } else {
        const newUser = new User({
            full_name,
            identification_number,
            email,
            role,
            password,
            confirm_password
        });
        // newUser.user = req.user._id;
        await newUser.save();
        req.flash('success_msg', 'User created successfully');
        res.redirect('/admin/all-users');
    }
};

controller.edit = async(req, res) => {
    const user = await User.findById( req.params.id ).lean();
    res.render('users/admin/admin-edit-user', { 
        user,
        css: '<link rel="stylesheet" href="/css/user/admin-edit-user.css">'
     } );
};

controller.edit_user = async(req, res) => {
    const { full_name, identification_number, email, role, password, confirm_password } = req.body;
    
    await User.findByIdAndUpdate(req.params.id, { 
        full_name, 
        identification_number, 
        email, 
        role, 
        password, 
        confirm_password
     });

    req.flash('success_msg', 'User updated Successfully');
    res.redirect('/admin/all-users');
};

controller.delete = async(req, res) => {
    await User.findByIdAndDelete( req.params.id );
    req.flash('success_msg', 'User deleted Successfully');
    res.redirect('/admin/all-users');
};

module.exports = controller;