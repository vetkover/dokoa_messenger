const express = require("express");
router = express.Router();
const mongo = require("../../components/Modules/database/signin.js");
const trustKeyGenerate = require('../../components/Modules/generators/trustKeyGenerate.js')
const tokenGenerate = require('../../components/Modules/generators/tokenGenerate.js')

router.post("/signin", async (req, res) => {
  let result = await mongo.module.signin(req.body);
  if (result.status == true) {
    res
    .cookie("token", await tokenGenerate.module.tokenGenerate(req))
    .json({
      accept: true,
      trustKey: result.trustKey
    });
  } else {
    res.json(false);
  }
});

module.exports = router;
