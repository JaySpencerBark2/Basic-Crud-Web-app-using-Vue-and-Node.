const express = require ('express');
const router = express.Router();
const check = require ('../check');

router.get('/route3', async function (req , res , next){
   //res.send("hello")
   
    
   // await check.inputUser();
    await check.collectTable();
    res.status(200).send(await check.collectTable())

    //res.status(404).send("bruh")
})



router.post('/login',

)
module.exports = router;


