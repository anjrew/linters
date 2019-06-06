const express = require('express');
const router = express.Router();
const routes = require('../routers/routes');
const cookies = require('../utils/cookies');
const { db } = require('../utils/db');
const print = require('../utils/print');

router.route(routes.otherUser)
    .get(async(req, res) => {
        // const userId = req.session[cookies.userId];
        const otherUserId = req.params;
        print.info("Getting other user profile with req.params", otherUserId);
        try {
            let user = await db.findUserId(otherUserId);
            user = user.rows[0];
            print.success("Got the user from the database with details and sending", user);
            res.json(user);
        } catch (error) {
            res.status(500).json({
                error: error
            });
        }
    });


module.exports = router;