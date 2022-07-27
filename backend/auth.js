const DB = require('./database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {UserSchema, BookSchema} = require('./schemes');
const {JWT_PRIVATE_TOKEN, mailPassword, mailLogin} = require('./config');
const router = require('express').Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const nodemailer = require("nodemailer");
const uuid = require("uuid");


router.post('/api/register', async function (req, res) {
    const usernameField = req.body["username"];
    const passwordField = req.body["password"];
    const emailField = req.body["email"];
    const codeUserConfirm = uuid.v4();
    if (usernameField && passwordField && emailField) {
        const UsernameValidate = async (str) => !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
        if (!await UsernameValidate(usernameField)) {
            res.status(400).json({"response":"Special characters in username are prohibited!"});
        } else {
            const Users = DB.model('users', UserSchema);
            const hashedPassword = await bcrypt.hash(passwordField, 10);
            const transporter = nodemailer.createTransport({
                host: 'smtp.mail.ru',
                port: 465,
                secure: true, 
                auth: {
                    user: mailLogin,
                    pass: mailPassword
                }
            });
            const mailOptions = {
                from: mailLogin,
                to:emailField ,
                subject: "Потвердите почту BookList",
                html: `<h1>Здравствуй ${usernameField}</h1>\n<p>Подтверждение почты - http://127.0.0.1:3000/email_confirm/${codeUserConfirm}</p>`
            }
            const dataSended = await transporter.sendMail(mailOptions);
            try {
                const createdUser = await Users.create({username:usernameField, password:hashedPassword, email:emailField, code:codeUserConfirm});
                return dataSended && createdUser ? res.json("Успешно!"): res.json("Ошибка");
            } catch (err) {
                return res.json("Ошибка");
            }

        }

    }
})
    
    


router.post('/api/login', async function (req, res) {
    const Username = req.body["username"];
    const Password = req.body["password"];
    const Users = DB.model('users', UserSchema);
    const Query = { 
        __v: false,
    };
    const data = await Users.findOne({username: Username},Query).exec()
    if (data && Username === data["username"]) {
        bcrypt.compare(Password, data['password'], async function(err, result) {
            if (result) {
                if (data["emailConfirm"]) {
                    const token = await jwt.sign({data:data["_id"]}, JWT_PRIVATE_TOKEN);
                    return res
                    .cookie("JWT", token, {httpOnly:true,path:'/'})
                    .json({message:"Успешно!",user:data["username"]});
                } else {
                    return res.json({message: "Активируйте почту!", codeStatus:400});
                }
            } else {
                return res.json({message: "Неверные данные!", codeStatus:401});
            }
        });

    } else {
        return res.json({message: "Неверные данные!", codeStatus:401});
    }
})


router.post('/api/auth', async function (req, res) {
    const token = req.cookies.JWT;
    if (!token) {
        return res.json({message: "Для этого метода нужна авторизация", codeStatus:403});
    }
    try {
        const data = jwt.verify(token, JWT_PRIVATE_TOKEN);
        const Users = DB.model('users', UserSchema);
        const Query = { 
            __v: false,
            _id:false,
            password: false,
            code:false
        };
        const auth_data = await Users.findOne({_id: data['data']},Query).exec();
        return res.json({auth_data});
    } catch (e) {
        console.log(e);
        return res.json({message: "Для этого метода нужна авторизация", codeStatus:403});
    }
})


router.get('/api/logout', async function (req, res) {
    res.clearCookie("JWT");
    return res.json({message: "Вы вышли из аккаунта", codeStatus:200});
})


module.exports = router;