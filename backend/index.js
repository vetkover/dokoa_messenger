const express = require('express')
const midleware = require('./midleware')
const PORT = process.env.PORT || 3001

 const app = express()
 const login = require('./routes/auth/login.js')
 const signin = require('./routes/auth/signin.js')
 const whoami = require('./routes/auth/whoami.js')
 const chatList = require('./routes/message/chatList.js')
 const messages = require('./routes/message/messages.js')
 const sendMessage = require('./routes/message/sendMessage.js')
 const nicknameisAvailable = require('./routes/users/nicknameisAvailable.js')
 const recoveryByTrustkey = require('./routes/auth/recoveryByTrustkey.js') 
 
 
app.use(express.json());
app.use('/api/auth/',  login)
app.use('/api/auth/',  signin)
app.use('/api/users/', nicknameisAvailable)
app.use('/api/auth/',  recoveryByTrustkey)


app.use(midleware)
app.use('/api/auth/', whoami)
app.use('/api/message/', chatList)
app.use('/api/message/', messages)
app.use('/api/message/', sendMessage)



 app.listen(PORT, () =>{
    console.log(`server is started on port ${PORT}`)
 })

