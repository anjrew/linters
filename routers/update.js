const express = require('express');
const router = express.Router();
const routes = require('../routers/routes');
const cookies = require('../utils/cookies');
const { db } = require('../utils/db');
const print = require('../utils/print');


router.route(routes.update)
    .post(async(req, res) => {
        const userId = req.session[cookies.userId];
        const bio = req.body.bio || '';
        print.info(`The user is ${userId} and the bio is`, bio );
        try {
            let result;
            if (bio){
                result = await db.updateBio(userId, bio);
            }
            const user = result.rows[0];
            res.json(user);
        } catch (e) {
            print.error('Error', e);
            res.status(500).json({
                error: e
            });
        }
    });


module.exports = router;