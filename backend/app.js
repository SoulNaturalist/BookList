const express = require('express')
const mongoose = require('mongoose');
const { CONNECTION_URL } = require('./config.js');
const app = express()
 

mongoose.connect(CONNECTION_URL)
.then(() => {
    console.log('Connected');
})
.catch( (err) => {
    console.log('Connection failed '+ err.message);
});

app.get('/api/get_book/:book', function (req, res) {
    let bookName = req.params.book; 
    console.log(bookName)
})
 
app.listen(3000)