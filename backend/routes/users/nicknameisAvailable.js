const express = require('express')
router = express.Router()
const mongo = require('../../components/Modules/database/findNickname.js')
const tokenGenerate = require('../../components/Modules/token/tokenGenerate.js')

router.post('/nicknameisAvailable', async (req,res) => {
    
    let result =  await mongo.module.findNickname(req.body)
    if(result){
        res
        .json({
            "isAvailable": false
          });
    } else {
    res
    .json({
        "isAvailable": true
      });
    }
})

 module.exports = router;