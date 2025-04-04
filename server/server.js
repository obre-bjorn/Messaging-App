const express = require('express')
const initializePassport = require('./config/auth')


const userRouter = require('./routes/userRoutes')
const friendshipRouter = require('./routes/friendRoutes')
const messageRouter  = require('./routes/messageRoutes')
const groupChatRouter = require('./routes/groupChatRoutes')


const AppError = require('./utils/AppError')


const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // or specify domains like 'https://yourdomain.com'
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

initializePassport()

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