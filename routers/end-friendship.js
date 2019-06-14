const express = require('express');
const router = express.Router();
const print = require('../utils/print');
const { db } = require('../utils/db');
const cookies = require('../utils/cookies');

router.route('/end-friendship')
    .post(async(req, res) => {
        const senderId = req.session[cookies.userId];
        const reciever = req.body.id;
        try {
            print.warning(`Trying to end friendship with with senderId ${senderId} and ${reciever}`);
            let result = await db.unfriend(senderId, reciever);
            result = result.rows[0];
            print.info(`The result is `, result);
            if (!result){
                res.json({
                    success: true,
                    endUserId: reciever
                });
            } else {
                res.status(500).json({ error: 'The server could now did not end the friendship' });
            }  
        } catch (e) {
            print.error('The error in the friend button route was', e);
            res.status(500).json({ error: e });
        }
    });

module.exports = router;