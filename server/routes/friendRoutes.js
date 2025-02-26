const express = require('express')


const authenticateJwt = require('../middleware/authenicateJwt')
const friendshipController = require('../controllers/friendshipController')



const router = express.Router()


router.get('/addfriend',authenticateJwt, friendshipController.sendFriendRequest)
router.post('/updatefriend', authenticateJwt,friendshipController.acceptFriendRequest)
router.post('allfriends', authenticateJwt, friendshipController.getAllFriends)
// router.get()