const mongo = require('../database/mongoCallBack.js')

async function findNickname(body) {
   let result = await mongo.db('Server').collection('users').findOne({
        username: (body.nickname),
    });
    if(result != null){
        return true;
    } else {
        return false;
    }
}
 exports.module = {findNickname};
