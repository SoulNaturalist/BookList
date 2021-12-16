const dotenv = require('dotenv').config();
const DB_URL = process.env.DATABASE_URL
const PORT = 3000

module.exports = { DB_URL,PORT };