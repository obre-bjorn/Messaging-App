const friendshipQueries = require('../db/friendship')

//! Implement to check if a request exists in the dbUtitlty and in the conroller

const sendFriendRequest = async (req,res) => {


    const userId = parseInt(req.user.id)

    const {friendId} = req.body

    friendId = parseInt(friendId)

    try {


        if(!friendId){

            return res.status(400).json({msg: "Provide friend to be added"}

            )
        }


        if(userId === friendId){

            return res.status(400).json({msg : "Cannot send request to self"})

        }


        const friend = await friendshipQueries.addFriend(userId, friendId)
    
        return res.status(201).json({msg:"Sent friend request", friend: friend})

        
    } catch (error) {
        
        console.log(error)
        return res.status(500).json({msg: "something went wrong"}) 

    }


} 


const acceptFriendRequest = async (req,res) => {

    
    const userId = parseInt(req.user.id)
    const friendId = parseInt(req.body.friendId)


    try {

        if(!friendId){

            return res.status(401).json({msg: "Provide friend id"})
        }


        if(userId === friendId){
            
            return res.status(401).json({msg: "Cannot accepts self request"})

        }



        const friend = await friendshipQueries.updateFriendshipStatus(friendId, "accepted")
        return res.status(200).json({msg: "Friendship approved", friend: friend})

        
    } catch (error) {
        
        console.log(error)
        return res.status(500).json({msg: "Something went wrong"})

    }



}


const getAllFriends = async (req,res) => {

    try {

        const userId = req.user.id

        if(!userId){

            return res.status(401).json({msg: "User Id not available"})
        }

        const friends = await friendshipQueries.getUserFriends(req.user.id)
        return res.status(201).json({msg: "Friends fetched successfully", friends: friends})

        
    } catch (error) {

        console.log(error)
        return res.status(500).json({msg: "Something went wrong"})
    }

    
} 



module.exports = {
    sendFriendRequest,
    acceptFriendRequest,
    getAllFriends
}