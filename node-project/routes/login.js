const express = require ('express');
const router = express.Router();
const check = require ('../check');
const passport = require("passport");




router.post('/login',
   passport.authenticate('local',{ failureMessage: true}),
    function(req, res){
        console.log("/login : user : ", req.user);
        //res.redirect('/~' + req.user.username)
        req.session['testvar'] = 'hello';
        res.status(200).send({message : 'OK'})
    }
) 


router.get('/login', async function(req, res, next){
    res.send("hello")
})
module.exports = router;