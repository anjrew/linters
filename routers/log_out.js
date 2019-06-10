const express = require('express');
const router = express.Router();
const print = require('../utils/print');

router.route('/api/logout')
    .get(async(req, res) => {
        print.warning('Loggin out');
        req.session = null;
        res.redirect('/');
    });


module.exports = router;