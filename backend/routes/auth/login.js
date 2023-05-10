const express = require('express')
router = express.Router()
const mongo = require('../../components/Modules/database/auth.js')
const tokenGenerate = require('../../components/Modules/token/tokenGenerate.js')

router.post('/login',async (req,res) => {
    
    let result =  await mongo.module.login(req.body)
    const rememberMe = req.body.remember ? 604800000 : false;
    if(result === true){
        res
        .cookie("token", await tokenGenerate.module.tokenGenerate(req), { maxAge: Number(rememberMe)})
    }
    res
    .json( JSON.parse(result) );

})

 module.exports = router;