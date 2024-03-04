const router = require('express').Router()
const cookieParser = require('cookie-parser')
router.use(cookieParser())
const authorController = require('../controllers/author')
const authMiddleware = require('../middleware/auth')

router.post('/api/get_author_by_name', authorController.getAuthorByName)

router.post('/api/get_author_books', authorController.getBooksByAuthorName)

router.use(authMiddleware)

router.post('/api/add_new_author', authorController.addNewAuthor)

module.exports = router
