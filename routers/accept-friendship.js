const express = require('express');
const router = express.Router();
const print = require('../utils/print');
const { db } = require('../utils/db');
const cookies = require('../utils/cookies');

router.route('/accept-friendship')
    .post(async(req, res) => {
        const senderId = req.session[cookies.userId];
        const reciever = req.body.id;
        try {
            let result = await db.acceptFriendRequest(senderId, reciever);
            result = result.rows[0];
            if (result){
                res.json({ 
                    success: true,
                    user: result
                } );
            } else {
                res.status(500).json({ error: 'The database did not save the result' });
            } 
        } catch (e) {
            print.error('The error in the friend button route was', e);
            res.status(500).json({ error: e });
        }
    });
	
module.exports = router;