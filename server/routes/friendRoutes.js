const express = require('express')


const authenticateJwt = require('../middleware/authenicateJwt')
const friendshipController = require('../controllers/friendshipController')



const router = express.Router()

// Authenticates each route 
router.use(authenticateJwt)

router.post('/add_friend', friendshipController.sendFriendRequest)
router.post('/accept_friend', friendshipController.acceptFriendRequest)
router.get('/all_friends', friendshipController.getAllFriends)
router.get('/get_requests', friendshipController.getfriendRequests)


module.exports = router