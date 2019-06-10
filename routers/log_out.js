const express = require('express');
const router = express.Router();
const print = require('../utils/print');

router.route('/api/logout')
    .post(async(req, res) => {
        print.warning('Loggin out');
        req.session = null;
        res.json({
            success:true
        });
        // res.redirect('/welcome');
    });


module.exports = router;