const express = require('express')
router = express.Router()
const tokenExist = require("../backend/components/Modules/database/tokenExist.js");

function cookie(req){
    try{
        var cookie = req.headers.cookie;
        for ( let i in cookie.split(';')){
            if (cookie.split(';')[i].includes('token')){
            return cookie.split(';')[i].split('=')[1]}
        }
        } catch (e){
            //console.log(e)
        }
    }
    router.use(async (req, res, next) => {
        const result = await tokenExist.tokenExist(cookie(req));
        if (result) {
          next();
        } else {
          res
          .status(401)
          .json({ 
              message: "anonymous",
          });
        }
      });

module.exports = router;