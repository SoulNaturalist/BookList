const router = require('express').Router()
const cookieParser = require('cookie-parser')
const bookController = require('../controllers/book')
const authMiddleware = require('../middleware/auth')

router.use(cookieParser())

router.get('/api/get_library_books', bookController.get_library_books)

router.post('/api/get_book_by_slug', bookController.get_book_by_slug)

router.post('/api/get_cover_by_name', bookController.get_cover_by_name)

router.post('/api/search_books', bookController.search_books)

router.use(authMiddleware)

router.delete('/api/delete_book', bookController.delete_book)

router.put('/api/change_book_rating', bookController.change_book_rating)

router.post('/api/library_add_book', bookController.library_add_book)

router.post('/api/add_book', bookController.add_book)

router.post('/api/change_cover_by_slug', bookController.change_cover_by_slug)

module.exports = router
