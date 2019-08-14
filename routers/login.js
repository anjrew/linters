
const express = require('express');
const router = express.Router();
const routes = require('../routers/routes');
const cookies = require('../utils/cookies');
const { db } = require('../utils/db');
const encryption = require('../utils/encryption');
const print = require('../utils/print');
const chalk = require('chalk');

router.route(routes.login)
    .get((req, res) => {
        console.log('here');
        res.json({
            error: 'This is an error'
        });
    })

    .post(async (req, res) => {

        const email = req.body.email;
        const passwordAttempt = req.body.password;
        
        if (email && passwordAttempt) {
            console.log('Email was : ', email, " and password is ", passwordAttempt);

            try {
                const result = await db.getHashedPWord(email);
                const hashedP = result.rows[0].password;
                const doesMatch = await encryption.checkPassword(passwordAttempt, hashedP);
                let userProfile;
                if (doesMatch) { userProfile = await  db.findUserEmail(email); }
                userProfile = userProfile.rows[0];
                req.session[cookies.userId] = userProfile.id;
                res.json( userProfile );
                    
            } catch (e) {
                print.error(e);
                res.json({
                    error: "Bad credentials. Please check and try again"
                });
            }
        } else {
            print.error('Not all fields were filled in login page');
            res.json({
                error: "Not all fields were filled in login page"
            });
        }
    });


module.exports = router;