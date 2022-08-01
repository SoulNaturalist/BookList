const uuid = require("uuid");
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const DB = require('../database');
const {UserSchema} = require('../schemes');
const {JWT_PRIVATE_TOKEN,allowedEmails,mailPassword,mailLogin} = require('../config');

const register = (async function (req, res) {
    const usernameField = req.body["username"];
    const passwordField = req.body["password"];
    const emailField = req.body["email"];
    const codeUserConfirm = uuid.v4();
    if (usernameField && passwordField && emailField) {
        const Users = DB.model('users', UserSchema);
        const uniqueUsername = await Users.count({ username: usernameField });
        const uniqueEmail = await Users.count({ email: emailField });
        
        if (!uniqueUsername && !uniqueEmail) {
            if (allowedEmails.includes(emailField.split("@")[1])) {
                const hashedPassword = await bcrypt.hash(passwordField, 10);
                const createdUser = await Users.create({username:usernameField, password:hashedPassword, email:emailField, code:codeUserConfirm});
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
                return dataSended && createdUser ? res.json("Успешно!"): res.json("Ошибка");
            } else {
                return res.status(400).json({message:{message:"Ваша почта не входит в список разрешенных!", codeStatus:400}});
            }
        } else {
            return res.status(422).json({message:{message:"Имя пользователя и почта должны быть уникальны!", codeStatus:422}});
        }
    }
})

const login = (async function (req, res) {
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


const auth = (async function (req, res) {
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

const logout = (async function (req, res) {
    res.clearCookie("JWT");
    return res.json({message: "Вы вышли из аккаунта", codeStatus:200});
})





module.exports = { register,login,auth,logout };