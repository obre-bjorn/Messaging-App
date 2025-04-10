const prisma = require('../utils/prismaClient')


async function findGroupMember(userId, groupId) {


    try {
        
        const member = await prisma.groupChatMember.findUnique({
            where:{
                groupId_userId: {
                    groupId : groupId,
                    userId: userId
                }
            }
        })

        return member



    } catch (error) {
        
        console.log(error)
        throw new Error("Cannot find group member")

    }
}


async function createGroupChat(groupName,createdBy) {

    try {

        const groupChat = await prisma.groupChat.create({
            data: {
                name: groupName,
                createdBy: createdBy,

                members : {
                    create: {
                        userId: createdBy,
                        role: "admin"
                    }
                }

            },
            include : {
                members: true,
                messages: true,
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

        const member = await prisma.groupChatMember.create({
            data : {
                groupId: groupId,
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

async function removeGroupMember(groupId,memberId) {
    
    try {

        const removedMember = await prisma.groupChatMember.delete({
            where : {
                    groupId_userId: {
                    groupId: groupId,
                    userId:memberId
                }
            }
        })

        return removedMember
        
    } catch (error) {

        console.log("Error removing user," + userId, error)
        
    }
    
}


async function getGroupChats(userId) {


    try {
        
        const groups = await prisma.groupChatMember.findMany({
            where : {
                userId : userId
            },
            include : {
                group :{
                    include: {
                        messages:{
                            orderBy: {
                                createdAt: "desc"
                            },
                            include: {
                                sender: {
                                    select: {
                                        id: true,
                                        username: true
                                    }
                                }
                            },
                            take: 1
                        },
                        
                    }

                }
            }
        })

        

        const sortedGroups = groups.sort((a,b) => {

            if(a.group.messages[0] && b.group.messages[0]){

                const aLatestMessage = a.group.messages[0].createdAt || new Date(0) 
                const bLatestMessage = b.group.messages[0].createdAt || new Date(0)

                return bLatestMessage - aLatestMessage
            }
            
            return a - b
        })

        return sortedGroups

    } catch (error) {
        
        console.log(error)
        throw new Error("Failed to get groups")
    }


} 


async function getGroupMessages(groupId){

    try {

        const messages = await prisma.groupChat.findUnique({
            where :{
                id : groupId
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt : "asc"
                    }
                }
            }
        })

        return messages
        
    } catch (error) {
        
        console.log("Failed to get group messages: ", error)
        throw new Error("Failed to get group messsages");
        

    }

}

async function deleteGroupChat (groupId,userId) {

    

    const deletedGroup  = await prisma.groupChat.delete({
        where: {
            id : groupId
        }
    })

    return deletedGroup

} 

module.exports ={
    findGroupMember,
    addMemberToGroup,
    createGroupChat,
    deleteGroupChat,
    removeGroupMember,
    getGroupMessages,
    getGroupChats
}