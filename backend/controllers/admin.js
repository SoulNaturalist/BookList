const DB = require('../database')
const jwt = require('jsonwebtoken')
const { UserSchema } = require('../schemes')
const { JWT_PRIVATE_TOKEN } = require('../config')

const get_users = async function (req, res) {
  const token = req.cookies.JWT
  const usersModel = DB.model('users', UserSchema)
  const userId = jwt.verify(token, JWT_PRIVATE_TOKEN)
  const Query = {__v: false,password: false,_id: false}
  const userData = await usersModel.findOne({ _id: userId.data }).exec()
  if (userData && userData.role === 3) {
    const data = await usersModel.find({}, Query).exec()
    return res.json(data)
  }
  return res.json({ message: 'Для этого метода нужно быть администратором', codeStatus: 400 })
}

const delete_user = async function (req, res) {
  const usersModel = DB.model('users', UserSchema)
  const token = req.cookies.JWT
  const usernameDeleted = req.body.username
  const userId = jwt.verify(token, JWT_PRIVATE_TOKEN)
  const userData = await usersModel.findOne({ _id: userId.data }).exec()
  if (userData && userData.role === 3) {
    const deleteUserByUsername = await usersModel.deleteOne({ username: usernameDeleted }).exec()
    return deleteUserByUsername.deletedCount ? res.json({ message: `Пользователь ${usernameDeleted} удален`, StatusCode: 200 }) : res.json({ message: `Пользователя ${usernameDeleted} не удалось удалить`, StatusCode: 400 })
  }
  return res.json({ message: 'Для этого метода нужно быть администратором', codeStatus: 400 })
}

module.exports = {
  get_users,
  delete_user
}
