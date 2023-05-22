const express = require('express')
router = express.Router()
const mongo = require('../../components/Modules/database/auth.js')
const tokenGenerate = require('../../components/Modules/generators/tokenGenerate.js')

router.post('/recoveryByTrustkey',async (req,res) => {
    
    const fileBody = req.body
    res
    .json( fileBody );

})

 module.exports = router;