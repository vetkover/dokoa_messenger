const mongo = require('../database/mongoCallBack.js')


var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var passwordLength = 64;
var password = "";

function genRan(){
    for (var i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber +1);
       }
       return password;
}


async function tokenGenerate(req){
    password = "";
    let token = genRan();
    const rememberMe = req.body.remember != undefined && req.body.remember ? ( Date.now() + 604800 ) : false;
    console.log(rememberMe + " remember")
    console.log(req.body)
    let result = await mongo.db('Server').collection('Main').findOne({
        username: (req.body.nickname),
        token: (token),
    })
    if (result == null)  {

        const query = { username: `${req.body.nickname}` };
        const update = { "$push": { "sessions": {"token": token, remember: rememberMe} } }
        await mongo.db('Server').collection('users').updateOne(query, update);
        return token 
    }

}

exports.module = {tokenGenerate};