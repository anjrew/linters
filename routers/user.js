
const express = require('express');
const router = express.Router();
const routes = require('../routers/routes');
const cookies = require('../utils/cookies');
const { db } = require('../utils/db');
const print = require('../utils/print');

// TODO:

router.route(routes.user)
    .get(async(req, res) => {
        const userId = req.session[cookies.userId];
        print.info("Getting user profile with cookie Session user id", userId);
        try {
            let user = await db.findUserId(userId);
            user = user.rows[0];
            res.json(user);
        } catch (error) {
            res.status(500).json({
                error: error
            });
        }
    });


module.exports = router;