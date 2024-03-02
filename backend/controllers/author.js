const DB = require('../database')
const jwt = require('jsonwebtoken')
const { AuthorSchema, UserSchema } = require('../schemes')
const { JWT_PRIVATE_TOKEN } = require('../config')

const addNewAuthor = async function (req, res) {
    const token = req.cookies.JWT
    const authorSchema = DB.model('author', AuthorSchema)
    const usersSchema = DB.model('users', UserSchema)
    const { authorName, authorSurname, authorPatronymic, yearOfBirth } = req.body;
    const idUser = jwt.verify(token, JWT_PRIVATE_TOKEN)
    const userData = await usersSchema.findOne({ _id: idUser.data })
    if (authorName && authorSurname && authorPatronymic && yearOfBirth) {
        if (userData.role === 2 || userData.role === 3) {
            await authorSchema.create({ author_name: authorName, author_surname: authorSurname, author_patronymic: authorPatronymic, year_of_birth: yearOfBirth })
            return res.sendStatus(200)
        }
    }

}


const getAuthorByName = async function (req, res) {
    const authorSchema = DB.model('author', AuthorSchema)
    const authorName = req.body.authorName.split(" ")
    const authorData = await authorSchema.findOne({ author_name: authorName[0], author_surname: authorName[1]}, {_id:false, __v:false})
    return res.json(authorData)

}

module.exports = { getAuthorByName, addNewAuthor };