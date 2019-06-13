const express = require('express');
const router = express.Router();
const print = require('../utils/print');
const { db } = require('../utils/db');


router.route('/friends-wannabes')
    .get(async(req, res) => {
        const currentUser = req.session.userId;
        try {
            let result = await db.getFriends(currentUser);
            print.success(`Found friends of user ${currentUser} from the database with details and sending`, result);
            res.json(result.rows);
            
        } catch (error) {
            print.error('The error in /friends-wannabes is', error);
            res.status(500).json({
                error: error
            });
        }
    });

module.exports = router;