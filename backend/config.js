const dotenv = require('dotenv').config();
const DB_URL = process.env.DATABASE_URL;
const JWT_PRIVATE_TOKEN = process.env.secret;
const PORT = process.env.PORT || 3030;
const outlookPass = process.env.outlookPassword;
const outlookLogin = process.env.outlookLogin;
const testJwt = process.env.testJwt;

module.exports = { DB_URL,PORT,JWT_PRIVATE_TOKEN,outlookPass,outlookLogin,testJwt };