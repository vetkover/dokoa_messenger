const mongo = require('../database/mongoCallBack.js')

async function changePassword(body) {
   let result = await mongo.db('Server').collection('users').updateOne(
    {id: body.id},
    {$set: 
        {
            password: 28
        }
    }
)
    if(result != null){
        return true;
    } else {
        return false;
    }
}
 exports.module = {changePassword};
