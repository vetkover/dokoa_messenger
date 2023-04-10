const express = require('express')
const mongo = require('../../components/Modules/database/chatList.js')
router = express.Router()

router.get('/chatList',async (req,res) => {
    const id = Number(req.query.id);
    let result =  await mongo.chatList(1)
        res
        .json({ 
    result
        });
    


})

 module.exports = router;