const express = require('express')


const authenticateJwt = require('../middleware/authenicateJwt')
const friendshipController = require('../controllers/friendshipController')



const router = express.Router()

// Authenticates each route 
router.use(authenticateJwt)

router.post('/addfriend', friendshipController.sendFriendRequest)
router.post('/acceptfriend', friendshipController.acceptFriendRequest)
router.get('/allfriends', friendshipController.getAllFriends)
// router.get()