const { MongoClient } = require("mongodb");
 const uri = "mongodb://Server:DOKOASHI@127.0.0.1:27017/?authMechanism=DEFAULT";
 const mongo = new MongoClient(uri, { useUnifiedTopology: true });
 
 async function run() {
     await mongo.connect();
     await mongo.db("Server").command({ ping: 1 });
     console.log("Connected successfully to mongodb");
 }
 run().catch(console.dir);

 module.exports = mongo;