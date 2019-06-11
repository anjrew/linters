
const express = require('express');
const router = express.Router();
const routes = require('../routers/routes');
const cookies = require('../utils/cookies');
const { db } = require('../utils/db');
const encryption = require('../utils/encryption');
// const userLoggedInAtEntry = require('../utils/middleware').userLoggedInAtEntry;
const print = require('../utils/print');
const chalk = require('chalk');

router.route(routes.registration)
    .get((req, res) => {
        console.log('here');
        res.json({
            error: 'This Get error'
        });
    })
    .post(async (req, res) => {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const password = req.body.password;

        if (!firstName || !lastName || !email || !password) {

            print.error('Not all fields were filled');
            res.json({
                error: "Not all fields were filled"
            });

        } else {
            try { 
                const hashedP = await encryption.hashPassword(req.body.password);
                const result = await db.addUser(firstName, lastName, email, hashedP);
                let id = result.rows[0].id;
                req.session[cookies.user] = id;
                res.json( result.rows[0] );
                
            } catch (e) {
                print.error('The error was ', e);
                res.json({
                    error: "Bad credentials. Please check and try again"
                });
            }
        }
    });


module.exports = router;