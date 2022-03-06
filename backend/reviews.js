const DB = require('./database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {UserSchema, BookSchema} = require('./schemes');
const {JWT_PRIVATE_TOKEN} = require('./config');
const router = require('express').Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());



router.post('/api/add_review', function (req, res) {
    const token = req.cookies.JWT;
    if (!token) {
        return res.sendStatus(403);
    }
    const titleReview = req.body["title"];
    const descriptionReview = req.body["description"];
    const bookSlug = req.body["bookSlug"];
    const userRating = req.body["rating"];
    if (titleReview && descriptionReview && bookSlug && userRating) {
        const data = jwt.verify(token, JWT_PRIVATE_TOKEN);
        try {
            const Users = DB.model('users', UserSchema);
            const Books = DB.model('books', BookSchema);
            Users.findOne({_id: data['data']}).then((auth_data) => {
                if (auth_data) {
                    Books.find({slug:bookSlug}).then(function (book) {
                        if (book) {
                            const updateReviews = Object.assign(book[0]["reviews"]
                            ,{[auth_data.username]:{"title":titleReview,"description":descriptionReview,"rating":userRating}});
                            Books.updateOne({slug: bookSlug}, { $set: {reviews:updateReviews}}, function(err, result) {
                                if (result) {
                                    return res.sendStatus(200);
                                }
                            })
                        } else {
                            return res.status(404).json({"response":"The book was not found"});
                        }
                    });
                } else {
                    return res.status(400);
                }
            })
        } catch (e) {
            console.log(e);
            return res.sendStatus(403);
        }
    }
})

module.exports = router;