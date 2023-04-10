const express = require('express')
router = express.Router()
const whoami = require('../../components/Modules/database/whoami.js')

router.get('/whoami', async (req, res) => {
  if (req.headers.cookie != null) {
    let result = await whoami.module.whoami(req.headers.cookie)
    if (result == null) {
      console.log("null")
    } else {
      res.json({
        "username": result.username,
        "id": result.id,
        "contacts": result.contacts,
        "chatlist": result.chatList
      });
    }
  } else {
    res.status(404).json({
      "message": "yo wtf?"
    });
  }
})


module.exports = router;