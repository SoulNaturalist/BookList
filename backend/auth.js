const DB = require('./database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {UserSchema, BookSchema} = require('./schemes');
const {JWT_PRIVATE_TOKEN} = require('./config');
const router = require('express').Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());


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
                    .cookie("JWT", token, {httpOnly:true,path:'/'})
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


router.get('/api/logout', function(req, res) {
    res.clearCookie("JWT");
    return res.json({"message":"you're out"})
})



module.exports = router;