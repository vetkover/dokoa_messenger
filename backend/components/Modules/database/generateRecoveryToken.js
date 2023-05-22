const mongo = require('./mongoCallBack.js');

const tokenRecoveryGenerate = require('../generators/tokenRecoveryGenerate.js')

async function generateRecoveryToken(data) {
  try {
    const token = await tokenRecoveryGenerate.module.tokenRecoveryGenerate();
    const createRecoveryToken = mongo.db('Server').collection('recovery').insertOne({
        token:  token,
        userId: data.id,
        status: "active"
      })
    return token ;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

exports.module = { generateRecoveryToken };
