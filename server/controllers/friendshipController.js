const AppError = require('../utils/AppError')
const friendshipQueries = require('../services/friendship')



const sendFriendRequest = async (req,res,next) => {


    const userId = parseInt(req.user.id)

    let {friendId} = req.body

    friendId = parseInt(friendId)

    try {


        if(!friendId){

            throw new AppError("Provide friend to be added",400)
            
        }


        if(userId === friendId){


            throw new AppError("Cannot send request to self",400)
            
        }
        
        
        const existingFriendship = await friendshipQueries.findFriendship(userId, friendId, "send")
        
        if(existingFriendship) {

            throw new AppError("Already friends with this user",400)

        }

        const friend = await friendshipQueries.addFriend(userId, friendId)

        return res.status(201).json({msg:"Sent friend request", friend: friend})

        
    } catch (error) {
        

        console.log(error)
        next(error)
        

    }

} 



const acceptFriendRequest = async (req,res,next) => {

    
    const userId = parseInt(req.user.id)
    const friendId = parseInt(req.body.friendId)


    try {

        if(!friendId){

            throw new AppError("Provide friend id", 400)
            

        }


        if(userId === friendId){
            
            throw new AppError("Cannot accept self request",400)
        
        }


        //Check friendship 
        const friendship = await friendshipQueries.findFriendship(userId,friendId,"accept")

        if(!friendship || friendship.status !== "pending"){

            throw new AppError ("Friendship does not exist", 400)

        }


        const friend = await friendshipQueries.updateFriendshipStatus(friendship.id, "accepted")
        return res.status(200).json({msg: "Friendship approved", friend: friend})

        
    } catch (error) {
        
        console.log(error)
        next(error)

    }

}



const getAllFriends = async (req,res,next) => {


    try {

        const userId = parseInt(req.user.id)

        if(!userId){
            

            throw new AppError("User Id not available",400)

        }

        const friends = await friendshipQueries.getUserFriends(req.user.id)
        return res.status(200).json({msg: "Friends fetched successfully", friends: friends})

        
    } catch (error) {

        console.log(error)
        next(error)
        

    }


    
} 






const getfriendRequests = async (req,res,next) => {

    try {
        
        const userId = parseInt(req.user.id)
        
        if(!userId){

            throw new AppError("Provide user ID", 400)

        }
        
        const requests = await friendshipQueries.getPendingRequests(userId)

        return res.status(200).json({msg: "Friend requests fetched succesfully", requests: requests})


    } catch (error) {
        
        next(error)

    }

}


module.exports = {
    sendFriendRequest,
    acceptFriendRequest,
    getAllFriends,
    getfriendRequests
}