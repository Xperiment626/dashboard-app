const express = require('express');
const router = express.Router();
const controller = require('../controllers/client-controller');

router.get('/admin/all-clients', controller.getAllClients);

router.get('/admin/add-client', controller.add_client);

router.post('/admin/insert-client', controller.create_client);

router.get('/admin/client/edit/:id', controller.edit);

router.put('/admin/edit-client/:id', controller.edit_client);

router.delete('/admin/delete-client/:id', controller.delete);

module.exports = router;