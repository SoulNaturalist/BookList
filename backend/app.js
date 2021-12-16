const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { DB_URL, PORT } = require('./config.js');
const app = express()


const urlencodedParser = express.urlencoded({extended: false});

mongoose.connect(DB_URL)
.then(() => {
    console.log('Database connected');
})
.catch((err) => {
    console.log(`Connection failed ${err.message}`);
});

app.get('/api/user/:id', function (req, res) {
    let userId = req.params.book; 
    console.log(userId)
});


app.post('/api/add_book', urlencodedParser, function (req, res) {
    let valideBook = false;
    let valideAuthor = false;
    let valideEstimation = false;
    if(!req.body) return response.sendStatus(400);
    if (req.body['book']) {
        valideBook = true;
    } else {
        return res.status(400).send('Ошибка - Название книги обязательный параметр.');
    }
    if (req.body['author']) {
        valideAuthor = true;
    } else {
        return res.status(400).send('Ошибка - Автор книги обязательный параметр.');
    }
    if (req.body['estimation']) {
        valideEstimation = true;
    } else {
        return res.status(400).send('Ошибка - Оценка книги обязательный параметр.');
    }
    
    if (valideBook && valideAuthor && valideEstimation) {
        return res.sendStatus(200);
    }
});

 
app.listen(PORT, () => console.log(`Server start port - ${PORT}`))