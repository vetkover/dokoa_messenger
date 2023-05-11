const mongo = require('../database/mongoCallBack.js')


var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var passwordLength = 256;
var password = "";

function genRan(){
    for (var i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber +1);
       }
       return password;
}


async function trustKeyGenerate(nickname){
    password = "";
    const trustKey = genRan();

        const query = { username: `${nickname}` };
        const update = { "$push": { "trustKey": trustKey } }
        await mongo.db('Server').collection('users').updateOne(query, update);
        return trustKey 
}

exports.module = {trustKeyGenerate};