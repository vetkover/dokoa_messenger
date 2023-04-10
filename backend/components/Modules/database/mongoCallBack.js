const { MongoClient } = require("mongodb");
 const uri = "secret";
 const mongo = new MongoClient(uri, { useUnifiedTopology: true });
 
 async function run() {
     await mongo.connect();
     await mongo.db("Server").command({ ping: 1 });
     console.log("Connected successfully to mongodb");
 }
 run().catch(console.dir);

 module.exports = mongo;