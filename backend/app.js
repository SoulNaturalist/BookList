const cors = require('cors')
const  api = require('./api.js');
const { PORT } = require('./config');
const helmet = require('helmet');
const express = require('express');
const app = express();
app.use(express.json());  
app.use('/', api);
app.use(cors());
app.use(helmet());

app.listen(PORT, () => console.log(`Server start port - ${PORT}`));