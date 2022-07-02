const DB = require('./database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {UserSchema} = require('./schemes');
const {JWT_PRIVATE_TOKEN,outlookLogin,outlookPass} = require('./config');
const router = require('express').Router();
const cookieParser = require('cookie-parser');
const uuid = require("uuid");
const nodemailer = require("nodemailer");
router.use(cookieParser());


router.post('/api/change_username', async function (req,res) {
    const token = req.cookies.JWT;
    const usersModel = DB.model('users', UserSchema);
    if (!token) {
        return res.json({message: "Для этого метода нужна авторизация", codeStatus:403});
    }
    try {
        const UserData = jwt.verify(token, JWT_PRIVATE_TOKEN);
        if (req.body["username"]) {
            const changedUsername = await usersModel.updateOne({_id: UserData['data']}, { $set: {username:req.body["username"]}}).exec();
            return changedUsername.modifiedCount ?  res.sendStatus(200):res.sendStatus(301);
        }
    } catch (err) {
        console.log(err);
        return res.json({message: "Для этого метода нужна авторизация", codeStatus:403});
    }
})



router.post('/api/change_avatar', async function (req,res) {
    const token = req.cookies.JWT;
    const usersModel = DB.model('users', UserSchema);
    if (!token) {
        return res.json({message: "Для этого метода нужна авторизация", codeStatus:403});
    }
    try {
        const UserData = jwt.verify(token, JWT_PRIVATE_TOKEN);
        if (req.body["avatar"]) {
            const changedAvatar = await usersModel.updateOne({_id: UserData['data']}, { $set: {avatar:req.body["avatar"]}}).exec();
            return changedAvatar.modifiedCount ?  res.sendStatus(200):res.sendStatus(301);

        }
    }catch (err) {
        console.log(err);
        return res.json({message: "Для этого метода нужна авторизация", codeStatus:403});
    }
})

router.post('/api/change_status', async function (req,res) {
    const token = req.cookies.JWT;
    const usersModel = DB.model('users', UserSchema);
    if (!token) {
        return res.json({message: "Для этого метода нужна авторизация", codeStatus:403});
    }
    try {
        const UserData = jwt.verify(token, JWT_PRIVATE_TOKEN);
        if (req.body["status"]) {
            const changedStatus = await usersModel.updateOne({_id: UserData['data']}, { $set: {status:req.body["status"]}}).exec()
            return changedStatus.modifiedCount ?  res.sendStatus(200):res.sendStatus(301);
        }
    }catch (err) {
        console.log(err);
        return res.json({message: "Для этого метода нужна авторизация", codeStatus:403});
    }
})

router.post('/api/change_passwd', async function (req, res) {
    const token = req.cookies.JWT;
    if (!token) {
        return res.json({message: "Для этого метода нужна авторизация", codeStatus:403});
    }
    try {
        const password = req.body["password"];
        const newPassword = req.body["new_password"];
        if (password) {
            const data = jwt.verify(token, JWT_PRIVATE_TOKEN);
            const Users = DB.model('users', UserSchema);
            const userData = await Users.findOne({_id: data['data']}).exec();
            const passwordSuccessMatch = await bcrypt.compare(password, userData.password);
            if (passwordSuccessMatch && Boolean(userData)) {
                // Password checked and user have auth
                if (userData.twoAuth) {
                    // user enabled 2 factor auth
                    const codeConfirmPassword = uuid.v4();
                    const changedCode = await Users.updateOne({_id: userData['_id']}, { $set: {code:codeConfirmPassword}}).exec();
                    const transporter = nodemailer.createTransport({
                        service: "Outlook365",
                        host: "smtp.office365.com",
                        port: "587",
                        tls: {ciphers: "SSLv3",rejectUnauthorized: false,},
                        auth: {
                            user: outlookLogin, 
                            pass: outlookPass
                        }
                      });
                      const mailOptions = {from: outlookLogin,to:userData.email,
                        subject: "Смена пароля BookList",
                        html: `<h1>Здравствуй ${userData.username},кто-то попытался сменить твой пароль учетной записи.</h1>\n
                        <p>Если это был не ты, проигнорируй это письмо.</p>
                        <b><a href='http://127.0.0.1:3000/change_password/${codeConfirmPassword}'>Сменить пароль</a></b>
                        `
                      }
                      const messageSendData = await transporter.sendMail(mailOptions)
                      return messageSendData && changedCode.modifiedCount  ? res.sendStatus(200):res.sendStatus(500);
                } else {
                    if (password && newPassword) {
                        const hashPassword = await bcrypt.hash(newPassword, 10);
                        const changePassword = await Users.updateOne({_id: data['data']}, { $set: {password:hashPassword}}).exec();
                        return changePassword && modifiedCount ? res.sendStatus(201):res.sendStatus(401);
                    }
                }
            } else {
                return res.sendStatus(400);

            }
        }
    } catch (e) {
        console.log(e)
        return res.json({message: "Для этого метода нужна авторизация", codeStatus:403});
    }
})





router.put('/api/setting_user/', async function (req, res) {
    const token = req.cookies.JWT;
    if (!token) {
        return res.sendStatus(403);
    }
    const newUsername = req.body["username"];
    const newStatus = req.body["status"];
    const newAvatar = req.body["avatar"];
    const newBg = req.body["bg"];
    if (newUsername && newStatus && newAvatar) {
        const data = jwt.verify(token, JWT_PRIVATE_TOKEN);
        try {
            const userModel = DB.model('users', UserSchema);
            const currentUser = await userModel.findOne({_id: data['data']}).exec();
            if (currentUser) {
                const dataChanged = await userModel.updateOne({_id: data['data']}, { $set: {username:newUsername,status:newStatus,avatar:newAvatar,bg:newBg}}).exec();
                return dataChanged.modifiedCount ? res.sendStatus(200):res.sendStatus(301);
            }
        } catch (e) {
            console.log(e);
            return res.sendStatus(403);
        }
    }
})

router.get('/api/user/:name', async function (req, res) {
    const token = req.cookies.JWT;
    const username = req.params.name;
    if (!token) {
        return res.sendStatus(403);
    }
    const Query = { 
        password: false,
        __v: false,
        _id: false,
        role: false,
        twoAuth:false,
        code:false,
        emailConfirm:false,
        email:false
    };
    const Users = DB.model('users', UserSchema);
    try {
        const authJWT = jwt.verify(token, JWT_PRIVATE_TOKEN);
        const dataUser = await Users.find({username: username},Query).exec();
        return res.json(dataUser);
    } catch (err) {
        return res.sendStatus(403);

    }
});

router.get('/api/get_users', async function (req, res) {
    const usersModel = DB.model('users', UserSchema);
    const token = req.cookies.JWT;
    if (!token) {
      return res.sendStatus(403);
    }
    try {
        const userId = jwt.verify(token, JWT_PRIVATE_TOKEN);
        const Query = { 
            __v: false,
            password: false,
            _id:false
        };
        const userData = await usersModel.findOne({_id: userId['data']}).exec();
        if (userData && userData.role === 3) {
            const data = await Users.find({},Query).exec();
            return res.json(data);
        } else {
            return res.sendStatus(403);
        }
    } catch (err) {
        return res.sendStatus(403);
    }
})

router.post('/api/confirm_email', async function(req, res) {
    const codeCheck = req.body["code"];
    const Users = DB.model('users', UserSchema);
    const Query = { 
            __v: false,
            _id:false,
            password: false
    };
    const data = await Users.findOne({code:codeCheck},Query).exec();
    if (data) {
        await Users.updateOne({code: codeCheck}, { $set: {emailConfirm:true}})
        res.status(200).json({'message':'Почта потверждена!'})
    }
    
})


router.post('/api/validate_password_reset/:code', async function(req, res) {
    const token = req.cookies.JWT;
    try {
        const passwordCode = req.params.code;
        const data = jwt.verify(token, JWT_PRIVATE_TOKEN);
        const users = DB.model('users', UserSchema);
        const Query = { 
            __v: false,
            _id:false,
            password: false
        };
        const dataUser = await users.findOne({_id: data['data']},Query).exec();
        if (passwordCode) {
            const checkUserData = await users.findOne({code: passwordCode},Query).exec();
            if (checkUserData['username'] === dataUser['username']) {
                return res.sendStatus(200);
            } else {
                return res.sendStatus(400);
            }
        }
    } catch (e) {
        console.log(e);
        return res.sendStatus(403);
    }
})

router.post('/api/change_password_2auth', async function(req, res) {
    const token = req.cookies.JWT;
    try {
        const data = jwt.verify(token, JWT_PRIVATE_TOKEN);
        const dataUser = await users.findOne({_id: data['data']},Query).exec();
        const newPassword = req.body["new_password"];
        const codeFactor = req.body["code"];
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        if (dataUser['password'] !== hashedPassword && dataUser['code'] === codeFactor) {
            const users = DB.model('users', UserSchema);
            const userPasswordChange = await users.updateOne({username: dataUser['username']}, { $set: {password:hashedPassword}}).exec();
            const changedCode = await Users.updateOne({_id: dataUser['_id']}, { $set: {code:uuid.v4()}}).exec();
            return userPasswordChange.modifiedCount && changedCode.modifiedCount ? res.sendStatus(200):res.sendStatus(400);
        }
    } catch (e) {
        console.log(e);
        return res.sendStatus(403);
    }
})

module.exports = router;