const DB = require('./database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {UserSchema, BookSchema} = require('./schemes');
const {JWT_PRIVATE_TOKEN} = require('./config');
const router = require('express').Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());


router.get('/api/user/:name', function (req, res) {
    const UserName = req.params.name;
    const Users = DB.model('users', UserSchema);
    const Query = { 
        password: false,
        __v: false,
        _id: false
    };
    Users.findOne({name: String(UserName)},Query).then((result) => {
        res.json({"response":result});
    })
});

router.post('/api/register', function (req, res) {
    const Username = req.body["username"];
    const Password = req.body["password"];
    if (Username && Password) {
        function UsernameValidate(str){
            return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
        } 
        if (!UsernameValidate(Username)) {
            res.status(400).json({"response":"Special characters in username are prohibited!"});
        } else {
            const Users = DB.model('users', UserSchema);
            bcrypt.hash(Password, 10, function(err, hash) {
                Users.create({username:Username, password:hash}).then(() => {
                    return res.status(201);
                }).catch((e) => {
                    console.log(e);
                    return res.status(400).json({"response":`Error!`});
                })
            });
        }
    }
    return res.status(200).json({"response":"Success!"});

})

router.post('/api/login', function (req, res) {
    const Username = req.body["username"];
    const Password = req.body["password"];
    const Users = DB.model('users', UserSchema);
    const Query = { 
        __v: false,
    };
    Users.findOne({name: Username},Query).then((data) => {
        if (Username === data["username"]) {
            bcrypt.compare(Password, data['password'], function(err, result) {
                if (result) {
                    const token = jwt.sign({data:data["_id"]}, JWT_PRIVATE_TOKEN);
                    return res
                    .cookie("JWT", token, {httpOnly:true,sameSite:"Lax"})
                    .json({"message":"Success!"});
                } else {
                    return res.status(400).json({"response":"Data invalide!"});
                }
            });

        } else {
            return res.status(400).json({"response":"Data invalide!"});
        }
    })
})


router.post('/api/auth', function (req, res) {
    const token = req.cookies.JWT;
    if (!token) {
      return res.sendStatus(403);
    }
    try {
        const data = jwt.verify(token, JWT_PRIVATE_TOKEN);
        const Users = DB.model('users', UserSchema);
        const Query = { 
            __v: false,
            password: false
        };
        Users.findOne({_id: data['data']},Query).then((auth_data) => {
            return res.json({auth_data});
        })
    } catch (e) {
        console.log(e);
        return res.sendStatus(403);
    }
})




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
                    book_status:req.body["book_status"], // readed | abandoned | planned
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

router.post('/api/change_username', function (req,res) {
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
        if (req.body["username"]) {
            Users.updateOne({_id: UserData['data']}, { $set: {username:req.body["username"]}}, function(err, result) {
                if (result) {
                    return res.sendStatus(200);
                }
            })
        }
    }catch (err) {
        console.log(err);
    }
})



router.post('/api/change_avatar', function (req,res) {
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
        if (req.body["avatar"]) {
            Users.updateOne({_id: UserData['data']}, { $set: {avatar:req.body["avatar"]}}, function(err, result) {
                if (result) {
                    return res.sendStatus(200);
                }
            })
        }
    }catch (err) {
        console.log(err);
    }
})

router.post('/api/change_status', function (req,res) {
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
        if (req.body["status"]) {
            Users.updateOne({_id: UserData['data']}, { $set: {status:req.body["status"]}}, function(err, result) {
                if (result) {
                    return res.sendStatus(200);
                }
            })
        }
    }catch (err) {
        console.log(err);
    }
})

router.post('/api/change_passwd', function (req, res) {
    const token = req.cookies.JWT;
    const Password = req.body["password"];
    const Cpassword = req.body["cpassword"];
    if (!token) {
      return res.sendStatus(403);
    }
    try {
        if (Password) {
            const data = jwt.verify(token, JWT_PRIVATE_TOKEN);
            const Users = DB.model('users', UserSchema);
            const Query = { 
                __v: false,
            };
            Users.findOne({_id: data['data']},Query).then((auth_data) => {
                if (auth_data) {
                    if (bcrypt.compareSync(Password, auth_data.password)) {
                        bcrypt.hash(Cpassword, 10, function(err, hash) {
                            Users.updateOne({_id: data['data']}, { $set: {password:hash}}, function(err, result) {
                                if (result) {
                                    return res.sendStatus(200);
                                }
                            })
                        })
                    } else {
                        return res.status(400);
                    }
                }
            })
        }
    } catch (e) {
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


router.put('/api/setting_user/', function (req, res) {
    const token = req.cookies.JWT;
    if (!token) {
        return res.sendStatus(403);
    }
    const newUsername = req.body["username"];
    const newStatus = req.body["status"];
    const newAvatar = req.body["avatar"];
    if (newUsername && newStatus && newAvatar) {
        const data = jwt.verify(token, JWT_PRIVATE_TOKEN);
        try {
            const Users = DB.model('users', UserSchema);
            Users.findOne({_id: data['data']}).then((auth_data) => {
                if (auth_data) {
                    Users.updateOne({_id: data['data']}, { $set: {username:newUsername,status:newStatus,avatar:newAvatar}}, function(err, result) {
                        if (result) {
                            return res.sendStatus(200);
                        }
                    })
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

router.post('/api/add_review', function (req, res) {
    const token = req.cookies.JWT;
    if (!token) {
        return res.sendStatus(403);
    }
    const textReview = req.body["text"];
    const descriptionReview = req.body["description"];
    const bookSlug = req.body["bookSlug"];
    const userRating = req.body["rating"];
    if (textReview && descriptionReview && bookSlug && userRating) {
        const data = jwt.verify(token, JWT_PRIVATE_TOKEN);
        try {
            const Users = DB.model('users', UserSchema);
            const Books = DB.model('books', BookSchema);
            Users.findOne({_id: data['data']}).then((auth_data) => {
                if (auth_data) {
                    Books.find({slug:bookSlug}).then(function (book) {
                        if (book) {
                            const updateReviews = Object.assign(book[0]["reviews"]
                            ,{[auth_data.username]:{"text":textReview,"description":descriptionReview,"rating":userRating}});
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