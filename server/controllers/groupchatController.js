const AppError = require('../utils/AppError')

const groupChatQueries = require('../services/groupChat')
const userQueries = require('../services/user')



const createGroupChat = async (req,res,next) => { 


    try {


        const userId = parseInt(req.user.id)

        let {groupName} = req.body


        const userValid = await userQueries.findUserById(userId)


        if(!userValid){

            throw new AppError("This user does not exist", 403)

        }


        
        const groupChat = await groupChatQueries.createGroupChat(groupName,userId)
        
        return res.status(200).json({msg: "Group created succesfully", group: groupChat})

    } catch (error) {
        
        console.log(error)
        next(error)

    }

}


const addGroupMember =  async (req,res, next ) => {

    try {
        

        const userId = parseInt(req.user.id)

        const memberId = parseInt(req.body.memberId)
        const groupId = parseInt(req.body.groupId)


        const user = await groupChatQueries.findGroupMember(userId,groupId)


        if(!user){

                throw new AppError("User not a member of the group", 403)
        }

        if(user.role != "admin") {

            throw new AppError("User is not an admin", 404)

        }  
        
        
        const userToBeAdded = await userQueries.findUserById(memberId)

        if(!userToBeAdded){
            
            throw new AppError("User to be added does not exist", 404)

        }

        const userAlreadyAdded = await groupChatQueries.findGroupMember(memberId,groupId)

        if(userAlreadyAdded){

            throw new AppError("User is already in the group", 409)

        }


        const addedMember = await groupChatQueries.addMemberToGroup(groupId,memberId)


        return res.json(200).json({
            msg:"Member added successfully",
            data : addedMember

        })


    } catch (error) {
        

        console.error(error)
        next(error)

    }


}



const removeGroupMember = async (req,res,next) => {

    try {
        
        const userId = parseInt(req.user.id)


        const memberId = parseInt(req.body.memberId)
        const groupId = parseInt(req.body.groupId)

        const user = await groupChatQueries.findGroupMember(userId,groupId)


        if(!user){

                throw new AppError("User not a member of the group", 403)
        }

        if(user.role != "admin") {

            throw new AppError("User is not an admin", 404)

        }  
        

        const userToBeRemoved = await groupChatQueries.findGroupMember(memberId,groupId)

        if(!userToBeRemoved){

            throw new AppError("The user is not a member of this group", 404)

        }




        const removedUser = await groupChatQueries.removeGroupMember(groupId,memberId)

        return res.status(200).json({
            success: true,
            msg: "Member successfully removed",
            data: removedUser
        })

    } catch (error) {

        console.error(error)
        next(error)

    }



} 



const getGroupMessages = async (req,res,next) => {





}


module.exports = {
    createGroupChat,
    addGroupMember,
    removeGroupMember
}