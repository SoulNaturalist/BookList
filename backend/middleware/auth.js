const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const { JWT_PRIVATE_TOKEN } = require('../config')
const { UserSchema } = require('../schemes')
const DB = require('../database')

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.JWT
    const userModel = DB.model('users', UserSchema)
    if (req.path === '/api/confirm_email' || req.path === "/api/get_leaders" || req.path === "/api/get_reviews") {
        return next();
    }
    if (!token) {
        return res.json({ message: 'Для этого метода нужна авторизация', codeStatus: 403 })
    }
    try {
        const userId  = jwt.verify(token, JWT_PRIVATE_TOKEN)
        await userModel.findOne({ _id: userId.data }).exec()
    } catch (err) {
        console.log(err)
        return res.json({ message: 'Для этого метода нужна авторизация', codeStatus: 403 })
    }
    next()
}

module.exports = authMiddleware