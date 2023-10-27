const router = require('express').Router()
const cookieParser = require('cookie-parser')
router.use(cookieParser())
const reviewsController = require('../controllers/reviews')
const authMiddleware = require('../middleware/auth')

router.get('/api/get_reviews', reviewsController.get_reviews)

router.use(authMiddleware)

router.post('/api/add_review', reviewsController.add_review)

module.exports = router
