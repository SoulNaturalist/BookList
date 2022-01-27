const dotenv = require('dotenv').config();
const DB_URL = process.env.DATABASE_URL;
const JWT_PRIVATE_TOKEN = process.env.secret;
const PORT = process.env.PORT || 3030;

module.exports = { DB_URL,PORT,JWT_PRIVATE_TOKEN };