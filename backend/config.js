const dotenv = require('dotenv').config();
const DB_URL = process.env.DATABASE_URL;
const JWT_PRIVATE_TOKEN = process.env.secret;
const PORT = process.env.PORT || 3030;
const mailPassword = process.env.mailPassword;
const mailLogin = process.env.mailLogin;
const testJwt = process.env.testJwt;
const loginUser = process.env.loginUser;
const passwordUser = process.env.passwordUser;

module.exports = { DB_URL,PORT,JWT_PRIVATE_TOKEN,mailPassword,mailLogin,testJwt,loginUser,passwordUser };