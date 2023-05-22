const mongo = require('../database/mongoCallBack.js');

async function findTrustKeyUser(trustKey) {
  try {
    const mongoResult = await mongo.db('Server').collection('users').findOne({
      "trustKey": trustKey
    });
    console.log(mongoResult)
    return mongoResult ;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

exports.module = { findTrustKeyUser };
