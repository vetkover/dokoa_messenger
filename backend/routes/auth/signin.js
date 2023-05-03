const express = require("express");
router = express.Router();
const mongo = require("../../components/Modules/database/signin.js");

router.post("/signin", async (req, res) => {
  let result = await mongo.module.signin(req.body);

  
  if (result == true) {
    res.json(true);
  } else {
    res.json(false);
  }
});

module.exports = router;
