const mongo = require('../database/mongoCallBack.js');

async function tokenExist(token) {
  try {
    const result = await mongo.db('Server').collection('users').findOne({
      "sessions.token": token
    });
    return result ? true : false;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = { tokenExist };
