const express = require ('express')

const messageController = require('../controllers/messageController')



const router = express.Router()



router.post('/send_message', messageController.sendMessage)
router.get('/get_conversations', messageController.getConversations)



module.exports = router