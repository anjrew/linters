
const express = require('express');
const router = express.Router();
const routes = require('../routers/routes');
const cookies = require('../utils/cookies');
const { db } = require('../utils/db');
const encryption = require('../utils/encryption');
const print = require('../utils/print');

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
            try {
                const result = await db.getHashedPWord(email);
                print.info(`Result password is `, result);
                const hashedP = result.rows[0].password;
                print.info('The unhashed P is ', hashedP);
                const doesMatch = await encryption.checkPassword(passwordAttempt, hashedP);
                    
                let userProfile;

                if (doesMatch) { userProfile = await  db.findUserEmail(email); }
                userProfile = userProfile.rows[0];
                print.info('userProfile is ', userProfile);
                print.info(' The user profile from login is ', userProfile);
                req.session[cookies.userId] = userProfile.id;
                res.json( userProfile );
                    
            } catch (e) {
                print.error(e);
                res.json({
                    error: "Not all fields were filled"
                });
            }

            
        } else {
            print.error('Not all fields were filled in login page');
            res.json({
                error: "Not all fields were filled"
            });
        }
    });


module.exports = router;