const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const { JWT_PRIVATE_TOKEN } = require('../config')
const { UserSchema } = require('../schemes')
const DB = require('../database')


const adminMiddleware = async (req, res, next) => {
    const userModel = DB.model('users', UserSchema)
    const token = req.cookies.JWT
    if (!token) {
        return res.json({ message: 'Для этого метода нужна авторизация', codeStatus: 403 })
    }
    try {
        const userId  = jwt.verify(token, JWT_PRIVATE_TOKEN)
        const currentUser = await userModel.findOne({ _id: userId.data }).exec()
        if (currentUser.role !== 2) {
            return res.json({ message: 'Для этого метода нужно быть администратором', codeStatus: 403 })
        }
    } catch (err) {
        console.log(err)
        return res.json({ message: 'Для этого метода нужна авторизация', codeStatus: 403 })
    }
    next()
}

module.exports = adminMiddleware