const passport = require('passport')
const {ExtractJwt, Strategy} = require('passport-jwt')
const userQueries = require('../services/user')

require('dotenv').config()


const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY
}


function initializePassport(){

    passport.use(
        new Strategy(opts, async (jwt_payload,done) => {


            try {

                const user = await userQueries.findUserById(jwt_payload.id)

                if(user) {

                    return done(null, user)
                    
                }else{

                    return done(null,false)

                }

                
            } catch (error) {
                
                console.error('Error in JWT strategy:', error);    
                return done(error, false);

            }

        })
    )


}



module.exports = initializePassport