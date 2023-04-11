const mongo = require('../database/mongoCallBack.js')
const whoami = require('./whoami.js')
const userInfo = require('./userInfo.js')

async function sendMessage(req, chatid) {
    const author =  await whoami.module.whoami(req.headers.cookie);
    console.log(author.username + " send message")
   let result = await mongo.db('Server').collection('chats').updateOne(
    { chatid: chatid },
    { $push: { messages: {
        text: req.body.text,
        author: author.id,
    } } }
  );
    if(result != null){
        return JSON.stringify( {message: "ok"});
    } else {
        return JSON.stringify({message: "failed"});
    }
}
module.exports = {sendMessage};
