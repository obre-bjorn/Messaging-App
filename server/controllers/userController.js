const bcrypt = require('bcryptjs')

const userQueries = require('../db/user')
const { generateToken} = require('../utils/jwtUtils')

//! Validate forms in the router 

const userRegister = async (req,res) => {

    
    try {
        
        const existingUser = await userQueries.findUserByUsernameOrEmail('username')
        
        if(existingUser) {
            
            return res.status(400).json({msg: "User already exists"})
            
        }
        
        const {username,email,password} = req.body


        const hashedPassword = bcrypt.hash(password,10)

        const newUser = await userQueries.createNewUser(username, email, hashedPassword)

        //^ generate token to smoothly login user when registered

        return res.status(201).json({
            msg: "User created successfully",
            user: {
                id: newUser.id,
                username : newUser.username,
                email: newUser.email
            }
        })

    } catch (error) {

        console.log(error)
        
        return res.status(500).json({
            msg: "Something went wrong"
        })
    }



}

const userLogin = async (req,res) => {

    try {
        
        const {username, password} = req.body 


        const userExists = await userQueries.findUserByUsernameOrEmail(username)
        
        
        if(!userExists){
            
            return res.status(401).json({msg: "User does not exist"})

        }

        const passwordMatch = await bcrypt.compare(password, userExists.password)


        if(!passwordMatch){

            return res.status(400).json({msg: "Invalid credentials"})

        }

        const payload = {id: userExists.id, username: userExists.username}

        const token = generateToken(payload)


        return res.status(200).json({
            msg: "Login successful",
            user: { 
                id : userExists.id,
                username: userExists.username,
                email: userExists.email
            },
            token : `Bearer ${token}`
            
        })


    } catch (error) {

        console.log("Error during login: ",error)
        return res.status(500).json({msg: "Something went wrong"})

    }



}



module.exports = {
    userRegister,
    userLogin
}