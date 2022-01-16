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

router.post('/api/delete_acc', function (req, res) {
    const Password = req.body["password"];
    if (Password) {
        const Users = DB.model('users', UserSchema);
        const Query = { 
            __v: false,
        };
        Users.findOne({name: String(Username)},Query).then((data) => {
            bcrypt.compare(Password, data['password'], function(err, result) {
                if (result) {
                    console.log(result);
                }
            })
        })


    } else {
        return res.sendStatus(422);
    }

})

module.exports = router;