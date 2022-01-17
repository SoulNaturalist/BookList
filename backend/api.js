const DB = require('./database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {UserSchema} = require('./schemes');
const {JWT_PRIVATE_TOKEN} = require('./config');
const router = require('express').Router();
const cookieParser = require("cookie-parser");
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

});


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
                .cookie("JWT", token, {
                httpOnly: true,
                })
                .status(200)
                .json({ message: "Success auth!" });
                
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


router.post('/api/add_book', function (req, res) {
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
            if (req.body["book_name"] && req.body["book_author"] && req.body["year_of_release"] && req.body["description"] && req.body["rating"]) {
                const Books = Object.assign(auth_data["books"],{
                    [req.body["book_name"]]: {
                        book_author: req.body["book_author"],
                        year_of_release: req.body["year_of_release"],
                        description: req.body["description"],
                        rating: req.body["rating"],
                    }
                });
                let CountReadBooks = auth_data["book_read_count"] += 1;
                Users.updateOne({_id: UserData['data']}, { $set: {books:Books}},
                    function(err, result) {
                        if (err) console.log(err)
                    }
                );
                Users.updateOne({_id: UserData['data']}, { $set: {book_read_count:CountReadBooks}},
                    function(err, result) {
                        if (err) console.log(err)
                    }
                );
            } else {
                return res.sendStatus(422);
            }
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

module.exports = router;