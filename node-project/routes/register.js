const express = require ('express');
const router = express.Router();
const check = require ('../check');
const { register } = require('../models/model');


router.get('/signup', async function(req, res, next){
    res.send("hello")
})

router.put('/signup', async function(req, res, next){
    
})

module.exports = router;
