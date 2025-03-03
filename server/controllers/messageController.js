const AppError = require('../utils/AppError')
const friendshipQueries = require('../db/friendship')
const messageQueries = require('../db/message')






const sendMessage = async (req,res,next) => {

//TODO -Classify between personal messages and Group Messages

    let {friendId, content, groupId} = req.body
    const userId = parseInt(req.user.id)


    try {

        if(friendId && groupId){

            throw AppError("Cannot send to both group and freind", 400)

        }

        if(!friendId && !groupId){

            throw AppError("Provide either friend or group ID", 400)

        }
        

        if(!content){


            throw AppError("Provide content to be sent", 400)
        }


        let message 


        if(friendId){

            friendId = parseInt(friendId)

            const friendship = await friendshipQueries.findFriendship(userId, friendId)


            if(!friendship){

                throw AppError("You are not friends with this user", 403)
            }


            message = await messageQueries.sendMessage(userId,friendId,content)

            return res.status(201).json({msg: "Message sent succesfully", message : message})


        }else if(groupId){
            
            groupId = parseInt(groupId)


            //TODO Implement after implementing group chat



        }


        



    } catch (error) {
        
        console.log(error)
        next(error)

    }


}



const getConversations = async (req,res,next) => {


    const userId = parseInt(req.user.id)



    try {

        if(!userId){


            throw new AppError("Provide user Id", 400)
        }
        
        
        const conversations = await messageQueries.getUsersWithConversation(userId)

        return res.status(201).json({msg: "Chats fetched succesfully", chats : conversations})


    } catch (error) {
        
        console.log(error)
        next(error)
    }

}


const getMessagesBtwnUsers = async (req,res,next) => {


    try {
        
        const userId = parseInt(req.user.id)
        const friendId = parseInt(req.params.friendId)


        if(!userId || !friendId){


            throw new AppError("Provide both user and friend ids", 400)

        }


        const messages = await messageQueries.getUserMessages(userId,friendId)

        return res.status(200).json({
            msg: "Messages fetched successfully",
            messages : messages
        })


    } catch (error) {
        
        console.log(error)
        next(error)


    }


}



module.exports = { 
    sendMessage,
    getConversations,
    getMessagesBtwnUsers
}


