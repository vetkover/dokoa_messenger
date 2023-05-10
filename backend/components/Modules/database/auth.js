const mongo = require('../database/mongoCallBack.js')

async function login(body) {
   let result = await mongo.db('Server').collection('users').findOne({
        username: (body.nickname),
        password: (body.password)
    });
    if(result != null){
        return true;
    } else {
        return false;
    }
}
 exports.module = {login};
