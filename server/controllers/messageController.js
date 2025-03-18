const AppError = require('../utils/AppError')

const friendshipQueries = require('../services/friendship')
const messageQueries = require('../services/message')
const groupChatQueries = require('../services/groupChat')






const sendMessage = async (req,res,next) => {


    let {friendId, content, groupId} = req.body
    const userId = parseInt(req.user.id)


    try {

        if(friendId && groupId){

            throw new AppError("Cannot send to both group and freind", 400)

        }

        if(!friendId && !groupId){

            throw new AppError("Provide either friend or group ID", 400)

        }
        

        if(!content){


            throw new AppError("Provide content to be sent", 400)
        }


        let message 


        if(friendId){

            friendId = parseInt(friendId)

            const friendship = await friendshipQueries.findFriendship(userId, friendId)


            if(!friendship){

                throw new AppError("You are not friends with this user", 403)
            }


            message = await messageQueries.sendMessage(userId,friendId,content)

            return res.status(201).json({success: true,msg: "Message sent succesfully", message : message})


        }else if(groupId){
            
            groupId = parseInt(groupId)


            //TODO Implement after implementing group chat

            const isMember = await groupChatQueries.findGroupMember(userId,groupId)

            if(!isMember){

                throw new AppError("You are not a member of this group",401)

            }



            message = await messageQueries.sendMessage(userId,null,content,groupId)

            return res.status(200).json({
                success:true,
                msg: "Message sent succesfully to group",
                message : message
            })

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

        console.log("Friend ID: ",friendId)


        if(!userId || !friendId){


            throw new AppError("Provide both user and friend ids", 400)

        }


        const friendship = await friendshipQueries.findFriendship(userId,friendId)


        console.log(friendship)
        if(!friendship){


            throw new AppError("User not found", 404)


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


