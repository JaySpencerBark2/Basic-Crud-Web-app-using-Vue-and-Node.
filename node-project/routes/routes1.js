const express = require ('express');

const router = express.Router();
module.exports = router;
const check = require('../check');



router.post('/delete', async function(req, res, next){
    const jsonItem = req.body;
    const rawItem =  jsonItem.item;
    const id = rawItem.selectable._id
    console.log(id);

    try{
        check.deleteEntrie(id)
        return res.sendStatus(200);
    } catch(error){
        console.log(error);
        return res.sendStatus(404);
    }
});

router.put('/new', async function(req, res, next){
    const jsonItem = req.body;
    const fname = jsonItem.firstname;
    const lname = jsonItem.lastname;
    const mail = jsonItem.email;

    try{
        check.inputUser(fname, lname, mail);
        console.log('First Name', fname);
        console.log('Last Name', lname);
        console.log('Email', mail);
        return res.sendStatus(200);
    } catch(error){
        console.log(error);
        return res.sendStatus(404);
    }
});

router.put("/update", async function(req, res, next){
    const updateItem = req.body;
    try{
        console.log(updateItem);
        check.updateEntrie(updateItem);
        return res.sendStatus(200);
    }catch(error){
        console.log(error)
        return res.sendStatus(404);
    }
})





//route testing method/
router.get('/update', async function(req, res, next){
    res.send("hello")
})
module.exports =  router;