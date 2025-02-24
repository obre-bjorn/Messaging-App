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


async function findUserByUsernameOrEmail(userIdentifer) {

    try {
        
        const user = await prisma.user.findUnique({
            where: {

                OR : [
                    {username: userIdentifer},
                    {email: userIdentifer}

                ]
            }

        })


        return user

    } catch (error) {
        console.log("Error finding user: ", error)
        return error
    }


}


async function findUserById(userId) {

    try {
        
        const user = await prisma.user.findUnique({
            where: {
                id: userId
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
    findUserByUsernameOrEmail,
    findUserById,
    updateUser
}