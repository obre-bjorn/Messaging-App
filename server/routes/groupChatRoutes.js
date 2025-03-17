const express = require('express')

const groupChatControllers = require('../controllers/groupchatController')



const router = express.Router()

router.get('/my_groups',groupChatControllers.getGroupChats)
router.get('/group_messages',groupChatControllers.getGroupMessages)
router.post('/create_group',groupChatControllers.createGroupChat)
router.post('/add_member',groupChatControllers.addGroupMember)
router.delete('/remove_member',groupChatControllers.removeGroupMember)




module.exports = router