const express = require('express');
const router = express.Router();
const controller = require('../controllers/treatment-controller');

router.get('/admin/all-treatments', controller.getAllTreatments);

router.get('/admin/add-treatment', controller.add_treatment);

router.post('/admin/create-treatment', controller.create_treatment);

router.get('/admin/treatment/edit/:id', controller.edit);

router.put('/admin/edit-treatment/:id', controller.edit_treatment);

router.delete('/admin/delete-treatment/:id', controller.delete);

module.exports = router;