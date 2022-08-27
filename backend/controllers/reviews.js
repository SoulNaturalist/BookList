const DB = require('../database');
const jwt = require('jsonwebtoken');
const {UserSchema, BookSchema} = require('../schemes');
const {JWT_PRIVATE_TOKEN} = require('../config');
const router = require('express').Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());


const add_review = (async function (req, res) {
    const token = req.cookies.JWT;
    if (!token) {
        return res.sendStatus(403);
    }
    const titleReview = req.body["title"];
    const descriptionReview = req.body["description"];
    const bookSlug = req.body["bookSlug"];
    const userRating = req.body["rating"];
    if (titleReview && descriptionReview && bookSlug && userRating) {
        try {
            const data = jwt.verify(token, JWT_PRIVATE_TOKEN);
            const users = DB.model('users', UserSchema);
            const books = DB.model('books', BookSchema);
            const dataUser = await users.findOne({_id: data['data']}).exec();
            const bookValidation = await books.findOne({slug:bookSlug}).exec();
            if (dataUser && bookValidation) {
                const bookData = await books.find({slug:bookSlug}).exec();
                const updateReviews = Object.assign(bookData[0]["reviews"],{[dataUser.username]:{"title":titleReview,"description":descriptionReview,"rating":userRating}});
                const addedReviwBook = await books.updateOne({slug: bookSlug}, { $set: {reviews:updateReviews}}).exec();
                const updateUserReviews = Object.assign(dataUser["reviews"],{[bookData[0].book_name]:{"title":titleReview,"description":descriptionReview,"rating":userRating}})
                const addedReviwUser = await users.updateOne({username:dataUser['username']}, { $set: {reviews:updateUserReviews}}).exec();
                return addedReviwBook.modifiedCount && addedReviwUser.modifiedCount ? res.sendStatus(201):res.sendStatus(304);
            } else {
                return res.sendStatus(400);
            }
        } catch (e) {
            console.log(e);
            return res.sendStatus(403);
        }
    }

})

const get_reviews = (async function (req, res) {
    const token = req.cookies.JWT;
    const typeReview = req.body["type"];
    const usernameAuthor = req.body["username"];
    const bookSlugReview = req.body["book_slug"];
    if (!token) {
        return res.json({message: "Для этого метода нужна авторизация", codeStatus:403});
    }
    if (typeReview) {
        try {
            const data = jwt.verify(token, JWT_PRIVATE_TOKEN);
            const users = DB.model('users', UserSchema);
            const dataUser = await users.findOne({_id: data['data']}).exec();
            if (typeReview === "user" && usernameAuthor) {
                const dataCurrentUser = await users.findOne({username: usernameAuthor}).exec();
                if (Object.keys(dataCurrentUser["reviews"]).length) {
                    return res.json(dataCurrentUser["reviews"])
                } else {
                    return res.json({message: "По вашему запросу ничего не найдено", codeStatus:404});
                }
            } else if (typeReview === "book" && bookSlugReview) {
                const books = DB.model('books', BookSchema);
                const dataReviewsBook = await books.findOne({slug: bookSlugReview}).exec();
                return Object.keys(dataReviewsBook["reviews"]).length ? res.json(dataReviewsBook["reviews"]):res.json({message:"У книг нет отзывов!Будьте первым :)", codeStatus: 404});
            }
        } catch (e) {
            console.log(e);
            return res.json({message: "Для этого метода нужна авторизация", codeStatus:403});
        }
    }
})

module.exports = {
    add_review,
    get_reviews
};