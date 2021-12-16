const cors = require('cors')
const  api = require('./api.js');
const { PORT } = require('./config');
const express = require('express');
const app = express();
app.use(express.json());  
app.use('/', api);
app.use(cors());

app.listen(PORT, () => console.log(`Server start port - ${PORT}`));