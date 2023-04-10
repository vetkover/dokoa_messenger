const mongo = require('../database/mongoCallBack.js');

async function tokenExist(token) {
  try {
    const result = await mongo.db('Server').collection('users').findOne({
      "sessions.token": token
    });
    console.log(result ? true : false)
    return result ? true : false;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = { tokenExist };
