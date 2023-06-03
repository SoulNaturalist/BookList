const { DB_URL } = require('./config.js')
const mongoose = require('mongoose')

mongoose.connect(DB_URL)
  .then(() => {
    console.log('Database connected')
  })
  .catch((err) => {
    console.log(`Connection failed ${err.message}`)
  })

module.exports = mongoose
