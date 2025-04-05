const bcrypt = require('bcryptjs')

const userQueries = require('../services/user')
const { generateToken} = require('../utils/jwtUtils')

//! Validate forms in the router 

const userRegister = async (req,res) => {

    const {username,email,password} = req.body
    
    try {
        
        const existingUser = await userQueries.findUserByUsernameOrEmail(username)
        
        if(existingUser) {
            
            return res.status(400).json({msg: "User already exists"})
            
        }
        


        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = await userQueries.createNewUser(username, email, hashedPassword)

        //^ generate token to smoothly login user when registered

        const payload = {
            id : newUser.id,
            username: newUser.username
        }


        const token = generateToken(payload)

        return res.status(201).json({
            msg: "User created successfully",
            token : token,
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
            
            return res.status(400).json({msg: "User does not exist"})

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


const validateToken = async (req, res) => {
    // Passport already validated the token via middleware


    console.log("validaing")

    if (!req.user) {
        return res.status(401).json({
            valid: false,
            message: 'Invalid token'
        });
    }

    return res.status(201).json({
        valid: true,
        user: {
            id: req.user.id,
            email: req.user.email,
            username: req.user.username
        }
    });
};



module.exports = {
    userRegister,
    userLogin,
    validateToken
}