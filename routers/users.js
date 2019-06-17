

const express = require('express');
const router = express.Router();
const { db } = require('../utils/db');
const print = require('../utils/print');

router.route(`/api/users`)
    .get(async(req, res) => {
        const searchVal = req.params.search;
        print.info("Finding Users with search value", searchVal);
        try {
            let result = await db.findLastestUsers(3);
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({
                error: error
            });
        }
    });

router.route(`/api/users/:search`)
    .get(async(req, res) => {
        const searchVal = req.params.search;
        print.info("Finding Users with search value", searchVal);
        try {
            let result = await db.findUsersQuery(searchVal);
            result = result.rows;
            res.json(result);
        } catch (error) {
            res.status(500).json({
                error: error
            });
        }
    });

module.exports = router;

