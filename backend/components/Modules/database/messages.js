const mongo = require('../database/mongoCallBack.js');

async function messages(id) {
  try {
    const mongoResult = await mongo.db('Server').collection('chats').findOne({
      "chatid": id
    });
    console.log(mongoResult)
    return mongoResult.messages ;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = { messages };
