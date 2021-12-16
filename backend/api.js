const saltRounds = 10;
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
        function isValid(str){
            return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
        }    
        if (Username.length > 3 && Username.length < 15) {
            res.status(400).json({"response":"Length username incorrect!"});
        } else if (!isValid(Username)) {
            res.status(400).json({"response":"Special characters in username are prohibited!"});
        } else if (Password.length >= 8 || isValid(Password)) {
            res.status(400).json({"response":"Weak password!"});
        } else {
            const Users = DB.model('users', UserSchema);
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(Password, salt, function(err, hash) {
                    Users.create({username:Username, password:hash}).then(() => {
                        res.status(201);
                    }).catch((e) => {
                        console.log(e);
                        res.status(400).json({"response":`Error!`});
                    })
                });
            });
        }
    } else {
        res.status(400).json({"response":"Login or password empty!"});
    }
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
                res.status(400).json({"response":"Login or password Invalide!"});

            }
        });
    })
})


router.post('/api/check_auth', function (req, res) {
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

module.exports = router;