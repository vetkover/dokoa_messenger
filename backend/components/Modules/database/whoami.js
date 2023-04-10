const mongo = require('../database/mongoCallBack.js')


function getCookieByName(cookieStr, name) {
    const cookies = cookieStr.split('; ');
    const cookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));
    if (!cookie) {
      return null;
    }
    const value = cookie.split('=')[1];
    return decodeURIComponent(value);
  }

async function whoami(cookie) {
    let result = await mongo.db('Server').collection('users').findOne({
         "sessions.token": getCookieByName(cookie, "token"),
     });
     return result
 }

exports.module = {whoami};