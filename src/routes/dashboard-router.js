const express = require('express');
const router = express.Router();
const controller = require('../controllers/dashboard-controller');

router.get('/dashboard', controller.draw);

module.exports = router;