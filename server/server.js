const express = require('express')
const cors = require('cors')

const initializePassport = require('./config/auth')


const userRouter = require('./routes/userRoutes')
const friendshipRouter = require('./routes/friendRoutes')
const messageRouter  = require('./routes/messageRoutes')
const groupChatRouter = require('./routes/groupChatRoutes')


const AppError = require('./utils/AppError')


const app = express()


initializePassport()

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

app.use(express.urlencoded({extended:false}))
app.use(express.json())


//Routes
app.use('/',userRouter)
app.use('/',friendshipRouter)
app.use('/',messageRouter)
app.use('/',groupChatRouter)




app.get('/',(req,res)=> {
    return res.status(200).json({msg: "Server running successfully"})
})


app.use((err,req,res,next) => {
    console.error(err);


    if(err instanceof AppError){

        return res.status(err.statusCode).json({
            status : err.status,
            message : err.message
        })

    }

    res.status(500).json({ 
        status: 'error',
        msg: "Something went wrong" });
}) 



app.listen(5000,() => console.log("Server running on port 5000")) 