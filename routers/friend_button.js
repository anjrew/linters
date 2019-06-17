const express = require('express');
const router = express.Router();
const print = require('../utils/print');
const { db } = require('../utils/db');
const cookies = require('../utils/cookies');

router.route('/api/friend-button')
    .post(async(req, res) => {
        print.info('POSTing the friend button routes with req.body', req.body);
        const senderId = req.session[cookies.userId];
        const reciever = req.body.id;
        const status = req.body.status;
        try {
            if (status === 'noExistingRequest') {
                let result = await db.addFriendRequest(senderId, reciever);
                result = result.rows[0];
                if (result){
                    res.json('cancelRequest');
                } else {
                    res.status(500).json({ error: 'The datbase did not save the result' });
                }
            } else if (status === 'cancelRequest' || status === 'accepted') {
                let result = await db.unfriendReject(senderId, reciever);
                result = result.rows[0];
                if (!result){
                    res.json('noExistingRequest');
                } else {
                    res.status(500).json({ error: 'The datbase did not save the result' });
                }  
            }  else if (status === 'acceptRequest'){
                let result = await db.acceptFriendRequest(senderId, reciever);
                result = result.rows[0];
                if (result){
                    res.json('accepted');
                } else {
                    res.status(500).json({ error: 'The database did not save the result' });
                } 
            }
        } catch (e) {
            print.error('The error in the friend button route was', e);
            res.status(500).json({ error: e });
        }
    });

router.route('/api/friend-button/:id')
    .get(async(req, res) => {
        const senderId = req.session[cookies.userId];
        const reciever = req.params.id;

        try {
            let result = await db.getRelationship(senderId, reciever);
            result = result.rows[0];

            if (result) {

                if (result.accepted){
                    res.json('accepted');
                } else {
                    if (result.reciever_id == reciever) {
                        res.json('cancelRequest');
                    } else {
                        res.json('acceptRequest');
                    }
                }
            } else {
                res.json('noExistingRequest');
            }

        } catch (e) {
            print.error('The Try for other user info threw with ', e);
            res.status(500).json({ error: e });
        }
    });



module.exports = router;