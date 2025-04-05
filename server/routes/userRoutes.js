const express = require('express')
const userController = require('../controllers/userController')
const authenticateJwt = require('../middleware/authenicateJwt')


const router = express.Router()


router.post('/register',userController.userRegister)
router.post('/login',userController.userLogin)
router.get('/validate',authenticateJwt,userController.validateToken)



module.exports = router