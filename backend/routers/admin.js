const router = require('express').Router()
const cookieParser = require('cookie-parser')
router.use(cookieParser())
const userController = require('../controllers/admin')
const authMiddleware = require('../middleware/auth')

router.use(authMiddleware)

router.get('/api/get_users', userController.get_users)

router.delete('/api/delete_user', userController.delete_user)

module.exports = router
