const express = require ('express')

const messageController = require('../controllers/messageController')
const authenticateJwt = require('../middleware/authenicateJwt')



const router = express.Router()



router.use(authenticateJwt)

router.post('/send_message', messageController.sendMessage)
router.get('/get_conversations', messageController.getConversations)
router.get('/messages/:friendId', messageController.getMessagesBtwnUsers)



module.exports = router