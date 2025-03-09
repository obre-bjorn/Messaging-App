const prisma = require('../utils/prismaClient')



async function sendMessage(senderId,recieverId,content, groupId=null) {




    try {

        const message = await prisma.message.create({
            data: {
                senderId : senderId,
                recieverId: recieverId,
                content: content,
                groupId : groupId
            }
        })

        return message

        
    } catch (error) {

        console.log("Error sending message: ", error.message)
        throw new Error("Failed to send message")

    }

}



// Conversation service 
async function getUsersWithConversation(userId) {


    try {
        
        const users = await prisma.message.findMany({
            where: {
                OR: [
                    {senderId:userId},
                    {recieverId:userId}
                ]
            },
            select: {
                senderId :true,
                recieverId: true
            }
        })


        const userIds= new Set()

        

        users.forEach(message => {
            if(message.senderId !== userId) userIds.add(message.senderId)
            if(message.recieverId !== userId) userIds.add(message.recieverId)
        })



        const conversations = await prisma.message.findMany({
            where: {
                OR : Array.from(userIds).map((otherUserId) => ({
                    AND : [
                        {
                            OR : [{senderId : userId}, {recieverId: userId}],
                        },
                        {
                            OR : [{senderId : otherUserId} , {recieverId : otherUserId}]
                        }
                    ]
                }))
            },
            orderBy : {
                createdAt : "desc"
            },
            select : {
                id:true,
                content : true,
                createdAt : true,
                senderId: true,
                recieverId: true,
                isRead: true,
                sender : {
                    select: {
                        id: true,
                        username: true,
                        profile_picture: true
                    },
                },
                reciever: {
                    select: {
                        id:true,
                        username:true,
                        profile_picture: true
                    }
                }
            }
        })



        const conversationMap = new Map();


        conversations.forEach((message) => {

            const otherUserId = message.senderId === userId ? message.recieverId : message.senderId


            if(!conversationMap.has(otherUserId)){

                conversationMap.set(otherUserId, {
                    user:message.senderId === userId ? message.reciever : message.sender,
                    lastMessage: message
                })

            } else {

                const existingMessage = conversationMap.get(otherUserId).lastMessage

                if(new Date(message.createdAt) > new Date(existingMessage.createdAt)){

                    conversationMap.set(otherUserId, {
                        user: message.senderId === userId ? message.reciever : message.sender,
                        lastMessage: message,
                    })


                }



            }


        })


        const usersWithDetails = Array.from(conversationMap.values())


        return usersWithDetails


    } catch (error) {

        console.log("Error getting users: ", error.message)
        
        throw new Error("Failed to get users ")
        
    }
    
}

async function getUserMessages(userId, friendId){


    try {
        
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    {senderId: userId, recieverId: friendId },
                    {senderId: friendId, recieverId: userId}
                ]
            },
            orderBy : {
                createdAt: 'asc'
            }

        })



        return messages


    } catch (error) {


        console.log(error)
        throw new Error("Failed to fetch messages")
        
    }


}


module.exports = {
    sendMessage,
    getUsersWithConversation,
    getUserMessages
}