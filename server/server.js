const express = require('express')
const initializePassport = require('./config/auth')


const userRouter = require('./routes/userRoutes')


const app = express()

initializePassport()

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/',userRouter)
app.get('/',(req,res)=> {
    return res.status(200).json({msg: "Server running successfully"})
})


app.listen(5000,() => console.log("Server running on port 5000")) 