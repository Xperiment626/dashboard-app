const express = require('express');
const router = express.Router();
const controller = require('../controllers/user-controller');

router.get('/user/signin', (req, res) => {
    res.render('users/signin.hbs', {css: '<link rel="stylesheet" href="/css/user/signin.css">'});
});

router.get('/user/signup', (req, res) => {
    res.send('User');
});

router.get('/admin/all-users', controller.getAllUsers);

router.get('/admin/add-user', controller.add_user);

router.post('/admin/create-user', controller.create_user);

router.get('/admin/edit/:id', controller.edit);

router.put('/admin/edit-user/:id', controller.edit_user);

router.delete('/admin/delete-user/:id', controller.delete);

module.exports = router;