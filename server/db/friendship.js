const prisma = require('../utils/prismaClient')




async function addFriend(userId,friendId,status = "pending") {

    try {
        
        const friendship = await prisma.friendship.create({
            data : { 
                userId1: userId,
                userId2 : friendId,
                status: status
            }
        })
        
        return friendship

    } 
    catch (error) {
        
        console.error("Error adding friend: ", error)
        throw new Error("Error sending friend request")

    }

}




// Check if function valid
async function updateFriendshipStatus(friendId,status) {

    try {
        
        const updatedfriendship = await prisma.friendship.update({
            where: {
                id : id
            },
            data: {
                status : status
            }    
        })

        return updatedfriendship

    } 
    
    catch (error) {
        
        console.log("Error Updating friendship: ", error)
        throw new Error("Error accepting request")

    }

}



async function getUserFriends(userId) {

    try {

        const friendships = await prisma.friendship.findMany({
            where: {
                OR: [{userId1 : userId}, {userId2 : userId}]
            }
        })


        return friendships

    } 
    
    catch (error) {

        console.log(error)
        throw new Error("Error getting friends")

    }
}



const getFriendDetails = async () => {

}



const findFriendship = async (userId, friendId) => {


    try {
        
        
        const friendship = await prisma.friendship.findFirst(
            {
                where: {
                    OR:[
                        {friendId : friendId, userId: userId},
                        {userId : friendId, friendId : userId}
                    ]
                }
            }
        )
        
        return friendship

    } catch (error) {

        console.log(error)
        throw new Error('Error getting friendship')
        
    }

}



module.exports = {
    addFriend,
    updateFriendshipStatus,
    getUserFriends,
    getFriendDetails,
    findFriendship,
}