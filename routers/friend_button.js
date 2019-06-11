const express = require('express');
const router = express.Router();
const print = require('../utils/print');
const { db } = require('../utils/db');
const cookies = require('../utils/cookies');


router.route('/api/friend-button/')
    .post(async(req, res) => {
        print.info('POSTing the friend button routes with req.body', req.body);
        const senderId = req.session[cookies.userId];
        const reciever = req.body.id;
        try {
            let result = await db.addFriendRequest(senderId, reciever);
            result = result.rows[0];
            res.json({ 
                requestExists: true ,
                result: result,
            });
        } catch (e) {
            res.status(500).json({ error: e });
        }
    })
    .delete(async(req, res) => {
        print.info('DELETting the friend button state');
        
    })
    .put(async(req, res) => {
        print.info('PUTTING the friend button state');
        
    });

router.route('/api/friend-button/:id')
    .get(async(req, res) => {
        const senderId = req.session[cookies.userId];
        const reciever = req.params.id;
        print.success(`In the friend button GET route with params `, req. params);


        try {
            print.success('In the try');

            let result = await db.getRelationship(senderId, reciever);
            result = result.rows[0];

            print.warning(`The result from the database query was in get relationship was `, result);

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

            print.info('GETting the friend button state');
        } catch (e) {
            print.error('The Try for other user info threw with ', e);
            res.status(500).json({ error: e });
        }
    });



module.exports = router;