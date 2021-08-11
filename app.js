const express = require("express");

const app = express();

app.get("/main", function(request, response){
    response.sendFile(__dirname + "/HomePage/index.html")
});

app.get("/login", function(request, response){
    response.sendFile(__dirname + "/Login/index.html")
});

app.get("/registration", function(request, response){
    response.sendFile(__dirname + "/Registration/index.html")
});

app.get("/mybooks", function(request, response){
    response.sendFile(__dirname + "/UserBookList/index.html")
});

app.get("/addbook", function(request, response){
    response.sendFile(__dirname + "/AddBookForm/index.html")
});


app.listen(3000);
console.log('App Starting!')
