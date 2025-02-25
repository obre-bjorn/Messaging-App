const jwt = require('jsonwebtoken')
require('dotenv').config()




const generateToken = (payload, expires = '1hr') => {

    return jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn : expires})

}




module.exports = {

    generateToken,
    

}