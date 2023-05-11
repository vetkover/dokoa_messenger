const mongo = require('./mongoCallBack.js')

const findNickname = require('./findNickname.js')
const trustKeyGenerate = require('../generators/trustKeyGenerate.js')

async function signin(body) {

    const userNotExist = await findNickname.module.findNickname(body) === false;
    const trustKey = await trustKeyGenerate.module.trustKeyGenerate(body.nickname)
    console.log("result of trustkey " + trustKey)
    console.log( await userNotExist)
    if(userNotExist){
    const newId = mongo.db('Server').collection('users').aggregate([
        { $group: { _id: null, maxId: { $max: "$id" } } }
      ])
      .toArray()
      .then(result => {
        const maxId = result[0].maxId;
        return (maxId + 1) 
      })
    

      const createUser = mongo.db('Server').collection('users').insertOne({
        username: body.nickname,
        password: body.password,
        trustKey: trustKey,
        sessions: [],
        id: await newId,
        contacts: "",
        chatList: []
      })

      console.log((await createUser).acknowledged)
      return (userNotExist && (await createUser).acknowledged) ? {status: true, trustKey: trustKey} : {status: false};
    }
    
}

 exports.module = {signin};