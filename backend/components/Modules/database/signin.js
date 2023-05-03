const mongo = require('./mongoCallBack.js')

const findNickname = require('./findNickname.js')




async function signin(body) {

    const userNotExist = await findNickname.module.findNickname(body) === false;
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
        sessions: [],
        id: await newId,
        contacts: "",
        chatList: []
      })

      console.log((await createUser).acknowledged)

    }
    return (userNotExist && (await createUser).acknowledged) ? true : false;
}

 exports.module = {signin};