const prisma = require('../utils/prismaClient')


async function addFriend(userId1,userId2,status = "pending") {


    try {
        
        const friendship = await prisma.friendship.create({
            data : { 
                userId11: userId1,
                userId2 : userId2,
                status: status
            }
        })
        
        return friendship

    } 
    catch (error) {
        
        console.error("Error adding friend: ", error)
        return error

    }

}

async function updateFriendshipStatus(id,status) {

    try {
        
        const updatedfriendship = await prisma.friendship.update({
            where: {
                id : id
            },
            data: {
                status : status
            }    
        })

    } 
    
    catch (error) {
        console.log("Error Updating friendship: ", error)
        return error
    }

}

async function getUserFriendships(userId) {

    try {

        const friendships = await prisma.friendship.findMany({
            where: {
                OR: [{userId1 : userId}, {userId2 : userId}]
            }
        })


        return friendships

    } 
    
    catch (error) {
        console.log("Error getting friendships: ", error)
        return error
    }
}



module.exports = {
    addFriend,
    updateFriendshipStatus,
    getUserFriendships
}