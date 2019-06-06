const express = require('express');
const router = express.Router();
const routes = require('../routers/routes');
const { db } = require('../utils/db');
const print = require('../utils/print');

router.route(routes.otherUser)
    .get(async(req, res) => {
        const otherUser = req.params;
        print.info("Getting other user profile with req.params ", otherUser);
        try {
            let user = await db.findUserId(otherUser.id);
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