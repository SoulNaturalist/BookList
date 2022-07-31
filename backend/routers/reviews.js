const router = require('express').Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const reviewsController = require('../controllers/reviews');


router.post('/api/add_review',reviewsController.add_review)


router.get('/api/get_reviews',reviewsController.get_reviews)


module.exports = router;