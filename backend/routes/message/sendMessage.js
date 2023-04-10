const express = require('express');
const { Int32 } = require('mongodb');
const mongo = require('../../components/Modules/database/sendMessage.js')
router = express.Router()

router.post('/sendMessage',async (req,res) => {
    const chatid = Number(req.query.id);
    console.log(chatid)
    let result =  await mongo.sendMessage(req, chatid)
        res
        .json({ 
    result
        });
    


})

 module.exports = router;