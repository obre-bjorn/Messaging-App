const prisma = require('../utils/prismaClient')

async function createGroupChat(groupName,createdBy) {

    try {

        const groupChat = await prisma.groupChat.create({
            data: {
                name: groupName,
                createdBy: createdBy

            }
        })

        return groupChat

    } 
    
    catch (error) {
        console.log("Error creating group: ", error)
        return error
    }
    
}



async function addMemberToGroup(groupId, userId,role="member"){
    
    try {

        const member = await prisma.gropChatMember.create({
            data : {
                id: groupId,
                role: role,
                userId: userId
            }
        })
        
        return member

    } catch (error) {
        
        console.log("Failed to add member",error)
        return error
    }

}

async function removeGroupMember(groupId,userId) {
    
    
}


async function getGroupMessages(groupId){

    try {

        const messages = await prisma.groupChat.findUnique({
            where :{
                id : groupId
            },
            include: {
                messages: true
            }
        })

        return messages
        
    } catch (error) {
        
        console.log("Failed to get group messages: ", error)
        throw new Error("Failed to get group messsages");
        

    }

}

async function deleteGroupChat (groupId) {

    const deletedGroup  = await prisma.groupChat.delete({
        where: {
            id : groupId
        }
    })

    return deletedGroup

} 

module.exports ={}