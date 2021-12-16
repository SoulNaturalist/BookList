const DB = require('./database');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const {JWT_PRIVATE_TOKEN} = require('./config');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const router = require('express').Router();
const {UserSchema} = require('./schemes');
let token = "";



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
            bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
                Users.create({username:Username, password:hash}).then(() => {
                    token = jwt.sign({data: data["_id"]},JWT_PRIVATE_TOKEN, { expiresIn: 60 * 60 });
                    res.status(201).json({token});
                }).catch(() => {
                    res.status(400).json({"response":"Error!"});
                })
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
                res.status(200).json({"response":"Success auth!"});
            } else {
                res.status(400).json({"response":"Login or password Invalide!"});

            }
        });
    })
})


router.get('/api/check_auth', function (req, res) {
    const decoded = jwt.verify(token, JWT_PRIVATE_TOKEN);
    console.log(decoded);
    
})

module.exports = router;