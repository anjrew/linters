const express = require('express');
const router = express.Router();
const print = require('../utils/print');
const { db } = require('../utils/db');
const cookies = require('../utils/cookies');

router.route('/delete-account')
    .post( async(req, res) => {
        const userId = req.session[cookies.userId];
        try {
            let result = await db.deleteUser(userId);
            req.session = null;
            result = result.rows[0];
            if (result){
                res.redirect('/welcome');
            } else {
                res.status(500).json({ error: 'The database did not save the result' });
            } 
        } catch (e) {
            print.error('The error in the Delete button route was', e);
            res.status(500).json({ error: e });
        }
    });
	
module.exports = router;