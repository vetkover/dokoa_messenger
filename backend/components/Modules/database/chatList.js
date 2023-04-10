const mongo = require('../database/mongoCallBack.js');

async function chatList(id) {
  try {
    const mongoResult = await mongo.db('Server').collection('chats').find({
      "accessUsers.id": id
    }).toArray();
    for (let i = 0; i < mongoResult.length; i++) {
      const lastMessage = mongoResult[i].messages[mongoResult[i].messages.length - 1];
      mongoResult[i].messages = lastMessage;
    }

    return mongoResult;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = { chatList };
