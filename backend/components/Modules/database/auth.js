const mongo = require('../database/mongoCallBack.js')

async function login(body) {
   let result = await mongo.db('Server').collection('users').findOne({
        username: (body.username),
        password: (body.password)
    });
    if(result != null){
        return JSON.stringify( {message: "ok"});
    } else {
        return JSON.stringify({message: "failed"});
    }
}
 exports.module = {login};
