const mongo = require('./mongoCallBack.js')

async function userInfo(id) {
    let result = await mongo.db('Server').collection('users').findOne({
         "id": id,
     });
     return result
 }

exports.module = {userInfo};