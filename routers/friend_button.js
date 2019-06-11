const express = require('express');
const router = express.Router();
const print = require('../utils/print');

router.route('/api/friend-button')
    .post(async(req, res) => {
        print.info('POSTing the friend button state');
        
    })
    .delete(async(req, res) => {
        print.info('DELETting the friend button state');
        
    })
    .put(async(req, res) => {
        print.info('PUTTING the friend button state');
        
    });

router.route('/api/friend-button/:id')
    .get(async(req, res) => {
        print.info('GETting the friend button state');
        
    });



module.exports = router;