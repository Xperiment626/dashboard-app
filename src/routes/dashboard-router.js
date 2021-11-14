const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
    res.render('dashboard/dashboard-panel', {css: '<link rel="stylesheet" href="/css/main.css">'});
})

module.exports = router;