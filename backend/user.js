const DB = require('./database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {UserSchema, BookSchema} = require('./schemes');
const {JWT_PRIVATE_TOKEN} = require('./config');
const router = require('express').Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());


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



module.exports = router;