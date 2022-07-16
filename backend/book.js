const DB = require('./database');
const jwt = require('jsonwebtoken');
const {UserSchema, BookSchema} = require('./schemes');
const {JWT_PRIVATE_TOKEN} = require('./config');
const router = require('express').Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());





router.delete('/api/delete_book', async function (req, res) {
    const token = req.cookies.JWT;
    const Users = DB.model('users', UserSchema);
    if (!token) {
      return res.sendStatus(403);
    }
    try {
        const idUser = jwt.verify(token, JWT_PRIVATE_TOKEN);
        const Query = { 
            __v: false,
            password: false
        };
        if (req.body["book_name"]) {
            const userData = await Users.findOne({_id: idUser['data']},Query).exec();
            const Books = userData["books"];
            const bookName = req.body["book_name"];
            Reflect.deleteProperty(Books, bookName);
            const deleteBookRequest = await Users.updateOne({_id: idUser['data']}, { $set: {books:Books}}).exec();
            return deleteBookRequest.modifiedCount ? res.sendStatus(200) : res.sendStatus(400);
        }
    } catch (err) {
        console.log(err);
    }
})

router.put('/api/change_book_rating', async function (req, res) {
    const token = req.cookies.JWT;
    const Users = DB.model('users', UserSchema);
    if (!token) {
      return res.sendStatus(403);
    }
    try {
        const idUser = jwt.verify(token, JWT_PRIVATE_TOKEN);
        const Query = { 
            __v: false,
            password: false
        };
        if (req.body["book_name"] && req.body["rating"]) {
            const userData = await Users.findOne({_id: idUser['data']},Query).exec();
            let Books = userData["books"];
            const BookName = req.body["book_name"];
            Books[BookName]["rating"] = req.body["rating"];
            const updatedRating = await Users.updateOne({_id: idUser['data']}, { $set: {books:Books}}).exec();
            return updatedRating.modifiedCount ?  res.sendStatus(200):res.sendStatus(400);
        }
    } catch (err) {
        console.log(err);
    }
})

router.post('/api/library_add_book', async function (req, res) {
    const token = req.cookies.JWT;
    const Users = DB.model('users', UserSchema);
    if (!token) {
        return res.json({message: "Для этого метода нужна авторизация", codeStatus:403});
    }
    try {
        const idUser = jwt.verify(token, JWT_PRIVATE_TOKEN);
        const Query = { 
            __v: false,
            password: false
        };
        const userData = await Users.findOne({_id: idUser['data']},Query);
        if (userData["role"] === 2 || userData["role"] === 3) {
            const Books = DB.model('books', BookSchema);
            const BookName = req.body["book_name"];
            const BookAuthor = req.body["book_author"];
            const YearOfRelease = req.body["year_of_release"];
            const BookCover = req.body["cover"];
            const createBook = await Books.create({book_name:BookName,book_author:BookAuthor,year_of_release:YearOfRelease,cover:BookCover}).exec();
            return createBook.modifiedCount ?  res.sendStatus(200):res.sendStatus(400);
        } else {
            return res.json({message: "У вас нет нужных прав!", codeStatus:403});
        }
    } catch (err) {
        console.log(err);
    }

})

router.get('/api/get_library_books', async function (req, res) {
    const books = DB.model('books', BookSchema);
    const users = DB.model('users', UserSchema);
    const token = req.cookies.JWT;
    if (!token) {
        return res.json({message: "Для этого метода нужна авторизация", codeStatus:403});
    }
    try {
        const idUser = jwt.verify(token, JWT_PRIVATE_TOKEN);
        const query = { 
            __v: false,
            _id: false
        };
        const data = await users.findOne({_id: idUser['data']},query).exec();
        const queryBook = { 
                __v: false,
                password: false
        };
        const bookData = await books.find({},queryBook).exec();
        return data ? res.json(bookData):res.sendStatus(401);
    } catch (err) {
        console.log(err);
    }
})

router.post('/api/add_book', async function (req,res) {
    const token = req.cookies.JWT;
    const Users = DB.model('users', UserSchema);
    if (!token) {
        return res.json({message: "Для этого метода нужна авторизация", codeStatus:403});
    }
    try {
        const idUser = jwt.verify(token, JWT_PRIVATE_TOKEN);
        const Query = { 
            __v: false,
            password: false
        };
        const authUser = await Users.findOne({_id: idUser['data']},Query).exec();
        const Books = Object.assign(authUser["books"],{
            [req.body["book_name"]]: {
                book_author: req.body["book_author"],
                year_of_release: req.body["year_of_release"],
                rating:0,
                book_status:req.body["book_status"], // readed | drop | planned
                cover:req.body["cover"]
            }});
        const updateBooks = await Users.updateOne({_id: UserData['data']}, { $set: {books:Books}}).exec();
        return updateBooks.modifiedCount ?  res.sendStatus(200):res.sendStatus(400);
    } catch (e) {
        console.log(e);
        return res.json({message: "Для этого метода нужна авторизация", codeStatus:403});
    }
        
})




router.post('/api/get_book_by_slug', async function (req, res) {
    const slug = req.body["slug"];
    const Books = DB.model('books', BookSchema);
    const bookQuery = {__v: false,_id: false};
    try {
        if (slug) {
            const dataSearchSlug = await Books.findOne({slug: slug},bookQuery).exec();
            return dataSearchSlug ? res.json(dataSearchSlug):res.sendStatus(404);
        }
    } catch (e) {
        console.log(e)
    }
})



router.post('/api/change_cover_by_slug', async function (req, res) {
    const slug = req.body["slug"];
    const newCover = req.body["cover"];
    const books = DB.model('books', BookSchema);
    const users = DB.model('users', UserSchema);
    const token = req.cookies.JWT;
    if (!token) {
        return res.json({message: "Для этого метода нужна авторизация", codeStatus:403});
    }
    try {
        const idUser = jwt.verify(token, JWT_PRIVATE_TOKEN);
        const authUser = await users.findOne({_id: idUser['data']}).exec();
        if (authUser.role === 3) {
            if (slug && newCover) {
                const bookUpdated =  await books.updateOne({slug: slug}, { $set: {cover:newCover}}).exec();
                return bookUpdated.modifiedCount ? res.sendStatus(201):res.sendStatus(400);
            }

        } else {
            return res.json({message: "Для этого метода нужно быть администратором", codeStatus:403})
        }
    } catch (e) {
        console.log(e)
    }
})


router.post('/api/get_cover_by_name', async function (req, res) {
    const bookName = req.body["book_name"];
    const Books = DB.model('books', BookSchema);
    const bookQuery = {__v: false,_id: false};
    try {
        if (bookName) {
            let bookData = await Books.findOne({book_name: bookName},bookQuery).exec();
            if (bookData === null) bookData = false
            return bookData ? res.json(bookData):res.sendStatus(404);
        } else {
            return res.sendStatus(400);
        }
    } catch (e) {
        console.log(e)
    }
})

router.post('/api/search_books', async function (req, res) {
    const textQuery = req.body["text"];
    const bookQuery = {__v: false,_id: false};
    const books = DB.model('books', BookSchema);
    try {
        const searchByName = await books.find({book_name: textQuery},bookQuery).exec();
        const searchByAuthor = await books.find({book_author: textQuery},bookQuery).exec();
        return Boolean(searchByName) ? res.json(searchByName):res.json(searchByAuthor);
       
    } catch (e) {
        console.log(e)
    }
})




module.exports = router;