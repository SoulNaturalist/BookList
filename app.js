const express = require("express");
const http = require("http");
const app = express();
const fs = require("fs");
const filePath = "users.json";
const passwordHash = require('password-hash');

app.use(express.urlencoded({extended: true}));
app.use(express.json()) 

app.get("/main", function(request, response){
    response.sendFile(__dirname + "/HomePage/index.html")
});

app.get("/login", function(request, response){
    response.sendFile(__dirname + "/Login/index.html")
});

app.get("/registration", function(request, response){
    response.sendFile(__dirname + "/Registration/index.html")
});

app.post("/registration", function (request, response) {
    // let username = request.body.username;
    // let password = request.body.user_password;
    // let hashedPassword = passwordHash.generate(password);
    // let data = fs.readFileSync(filePath, "utf8");
    // let users = JSON.parse(data);
    // let UserTemplate = {
    //     "id":2,
    //     "name":username,
    //     "password":hashedPassword,
    //     "books": []
    // }
    // UserTemplate = JSON.stringify(UserTemplate);
    // users.push(`,${UserTemplate}`);
    // data = JSON.stringify(users);
    // fs.writeFileSync("users.json", data);
});

app.get("/mybooks", function(request, response){
    response.sendFile(__dirname + "/UserBookList/index.html")
});

app.get("/addbook", function(request, response){
    response.sendFile(__dirname + "/AddBookForm/index.html")
});

app.get("/api/users", function(req, res){
    const content = fs.readFileSync(filePath,"utf8");
    const users = JSON.parse(content);
    res.send(users);
});

app.get("/api/users/:id", function(req, res){
    const id = req.params.id;
    const content = fs.readFileSync(filePath, "utf8");
    const users = JSON.parse(content);
    for (let user of users) {
        if (Number(user.id) === Number(id)) {
            res.send(user);
        }
    }
})
app.listen(3000);
console.log('App Starting!')
