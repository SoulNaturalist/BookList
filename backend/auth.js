const DB = require('./database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {UserSchema, BookSchema} = require('./schemes');
const {JWT_PRIVATE_TOKEN, outlookPass, outlookLogin} = require('./config');
const router = require('express').Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const nodemailer = require("nodemailer");


router.post('/api/register', async function (req, res) {
    const usernameField = req.body["username"];
    const passwordField = req.body["password"];
    const emailField = req.body["email"];
    if (usernameField && passwordField && emailField) {
        const UsernameValidate = async (str) => !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
        if (!await UsernameValidate(usernameField)) {
            res.status(400).json({"response":"Special characters in username are prohibited!"});
        } else {
            const Users = DB.model('users', UserSchema);
            const hashedPassword = await bcrypt.hash(passwordField, 10);
            const createdUser = await Users.create({username:usernameField, password:hashedPassword, email:emailField})
            const Query = { 
                __v: false,
                _id:false,
                password: false
            };
            data = await Users.findOne({username: usernameField},Query).exec();
            let transporter = nodemailer.createTransport({
                service: "Outlook365",
                host: "smtp.office365.com",
                port: "587",
                tls: {
                    ciphers: "SSLv3",
                    rejectUnauthorized: false,
                },
                auth: {
                  user: outlookLogin, 
                  pass: outlookPass
                }
              });
            const mailOptions = {
                from: outlookLogin,
                to:emailField ,
                subject: "Потвердите почту BookList",
                html: `<h1>Здравствуй ${usernameField}</h1>\n<p>Подтверждение почты - http://127.0.0.1:3000/email_confirm/${data["code"]}</p>`
            }
            transporter.sendMail(mailOptions,(err) => {
                if (err) {
                    res.status(400).json("Не удалось отправить письмо.");
                } else {
                    res.status(201).json("Успешно!");
                }
            })
        }
    } else {
        res.status(404).json({"response":"Enter username,password,email"});

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
                    .json({"message":"Success!"});
                } else {
                    return res.status(400).json({error: "Активируйте почту!"})
                }
            } else {
                return res.status(401).json({error: "Неверные данные!"})
            }
        });

    } else {
        return res.status(400).json({"response":"Data invalide!"});
    }
    })


router.post('/api/auth', async function (req, res) {
    const token = req.cookies.JWT;
    if (!token) {
      return res.sendStatus(403);
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
        return res.sendStatus(403);
    }
})


router.get('/api/logout', async function(req, res) {
    res.clearCookie("JWT");
    return res.json({"message":"you're out"})
})


module.exports = router;