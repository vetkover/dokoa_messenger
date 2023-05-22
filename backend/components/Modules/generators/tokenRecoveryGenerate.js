const mongo = require('../database/mongoCallBack.js')


var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var passwordLength = 16;
var password = "";

function genRan(){
    for (var i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber +1);
       }
       return password;
}


async function tokenRecoveryGenerate(){
    password = "";
    let token = genRan();
    let result = await mongo.db('Server').collection('recovery').findOne({
        token: (token),
    })
    if (result == null)  {
        return token 
    }

}

exports.module = {tokenRecoveryGenerate};