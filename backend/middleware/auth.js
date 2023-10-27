const authMiddleware = (req, res, next) => {
    const token = req.cookies.JWT
    if (!token) {
        return res.json({ message: 'Для этого метода нужна авторизация', codeStatus: 403 })
    }
    try {
        jwt.verify(token, JWT_PRIVATE_TOKEN)
    } catch (err) {
        consoelg.log(err)
        return res.json({ message: 'Для этого метода нужна авторизация', codeStatus: 403 })
    }
    next()
}

module.exports = authMiddleware