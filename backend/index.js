const express = require('express')
const midleware = require('./midleware')
const PORT = process.env.PORT || 3001

 const app = express()
 const login = require('./routes/auth/login.js')
 const whoami = require('./routes/auth/whoami.js')
 const chatList = require('./routes/message/chatList.js')
 const messages = require('./routes/message/messages.js')
 const sendMessage = require('./routes/message/sendMessage.js')

 
 
app.use(express.json());
app.use('/api/auth/',  login)

app.use(midleware)
app.use('/api/message/', chatList)
app.use('/api/message/', messages)
app.use('/api/auth/', whoami)
app.use('/api/message/', sendMessage)


 app.listen(PORT, () =>{
    console.log(`server is stared on port ${PORT}`)
 })

