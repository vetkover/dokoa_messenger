const express = require('express')
router = express.Router()
const mongo = require('../../components/Modules/database/findTrustKeyUser.js')

router.post('/createRecoveryToken',async (req,res) => {
    const result = await mongo.module.findTrustKeyUser(req.body.value);

    if(result){

    }

    const fileBody = req.body.file
    res
    .json(req.body.value );

})

 module.exports = router;