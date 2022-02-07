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
                    res.status(201);
                }).catch((e) => {
                    console.log(e);
                    res.status(400).json({"response":`Error!`});
                })
            });
        }
    } else {
        res.status(422).json({"response":"Login or password empty!"});
    }
    res.status(200).json({"response":"Success!"});

})

router.post('/api/login', function (req, res) {
    const Username = req.body["username"];
    const Password = req.body["password"];
    const Users = DB.model('users', UserSchema);
    const Query = { 
        __v: false,
    };
    Users.findOne({name: String(Username)},Query).then((data) => {
        bcrypt.compare(Password, data['password'], function(err, result) {
            if (result) {
                const token = jwt.sign({data:data["_id"]}, JWT_PRIVATE_TOKEN);
                return res
                .cookie("JWT", token, {httpOnly:true,sameSite:"Lax"})
                .json({"message":"Success!"});
            } else {
                res.status(400).json({"response":"Data invalide!"});
            }
        });
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
                let CountReadBooks = auth_data["book_read_count"] -= 1;
                Reflect.deleteProperty(Books, BookName)
                Users.updateOne({_id: UserData['data']}, { $set: {books:Books}}, function(err, result) {
                    if (err) console.log(err)
                })
                Users.updateOne({_id: UserData['data']}, { $set: {book_read_count:CountReadBooks}},function(err, result) {
                    if (err) console.log(err)
                });
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
                if (BookName && BookAuthor && YearOfRelease) {
                    Books.create({book_name:BookName,book_author:BookAuthor,year_of_release:YearOfRelease}).then((response) => {
                        if (response) {
                            return res.sendStatus(200);
                        }
                    });
                }
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
    const Books = DB.model('books', BookSchema);
    if (!token) {
      return res.sendStatus(403);
    }
    try {
        const UserData = jwt.verify(token, JWT_PRIVATE_TOKEN);
        const Query = { 
            __v: false,
            password: false
        };
        if (req.body["id"] && req.body["book_status"]) {
            Books.findOne({_id: req.body["id"]},Query).then((book_data) => {
                Users.findOne({_id: UserData['data']},Query).then((data) => {
                    const NewBooks = Object.assign(data["books"],{
                        [book_data["book_name"]]: {
                            book_author: book_data["book_author"],
                            year_of_release: book_data["year_of_release"],
                            description: book_data["description"],
                            rating:0,
                            book_status:req.body["book_status"],  // readed | abandoned | planned
                        }
                    });
                    Users.updateOne({_id: UserData['data']}, { $set: {books:NewBooks}}, function(err, result) {
                        if (err) console.log(err)
                    })
                })
            })
        }
    } catch (err) {
        console.log(err);
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




module.exports = router;