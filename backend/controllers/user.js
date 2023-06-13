const DB = require('../database')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { UserSchema } = require('../schemes')
const { JWT_PRIVATE_TOKEN, mailPassword, mailLogin } = require('../config')
const router = require('express').Router()
const cookieParser = require('cookie-parser')
const uuid = require('uuid')
const nodemailer = require('nodemailer')
router.use(cookieParser())

const change_avatar = async function (req, res) {
  const token = req.cookies.JWT
  const usersModel = DB.model('users', UserSchema)
  if (!token) {
    return res.json({ message: 'Для этого метода нужна авторизация', codeStatus: 403 })
  }
  try {
    const UserData = jwt.verify(token, JWT_PRIVATE_TOKEN)
    if (req.body.avatar) {
      const changedAvatar = await usersModel.updateOne({ _id: UserData.data }, { $set: { avatar: req.body.avatar } }).exec()
      return changedAvatar.modifiedCount ? res.sendStatus(200) : res.sendStatus(301)
    }
  } catch (err) {
    console.log(err)
    return res.json({ message: 'Для этого метода нужна авторизация', codeStatus: 403 })
  }
}

const change_status = async function (req, res) {
  const token = req.cookies.JWT
  const usersModel = DB.model('users', UserSchema)
  if (!token) {
    return res.json({ message: 'Для этого метода нужна авторизация', codeStatus: 403 })
  }
  try {
    const UserData = jwt.verify(token, JWT_PRIVATE_TOKEN)
    if (req.body.status) {
      const changedStatus = await usersModel.updateOne({ _id: UserData.data }, { $set: { status: req.body.status } }).exec()
      return changedStatus.modifiedCount ? res.sendStatus(200) : res.sendStatus(301)
    }
  } catch (err) {
    console.log(err)
    return res.json({ message: 'Для этого метода нужна авторизация', codeStatus: 403 })
  }
}

const change_passwd = async function (req, res) {
  const token = req.cookies.JWT
  if (!token) {
    return res.json({ message: 'Для этого метода нужна авторизация', codeStatus: 403 })
  }
  try {
    const password = req.body.password
    const newPassword = req.body.new_password
    const data = jwt.verify(token, JWT_PRIVATE_TOKEN)
    const Users = DB.model('users', UserSchema)
    const userData = await Users.findOne({ _id: data.data }).exec()
    if (Boolean(password) && Boolean(newPassword) && password !== newPassword && !userData.twoAuth) {
      // checking that passwords are not undefined and the password is not equal to the new password
      const passwordSuccessMatch = await bcrypt.compare(password, userData.password)
      if (passwordSuccessMatch) {
        const hashNewPassword = await bcrypt.hash(newPassword, 10)
        const changePassword = await Users.updateOne({ _id: data.data }, { $set: { password: hashNewPassword } }).exec()
        return changePassword.modifiedCount ? res.sendStatus(201) : res.sendStatus(401)
      } else {
        return res.sendStatus(400)
      }
    } else if (password === newPassword && !userData.twoAuth) {
      return res.status(403).send('Пароль совпадает с текущим')
    } else {
      if (password !== newPassword) {
        // user enabled 2 factor auth
        const codeConfirmPassword = uuid.v4()
        const changedCode = await Users.updateOne({ _id: userData._id }, { $set: { code: codeConfirmPassword } }).exec()
        const transporter = nodemailer.createTransport({
          host: 'smtp.mail.ru',
          port: 465,
          secure: true,
          auth: {
            user: mailLogin,
            pass: mailPassword
          }
        })
        const mailOptions = {
          from: mailLogin,
          to: userData.email,
          subject: 'Смена пароля BookList',
          html: `<h1>Здравствуй ${userData.username},кто-то попытался сменить твой пароль учетной записи.</h1>\n
                    <p>Если это был не ты, проигнорируй это письмо.</p>
                    <p>Код подтверждения - ${codeConfirmPassword}.</p>
                    `
        }
        const messageSendData = await transporter.sendMail(mailOptions)
        return messageSendData && changedCode.modifiedCount ? res.sendStatus(200) : res.sendStatus(500)
      }
    }
  } catch (e) {
    console.log(e)
    return res.json({ message: 'Для этого метода нужна авторизация', codeStatus: 403 })
  }
}

const setting_user = async function (req, res) {
  const token = req.cookies.JWT
  if (!token) {
    return res.sendStatus(403)
  }
  const newStatus = req.body.status
  const newAvatar = req.body.avatar
  const newBg = req.body.bg
  if (newStatus || newAvatar || newBg) {
    const data = jwt.verify(token, JWT_PRIVATE_TOKEN)
    try {
      const userModel = DB.model('users', UserSchema)
      const currentUser = await userModel.findOne({ _id: data.data }).exec()
      if (currentUser) {
        const dataChanged = await userModel.updateOne({ _id: data.data }, { $set: { status: newStatus, avatar: newAvatar, bg: newBg } }).exec()
        return dataChanged.modifiedCount ? res.sendStatus(200) : res.sendStatus(301)
      }
    } catch (e) {
      console.log(e)
      return res.sendStatus(403)
    }
  }
}

const get_user_data = async function (req, res) {
  const token = req.cookies.JWT
  const username = req.params.username
  if (!token) {
    return res.json({ message: 'Для этого метода нужна авторизация', codeStatus: 403 })
  }
  const queryData = {
    password: false,
    __v: false,
    _id: false,
    role: false,
    twoAuth: false,
    code: false,
    emailConfirm: false,
    email: false
  }
  const usersModel = DB.model('users', UserSchema)
  try {
    jwt.verify(token, JWT_PRIVATE_TOKEN)
    const dataUser = await usersModel.find({ username }, queryData).exec()
    return res.json(dataUser)
  } catch (err) {
    console.log(err)
    return res.sendStatus(403)
  }
}

const confirm_change_password = async function (req, res) {
  const token = req.cookies.JWT
  try {
    const data = jwt.verify(token, JWT_PRIVATE_TOKEN)
    const users = DB.model('users', UserSchema)
    const dataUser = await users.findOne({ _id: data.data }).exec()
    const newPassword = req.body.new_password
    const codeFactor = req.body.code
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    if (dataUser.password !== hashedPassword && dataUser.code === codeFactor) {
      const userPasswordChange = await users.updateOne({ username: dataUser.username }, { $set: { password: hashedPassword } }).exec()
      const changedCode = await users.updateOne({ _id: dataUser._id }, { $set: { code: uuid.v4() } }).exec()
      return userPasswordChange.modifiedCount && changedCode.modifiedCount ? res.sendStatus(200) : res.sendStatus(400)
    }
  } catch (e) {
    console.log(e)
    return res.sendStatus(403)
  }
}

const confirm_email = async function (req, res) {
  const codeCheck = req.body.code
  const users = DB.model('users', UserSchema)
  const Query = {
    __v: false,
    _id: false,
    password: false
  }
  const data = await users.findOne({ code: codeCheck }, Query).exec()
  if (data) {
    await users.updateOne({ code: codeCheck }, { $set: { emailConfirm: true } })
    return res.json({ message: 'Почта потверждена!' })
  }
}

module.exports = {
  change_avatar,
  change_status,
  change_passwd,
  setting_user,
  get_user_data,
  confirm_change_password,
  confirm_email
}
