const express = require('express');
const { Int32 } = require('mongodb');
const mongo = require('../../components/Modules/database/messages.js')
router = express.Router()

router.get('/messages',async (req,res) => {
    const id = Number(req.query.id);
    console.log(id)
    let result =  await mongo.messages(id)
        res
        .json({ 
    result
        });
    


})

 module.exports = router;