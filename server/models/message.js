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


        const userIds = new Set()

        users.forEach(message => {
            if(message.senderId !== userId) userIds.add(message.senderId)
            if(message.recieverId !== userId) userIds.add(message.recieverId)
        })

        

    } catch (error) {

        console.log("Error getting users: ", error.message)
        
        throw new Error("Failed to get users ")
        
    }
    
}



module.exports = {

}