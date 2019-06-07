const express = require('express');
const router = express.Router();
const { db } = require('../utils/db');
const print = require('../utils/print');

router.route('/api/user')

    .post(async(req, res) => {
        const otherUser = req.body.id;
        const currentUser = req.session.userId;
        if (currentUser == otherUser ){
            res.json({ currentUser: true});
        } else {
            try {
                const result = await db.findUserId(otherUser);
                print.warning(`The result from the database is finding user with id ${otherUser}`, result);
                const user = result.rows[0];
                res.json(user);
            } catch (error) {
                res.status(500).json({
                    error: error
                });
            }
        }
    });


module.exports = router;