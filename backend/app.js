const  api = require('./api.js');
const { PORT } = require('./config');
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());  
app.use('/', api);

app.listen(PORT, () => console.log(`Server start port - ${PORT}`));