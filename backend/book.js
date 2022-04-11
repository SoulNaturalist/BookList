const DB = require('./database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {UserSchema, BookSchema} = require('./schemes');
const {JWT_PRIVATE_TOKEN} = require('./config');
const router = require('express').Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());





router.post('/api/delete_book', function (req, res) {
    const token = req.cookies.JWT;
    const Users = DB.model('users', UserSchema);
    if (!token) {
      return res.sendStatus(403);
    }
    try {
        const UserData = jwt.verify(token, JWT_PRIVATE_TOKEN);
        const Query = { 
            __v: false,
            password: false
        };
        Users.findOne({_id: UserData['data']},Query).then((auth_data) => {
            if (req.body["book_name"]) {
                let Books = auth_data["books"];
                let BookName = req.body["book_name"];
                Reflect.deleteProperty(Books, BookName);
                Users.updateOne({_id: UserData['data']}, { $set: {books:Books}}, function(err, result) {
                    if (err) console.log(err)
                })
            }
        })
    } catch (err) {
        console.log(err);
    }
})

router.post('/api/change_book_rating', function (req, res) {
    const token = req.cookies.JWT;
    const Users = DB.model('users', UserSchema);
    if (!token) {
      return res.sendStatus(403);
    }
    try {
        const UserData = jwt.verify(token, JWT_PRIVATE_TOKEN);
        const Query = { 
            __v: false,
            password: false
        };
        Users.findOne({_id: UserData['data']},Query).then((auth_data) => {
            if (req.body["book_name"] && req.body["rating"]) {
                let Books = auth_data["books"];
                let BookName = req.body["book_name"];
                Books[BookName]["rating"] = req.body["rating"];
                Users.updateOne({_id: UserData['data']}, { $set: {books:Books}}, function(err, result) {
                    if (err) console.log(err)
                })

            }
        })
    } catch (err) {
        console.log(err);
    }
})

router.post('/api/library_add_book', function (req, res) {
    const token = req.cookies.JWT;
    const Users = DB.model('users', UserSchema);
    if (!token) {
      return res.sendStatus(403);
    }
    try {
        const UserData = jwt.verify(token, JWT_PRIVATE_TOKEN);
        const Query = { 
            __v: false,
            password: false
        };
        Users.findOne({_id: UserData['data']},Query).then((auth_data) => {
            if (auth_data["role"] === 2) {
                const Books = DB.model('books', BookSchema);
                const BookName = req.body["book_name"];
                const BookAuthor = req.body["book_author"];
                const YearOfRelease = req.body["year_of_release"];
                const BookCover = req.body["cover"];
                Books.create({book_name:BookName,book_author:BookAuthor,year_of_release:YearOfRelease,cover:BookCover}).then((response) => {
                    if (response) {
                        return res.sendStatus(200);
                    }
                });
            }
        })
    } catch (err) {
        console.log(err);
    }

})

router.get('/api/get_library_books', function (req, res) {
    const Books = DB.model('books', BookSchema);
    Books.find({}).then(function (books) {
        return res.json(books);
    });
})

router.post('/api/add_book', function (req,res) {
    const token = req.cookies.JWT;
    const Users = DB.model('users', UserSchema);
    if (!token) {
      return res.sendStatus(403);
    }
    try {
        const UserData = jwt.verify(token, JWT_PRIVATE_TOKEN);
        const Query = { 
            __v: false,
            password: false
        };
        Users.findOne({_id: UserData['data']},Query).then((auth_data) => {

            const Books = Object.assign(auth_data["books"],{
                [req.body["book_name"]]: {

                    book_author: req.body["book_author"],
                    year_of_release: req.body["year_of_release"],
                    rating:0,
                    book_status:req.body["book_status"], // readed | drop | planned
                    cover:req.body["cover"]
                }});
            Users.updateOne({_id: UserData['data']}, { $set: {books:Books}},function(err, result) {
                if (result) return res.sendStatus(201)
            });
        })
    } catch (e) {
        console.log(e);
        return res.sendStatus(403);
    }
        
})




router.post('/api/get_book_by_slug', function (req, res) {
    const slug = req.body["slug"];
    const Books = DB.model('books', BookSchema);
    const bookQuery = {__v: false,_id: false};
    try {
        if (slug) {
            Books.findOne({slug: slug},bookQuery).then((data_book) => {
                if (data_book) {
                    return res.json(data_book);
                } else {
                    return res.status(400);
                }
            })
        }
    } catch (e) {
        console.log(e)
    }
})



router.post('/api/change_cover_by_slug', function (req, res) {
    const slug = req.body["slug"];
    const newCover = req.body["cover"];
    const Books = DB.model('books', BookSchema);
    const bookQuery = {__v: false,_id: false};
    try {
        if (slug) {
            Books.updateOne({slug: slug}, { $set: {cover:newCover}}, function(err, result) {
                if (err) console.log(err)
            })
        }
    } catch (e) {
        console.log(e)
    }
})


router.post('/api/get_cover_by_name', function (req, res) {
    const book_name = req.body["book_name"];
    const Books = DB.model('books', BookSchema);
    const bookQuery = {__v: false,_id: false};
    try {
        Books.findOne({book_name: book_name},bookQuery).then((data_book) => {
            if (data_book) {
                return res.json(data_book);
            } else {
                return res.status(400);
            }
        })
    } catch (e) {
        console.log(e)
    }
})


module.exports = router;