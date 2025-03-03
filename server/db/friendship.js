const prisma = require('../utils/prismaClient')




async function addFriend(userId,friendId,status = "pending") {

    try {
        
        const friendship = await prisma.friendship.create({
            data : { 
                userId: userId,
                friendId : friendId,
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
async function updateFriendshipStatus(friendshipId,status) {

    try {
        
        const updatedfriendship = await prisma.friendship.update({
            where: {
                id : friendshipId   
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
                OR: [
                    {userId : userId}, 
                    { friendId: userId}
                ],
                status : "accepted"
            }
        })


        return friendships

    } 
    
    catch (error) {

        console.log(error)
        throw new Error("Error getting friends")

    }
}


const getPendingRequests = async (userId) => {



    try {
        
        const friendRequests = await prisma.friendship.findMany({

            where : {
                friendId : userId,
                status: "pending"
            },
            include: {
                user : {
                    select : {
                        id: true,
                        username : true,
                        profile_picture: true,
                        bio: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
            
        }) 

        return friendRequests
        

    } catch (error) {

        console.error(error)
        throw new Error("Error getting requests");
        
        
    }

    



}


const getFriendDetails = async (friendId) => {




}



const findFriendship = async (userId, friendId, type) => {


    try {
        
        let whereClause



        if(type === "send"){



            whereClause = { 
                OR : [
                    {friendId : friendId, userId: userId},
                    {userId : friendId, friendId : userId}
            ]}

        }

        if(type === "accept"){

            whereClause = {
                userId: friendId,
                friendId: userId, 
                status: "pending", 
            };



        }
        
        const friendship = await prisma.friendship.findFirst(
            {
                where: whereClause
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
    getPendingRequests,
    getFriendDetails,
    findFriendship,
}