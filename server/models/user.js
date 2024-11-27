const prisma = require('../utils/prismaClient')



async function createNewUser (username,email,password,) {

    try {

        const user = await prisma.user.create({
            data: {
                username : username,
                password : password,
                email: email
            }
        })


        return user
        
    } catch (error) {
        
        console.log("Error creating user: ", error)

        return error    
    }

}


async function findUserByUsername(username) {

    try {
        
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })


        return user

    } catch (error) {
        console.log("Error finding user: ", error)
        return error
    }


}


async function updateUser(id,bio =null, pfp_url= null){

    try {
        
        const updatedUser = await prisma.user.update({
            where:{
                id : id
            },
            data: {
                bio : bio,
                profile_picture: pfp_url

            }
        })

        return updatedUser


    } catch (error) {
        
        console.log("Error updating user: ", error)
        return error

    }

}



module.exports = { 
    createNewUser,
    findUserByUsername,
    updateUser
}